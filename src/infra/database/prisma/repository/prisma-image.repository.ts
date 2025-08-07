import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Image } from '@/core/entities/image';
import { PrismaImageMapper } from '../mappers/image.mapper';
import { buffer } from 'stream/consumers';
import { IImageRepository } from '@/domain/Enterprise/repository/image.repository';



@Injectable()
export class PrismaImageRepository implements IImageRepository {
    constructor(private prisma: PrismaService) { }


    async findAll(): Promise<Image[]> {
        const image = await this.prisma.image.findMany();
        return image.map(image => PrismaImageMapper.toDomain(image));
    }


    async findById(id: number): Promise<Image | null> {
        const image = await this.prisma.image.findUnique({
            where: {
                id_image: id

            }
        });
        if (!image) return null;
        return PrismaImageMapper.toDomain(image)
    }

    async findAllImagesByUser(idUser: number): Promise<any[]> {
        const images = await this.prisma.image.findMany({
            where: {
                id_user: idUser
            }
        });
        
        return images.map(image => PrismaImageMapper.toDomain(image));
    }

    getImageFile(id: number): Promise<Buffer> {
        throw new Error('Method not implemented.');
    }
    upload(image: Partial<Image>): Promise<Image> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }


}





