import { Body, Controller, Delete, Get,NotFoundException,Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { ListImageUseCase } from '@/domain/use-case/image.use-case';
import { ListImagePresenter } from '../presenters/list-image.presenter';
import { Image } from '@/core/entities/image';
import { AuthGuard } from '../../auth/auth.guard';
import { ListUsersUseCase } from '@/domain/use-case/user.use-case';

@Controller('image')
export class ImageController {
    constructor(private listImageUseCase: ListImageUseCase, private listUsersUseCase: ListUsersUseCase) {}

    @Get()
    async findAll() {
        const image = await this.listImageUseCase.imageFindAll();
        return ListImagePresenter.toHTTP(image);
    }



        @Get('my-images')
        @UseGuards(AuthGuard)
        async findMyImages(@Request() req: any) {
    const userId = req.user.user_id;
    
    // Verificar se usuário existe
    const user = await this.listUsersUseCase.userFindById(userId);
    if (!user) {
        throw new NotFoundException('Usuário não encontrado');
    }
    
    // Buscar todas as imagens do usuário
    const images = await this.listImageUseCase.imageFindAllByUser(userId);
    
    return {
        user: {
            id: user.id,
            name: user.nm_user
        },
        images: ListImagePresenter.toHTTP(images)
    };
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

 