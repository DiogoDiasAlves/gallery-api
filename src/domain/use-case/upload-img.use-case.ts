import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { IImageRepository } from "../Enterprise/repository/image.repository";
import { writeFile } from 'node:fs/promises'
interface IreqProps {
    name: string,
    email: string,
    user_id: number,
    iat: number,
    exp: number
}

@Injectable()
export class UploadImgUseCase {
    constructor(
        private imageRepository: IImageRepository
    ) { }

    async uploadImg(file: Express.Multer.File, req: IreqProps) {
        if (!file) {
            throw new UnprocessableEntityException('Arquivo não fornecido');
        }

        const sizeInKb = Math.round(file.size / 1024);
        const fileName = `${Date.now()}_${file.originalname}`;
        const teste = `./images/${req.user_id}/${fileName}`;
        const imageData = {
            id_user: req.user_id,
            nm_image: file.originalname,
            nm_stored: teste,
            vl_size_kb: sizeInKb
        };

        await writeFile(teste, file.buffer)

    
        const image = await this.imageRepository.upload(imageData);
        
        return image;
    }
}