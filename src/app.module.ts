// app.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { UserController } from './infra/http/controllers/UserController';
import { ListUsersUseCase } from './domain/use-case/user.use-case';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [ListUsersUseCase],
})
export class AppModule {}