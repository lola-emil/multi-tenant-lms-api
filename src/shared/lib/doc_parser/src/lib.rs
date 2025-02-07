use neon::prelude::*;
use shiva::{core::TransformerTrait, xlsx, csv as shiva_csv};
use std::fs;
use bytes::Bytes;


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

    let headers = rdr.headers().unwrap().clone();

    let mut js_objects = Vec::new();

    for result in rdr.records() {
        match result {
            Ok(record) => {
                let js_object = JsObject::new(&mut cx);

                // Iterate through each field and header
                for (_i, (header, field)) in headers.iter().zip(record.iter()).enumerate() {
                    let js_value = cx.string(field.to_string());  // Convert field to JsString
                    let js_key = cx.string(header.to_string());  // Convert header to JsString
                    js_object.set(&mut cx, js_key, js_value)?;   // Set key-value pair in JsObject
                }

                js_objects.push(js_object);
            }
            Err(err) => {
                // Handle CSV parsing errors
                cx.throw_error(format!("Error reading CSV: {}", err))?;
            }
        }
    }

    // Convert the resulting Vec<Value> into a JsArray
    let js_array = JsArray::new(&mut cx, js_objects.len());
    for (i, json_object) in js_objects.into_iter().enumerate() {
        js_array.set(&mut cx, i as u32, json_object)?;
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