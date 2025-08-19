import { Injectable } from '@nestjs/common';
import { IImageRepository } from '../Enterprise/repository/image.repository';
import { Image } from 'src/core/entities/image';
import { User } from 'src/core/entities/user';



@Injectable()
export class ListImageUseCase {
    constructor(private imageRepository: IImageRepository) {}

    async imageFindAll(user_id:number): Promise<Image[]> {
        return await this.imageRepository.findAll(user_id);
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

    async imagedelete(id: number, userId: number): Promise<void> {
    return await this.imageRepository.delete(id, userId);
}
    async imageFindAllByUser(userId: number): Promise<Image[]> {
        return await this.imageRepository.findAllImagesByUser(userId);
    }
    
}