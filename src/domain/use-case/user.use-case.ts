// domain/service/list-users.use-case.ts
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../Enterprise/repository/user.repository';
import { User } from 'src/core/entities/user';

@Injectable()
export class ListUsersUseCase {
    constructor(private userRepository: IUserRepository) {}

    async userFindAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async userFindById(id:number): Promise<User | null>{
        return await this.userRepository.findById(id)
    }

    async userCreate(user: User) : Promise<User>{
        return await this.userRepository.create(user)
    }

    async userUpdate(id: number, user: Partial<User>): Promise<User>{
        return await this.userRepository.update(id,user)
    }

    async userDelete(id: number): Promise<void>{
        return await this.userRepository.delete(id)

    }



    
}