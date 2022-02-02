import upload from "@config/upload";
import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import path from "path";
import { IStorageProvider } from "../IStorageProvider";



class S3StorgeProvider implements IStorageProvider {

    private cliente: S3;

    constructor(){
        this.cliente = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

   async save(file: string, folder: string): Promise<string> {
        const originalName = path.resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalName);

        const ContentType = mime.getType(originalName);

        await this.cliente.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: "public-read",
            Body: fileContent,
            ContentType
        }).promise();

        await fs.promises.unlink(originalName);

        return file;
    }

   async delete(file: string, folder: string): Promise<void> {
       await this.cliente.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
       }).promise();
    }

}

export {S3StorgeProvider}