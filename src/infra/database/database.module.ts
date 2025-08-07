// infra/database/database.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repository/prisma-user.repository';
import { PrismaImageRepository } from './prisma/repository/prisma-image.repository';
import { IUserRepository } from '@/domain/Enterprise/repository/user.repository';
import { IImageRepository } from '@/domain/Enterprise/repository/image.repository';

@Module({
    providers: [
        PrismaService,
        {
            provide: IUserRepository,
            useClass: PrismaUserRepository,
        },
        {
            provide: IImageRepository,
            useClass: PrismaImageRepository,
        },
    ],
    exports: [PrismaService, IUserRepository, IImageRepository],
})
export class DatabaseModule {}