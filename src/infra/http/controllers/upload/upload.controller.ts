import { Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../../auth/auth.guard';
import { UploadImgUseCase } from '../../../../domain/use-case/upload-img.use-case';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('images')
export class UploadImgController {
    constructor(
        private uploadImgUseCase: UploadImgUseCase
    ) { }

    @UseGuards(AuthGuard)
    @Post('upload')
    @ApiOperation({ summary: 'Upload an image' })
    @ApiResponse({ status: 201, description: 'Image uploaded successfully.' })
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
        return this.uploadImgUseCase.uploadImg(file, req.user);
    }
}