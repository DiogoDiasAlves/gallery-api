// infra/http/controllers/user.controller.ts
import { Body, Controller, Delete, Get,NotFoundException,Param, Post, Put } from '@nestjs/common';
import { ListUsersUseCase } from '@/domain/use-case/user.use-case';
import { ListUsersPresenter } from '../presenters/list-user.presenter';
import { User } from '@/core/entities/user';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(private listUsersUseCase: ListUsersUseCase) {}

    @Get()
    @ApiOperation({ summary: 'List all users' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the user to retrieve' })
    @ApiResponse({ status: 200, description: 'Return all users.' })
    async findAll() {
        const users = await this.listUsersUseCase.userFindAll();
        return ListUsersPresenter.toHTTP(users);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find user by ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the user to retrieve' })
    @ApiResponse({ status: 200, description: 'Return the user with the specified ID.' })
    async findById(@Param('id') id:number){
        const user = await this.listUsersUseCase.userFindById(id);
        if(!user){
            throw new NotFoundException('Usuario não encontrado')
        }
        return ListUsersPresenter.toHTTP([user]);
    }
    
    @Post('create')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully.' })
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
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the user to update' })
    @ApiResponse({ status: 200, description: 'User updated successfully.' })
    async userUpdate(@Param('id') id:number, @Body() updateUserDto: UpdateUserDto){
        const user = await this.listUsersUseCase.userUpdate(id, updateUserDto);
        return ListUsersPresenter.toHTTP([user]);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the user to delete' })
    @ApiResponse({ status: 200, description: 'User deleted successfully.' })
    async userDelete(@Param('id') id:number){
        const user = await this.listUsersUseCase.userDelete(id)
        return {message:'Usuário deletado com sucesso'};
    }
}
