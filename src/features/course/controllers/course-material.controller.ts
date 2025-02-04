import { type Request, type Response } from "express";
import { ErrorResponse } from "../../../shared/middlewares/errorhandler";
import courseMaterialRepo from "../repositories/course-material";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 } from "uuid";


export async function upload(req: Request, res: Response) {

    console.log(req.files);

    if (!req.files)
        throw new ErrorResponse(400, "", [
            {
                message: "No file(s) or material(s) uploaded",
            }
        ]);

    const {
        material
    } = req.files;


    const uri = path.join(__dirname, "../../../../assets/materials/"
        + v4()
        + (path.extname((<UploadedFile>material).name)));

    // Upload ang file sa katung materials nga folder
    await Promise.all([
        (<UploadedFile>material).mv(uri),
        courseMaterialRepo.insert({
            uri,
            mimetype: (<UploadedFile>material).mimetype
        })
    ]);

    return res.status(200).json({
        message: "Mag upload ka'g file"
    });
}

export async function find(req: Request, res: Response) {
    const query = req.query;
    const result = await courseMaterialRepo.find(query);
    return res.status(200).json(result);
}

export async function remove(req: Request, res: Response) {
    const id = req.params.id;
    const result = await courseMaterialRepo.remove(id);

    return res.status(200).json(result);
}