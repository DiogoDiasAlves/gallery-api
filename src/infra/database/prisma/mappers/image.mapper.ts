import { Image as PrismaImage } from '@prisma/client';
import { Image } from '@/core/entities/image';

export class PrismaImageMapper {
    static toDomain(prismaImage: PrismaImage): Image {
        return new Image(
        prismaImage.id_image,
        prismaImage.id_user,
        prismaImage.nm_image,
        prismaImage.nm_stored,
        prismaImage.vl_size_kb,
        prismaImage.dt_created
        );
    }

    static toPrisma(image: Image) {
        return {
            id_image: image.id,
            id_user: image.id_user,
            nm_image: image.nm_image,
            nm_stored: image.nm_stored,
            vl_size_kb: image.vl_size_kb,
            dt_created: image.dt_created
        };
    }
}


