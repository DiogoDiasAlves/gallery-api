// app.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { UserController } from './infra/http/controllers/UserController';
import { ListUsersUseCase } from './domain/use-case/user.use-case';
import { UploadImgController } from './infra/http/controllers/upload/upload.controller';
import { UploadImgUseCase } from './domain/use-case/upload-img.use-case';
import { AuthModule } from './infra/auth/auth.module';
import { ImageController } from './infra/http/controllers/imageController';
import { ListImageUseCase } from './domain/use-case/image.use-case';

@Module({
    imports: [DatabaseModule,AuthModule],
    controllers: [UserController, UploadImgController,ImageController],
    providers: [
        ListUsersUseCase,
        UploadImgUseCase,
        ListImageUseCase,
    ],
})
export class AppModule {}