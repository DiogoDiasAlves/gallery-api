    import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards, Request, Req } from '@nestjs/common';
    import { ListImageUseCase } from '@/domain/use-case/image.use-case';
    import { ListImagePresenter } from '../presenters/list-image.presenter';
    import { Image } from '@/core/entities/image';
    import { AuthGuard } from '../../auth/auth.guard';
    import { ListUsersUseCase } from '@/domain/use-case/user.use-case';
    import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

    @Controller('image')
    export class ImageController {
        constructor(private listImageUseCase: ListImageUseCase, private listUsersUseCase: ListUsersUseCase) { }

        @Get()
        @ApiOperation({ summary: 'List all images' })
        @ApiParam({ name: 'id', type: String, description: 'ID of the image to retrieve' })
        @ApiResponse({ status: 200, description: 'Return all images.' })
        async findAll() {
            const image = await this.listImageUseCase.imageFindAll();
            return ListImagePresenter.toHTTP(image);
        }

        @Get('my-images')
        @ApiOperation({ summary: 'List all images of the authenticated user' })
        @ApiParam({ name: 'userId', type: String, description: 'ID of the user to retrieve images for' })
        @ApiResponse({ status: 200, description: 'Return all images of the authenticated user.' })
        @UseGuards(AuthGuard)
        async findMyImages(@Request() req: any) {
            const userId = req.user.user_id;


            const user = await this.listUsersUseCase.userFindById(userId);
            if (!user) {
                throw new NotFoundException('Usuário não encontrado');
            }

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
        @ApiOperation({ summary: 'Find image by ID' })
        @ApiParam({ name: 'id', type: String, description: 'ID of the image to retrieve' })
        @ApiResponse({ status: 200, description: 'Return the image with the specified ID.' })
        async findById(@Param('id') id: string) {
            const image = await this.listImageUseCase.imageFindById(Number(id));
            if (!image) {
                throw new NotFoundException('Imagem não encontrada')
            }
            return ListImagePresenter.toHTTP([image]);
        }

        @UseGuards(AuthGuard)
        @Delete(':id')
        @ApiOperation({ summary: 'Delete image by ID' })
        @ApiParam({ name: 'id', type: String, description: 'ID of the image to delete' })
    
        @ApiResponse({ status: 200, description: 'Image deleted successfully.' })
        async deleteImage(@Param('id') id: number, @Req() req) {
            await this.listImageUseCase.imagedelete(id, req.user.user_id);
            return { message: 'Imagem deletada com sucesso' };
        }

    }

