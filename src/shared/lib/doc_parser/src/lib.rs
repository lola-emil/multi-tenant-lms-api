use neon::prelude::*;
use shiva::{core::TransformerTrait, xlsx, csv as shiva_csv};
use std::fs;
use bytes::Bytes;

use serde_json::Value;

fn xlsx_to_csv(mut cx: FunctionContext) -> JsResult<JsString> {
    let path = cx.argument::<JsString>(0)?.value(&mut cx);

    let input = match fs::read(path) {
        Ok(bytes) => Bytes::from(bytes),
        Err(e) => return cx.throw_error(format!("Failed to read file: {}", e)),
    };

    let document = match xlsx::Transformer::parse(&input) {
        Ok(doc) => doc,
        Err(e) => return cx.throw_error(format!("Failed to parse XLSX: {}", e)),
    };

    let csv_bytes = match shiva_csv::Transformer::generate(&document) {
        Ok(csv) => csv,
        Err(e) => return cx.throw_error(format!("Failed to generate CSV: {}", e)),
    };

    let csv_string = String::from_utf8(csv_bytes.to_vec())
    .unwrap_or_else(|_| "Invalid UTF-8 string".to_string());

    Ok(cx.string(csv_string))
}

fn csv_to_json(mut cx: FunctionContext) -> JsResult<JsArray> {
    // Get the CSV string from the JavaScript argument
    let csv = cx.argument::<JsString>(0)?.value(&mut cx);

    let mut rdr = csv::ReaderBuilder::new().has_headers(true).from_reader(csv.as_bytes());

    let mut json_array = Vec::new();

    for result in rdr.records() {
        match result {
            Ok(record) => {
                let mut json_object = serde_json::Map::new();

                // Iterate through each field and header
                for (header, field) in rdr.headers().unwrap().iter().zip(record.iter()) {
                    json_object.insert(header.to_string(), Value::String(field.to_string()));
                }

                json_array.push(Value::Object(json_object));
            }
            Err(err) => {
                cx.throw_error(format!("Error reading CSV: {}", err))?;
            }
        }
    }

    // Convert the resulting Vec<Value> into a JsArray
    let js_array = JsArray::new(&mut cx, json_array.len());
    for (i, item) in json_array.into_iter().enumerate() {
        let js_value = neon_serde::to_value(&mut cx, &item)?;
        js_array.set(&mut cx, i as u32, js_value)?;
    }

    Ok(js_array)
}


#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    // cx.export_function("hello", hello)?;
    cx.export_function("xlsx_to_csv", xlsx_to_csv)?;
    cx.export_function("csv_to_json", csv_to_json)?;
    Ok(())
}