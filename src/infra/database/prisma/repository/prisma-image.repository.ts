import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaImageMapper } from '../mappers/image.mapper';
import { Image } from '@/core/entities/image';
import * as fs from 'fs/promises';
import * as path from 'path';

interface IreqProps {
    name: string;
    email: string;
    user_id: number;
    iat: number;
    exp: number;
}

@Injectable()
export class PrismaImageRepository {
    constructor(private prisma: PrismaService) { }

    async findAll(user_id: number): Promise<Image[]> {
        const images = await this.prisma.image.findMany({
            where: {
                id_user: user_id
            }
        });
        return images.map(image => PrismaImageMapper.toDomain(image));
    }


    async findById(id_image: number): Promise<Image | null> {
        const image = await this.prisma.image.findUnique({
            where: {
                id_image
            }
        });

        if (!image) return null;
        return PrismaImageMapper.toDomain(image);
    }

    async imageGetImageFile(id: number): Promise<Buffer> {
        const imageFile = await this.prisma.image.findUnique({
            where: { id_image: id },
            select: { nm_stored: true }
        });
        if (!imageFile?.nm_stored) {
            throw new Error('Arquivo não encontrado');
        }
        const filePath = path.join('caminho/para/pasta/images', imageFile.nm_stored);
        return await fs.readFile(filePath);
    }
    async upload(image: Partial<Image>): Promise<Image> {
        if (
            !image.id_user ||
            !image.nm_image ||
            !image.nm_stored ||
            !image.vl_size_kb
        ) {
            throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
        }
        const createImage = await this.prisma.image.create({
            data: {
                id_user: image.id_user,
                nm_image: image.nm_image,
                nm_stored: image.nm_stored,
                vl_size_kb: image.vl_size_kb,
                dt_created: new Date()
            }
        });
        return PrismaImageMapper.toDomain(createImage);
    }



   async delete(id: number, userId: number): Promise<void> {
        const image = await this.prisma.image.findUnique({
            where: { id_image: id }
        });

        if (!image) {
            throw new Error('Imagem não encontrada');
        }

        if (image.id_user !== userId) {
            throw new ForbiddenException('Você não pode deletar a imagem de outra pessoa');
        }

        await this.prisma.image.delete({
            where: { id_image: id }
        });
    }
   

    async findAllImagesByUser(userId: number): Promise<Image[]> {
        const images = await this.prisma.image.findMany({
            where: {
                id_user: userId
            }
        });
        return images.map(image => PrismaImageMapper.toDomain(image));
    }

}
