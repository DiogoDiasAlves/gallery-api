// infra/database/database.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repository/prisma-user.repository';
import { IUserRepository } from '@/domain/Enterprise/repository/user.repository';

@Module({
    providers: [
        PrismaService,
        {
            provide: IUserRepository,
            useClass: PrismaUserRepository,
        },
    ],
    exports: [PrismaService, IUserRepository],
})
export class DatabaseModule {}