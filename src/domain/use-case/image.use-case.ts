import { Injectable } from '@nestjs/common';
import { IImageRepository } from '../Enterprise/repository/image.repository';
import { Image } from 'src/core/entities/image';



@Injectable()
export class ListImageUseCase {
    constructor(private imageRepository: IImageRepository) {}

    async imageFindAll(): Promise<Image[]> {
        return await this.imageRepository.findAll();
    }

    async imageFindById(id: number): Promise<Image | null>{
        return await this.imageRepository.findById(id)
    }

    async imageGetImageFile(id: number): Promise<Buffer>{
        return await this.imageRepository.getImageFile(id)

    }

    async imageupload(image: Partial<Image>): Promise<Image>{
        return await this.imageRepository.upload(image)
    }

    async imagedelete(id: number): Promise<void>{
        return await this.imageRepository.delete(id)
    }
    
}