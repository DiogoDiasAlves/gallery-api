import { Image } from "src/core/entities/image";

export abstract class IImageRepository {
    abstract findAll(): Promise<Image[]>;
    abstract findAllImagesByUser(idUser: number): Promise<any[]>;
    abstract findById(id: number): Promise<Image | null>;
    abstract getImageFile(id: number): Promise<Buffer>;
    abstract upload(image: Partial<Image>): Promise<Image>;
    abstract delete(id: number): Promise<void>; 
}


