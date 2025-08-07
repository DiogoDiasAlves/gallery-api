// app.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { UserController } from './infra/http/controllers/UserController';
import { ListUsersUseCase } from './domain/use-case/user.use-case';
import { UploadImgController } from './infra/http/controllers/upload/upload.controller';
import { UploadImgUseCase } from './domain/use-case/upload-img.use-case';
import { AuthModule } from './infra/auth/auth.module';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController, UploadImgController],
    providers: [
        ListUsersUseCase,
        UploadImgUseCase,
        AuthModule,
    ],
})
export class AppModule {}