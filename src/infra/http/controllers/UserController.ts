// infra/http/controllers/user.controller.ts
import { Body, Controller, Delete, Get,NotFoundException,Param, Post, Put } from '@nestjs/common';
import { ListUsersUseCase } from '@/domain/use-case/user.use-case';
import { ListUsersPresenter } from '../presenters/list-user.presenter';
import { User } from '@/core/entities/user';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private listUsersUseCase: ListUsersUseCase) {}

    @Get()
    async findAll() {
        const users = await this.listUsersUseCase.userFindAll();
        return ListUsersPresenter.toHTTP(users);
    }

    @Get(':id')
    async findById(@Param('id') id:number){
        const user = await this.listUsersUseCase.userFindById(id);
        if(!user){
            throw new NotFoundException('Usuario não encontrado')
        }
        return ListUsersPresenter.toHTTP([user]);
    }
    
    @Post('create')
    async userCreate(@Body() createUserDto: CreateUserDto){
        const user = new User(
            0, // id será gerado automaticamente
            createUserDto.nm_user,
            createUserDto.nm_login,
            createUserDto.vl_password,
            createUserDto.vl_salt,
            createUserDto.nm_email
        );
        
        const createdUser = await this.listUsersUseCase.userCreate(user);
        return ListUsersPresenter.toHTTP([createdUser]);
    }

    @Put(':id')
    async userUpdate(@Param('id') id:number, @Body() updateUserDto: UpdateUserDto){
        const user = await this.listUsersUseCase.userUpdate(id, updateUserDto);
        return ListUsersPresenter.toHTTP([user]);
    }

    @Delete(':id')
    async userDelete(@Param('id') id:number){
        const user = await this.listUsersUseCase.userDelete(id)
        return {message:'Usuário deletado com sucesso'};
    }
}
