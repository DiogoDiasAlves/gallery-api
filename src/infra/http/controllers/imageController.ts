import { Body, Controller, Delete, Get,NotFoundException,Param, Post, Put } from '@nestjs/common';
import { ListImageUseCase } from '@/domain/use-case/image.use-case';
import { ListImagePresenter } from '../presenters/list-image.presenter';
import { Image } from '@/core/entities/image';

@Controller('image')
export class ImageController {
    constructor(private listImageUseCase: ListImageUseCase) {}

    @Get()
    async findAll() {
        const image = await this.listImageUseCase.imageFindAll();
        return ListImagePresenter.toHTTP(image);
    }

    @Get(':id')
        async findById(@Param('id') id:string){
            const image = await this.listImageUseCase.imageFindById(Number(id));
            if(!image){
                throw new NotFoundException('Imagem não encontrada')
            }
            return ListImagePresenter.toHTTP([image]);
        }

    
}

 