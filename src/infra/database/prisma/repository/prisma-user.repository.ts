import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@/core/entities/user';
import { PrismaUserMapper } from '../mappers/user.mapper';

@Injectable()
export class PrismaUserRepository {
    constructor(private prisma: PrismaService) {}
    
    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map(user => PrismaUserMapper.toDomain(user));
    }

    async findById(id_user:number): Promise<User | null>{
        const users = await this.prisma.user.findUnique({where: {
            id_user
        }});

        if(!users) return null;
        return PrismaUserMapper.toDomain(users);
    }

    async create(user: User) : Promise<User>{
        
        const emailExists = await this.prisma.user.findUnique({where: {nm_email: user.nm_email}});
        if(emailExists){
            throw new ConflictException('This email is already in use');
        }
        const loginExists = await this.prisma.user.findUnique({where: {nm_login: user.nm_login}});
        if(loginExists){
            throw new ConflictException('This login is already in use');
        }
        
        const createUser = await this.prisma.user.create(     
            {data: {
                nm_user: user.nm_user,
                nm_login: user.nm_login,
                vl_password: user.vl_password,
                vl_salt: user.vl_salt,
                nm_email: user.nm_email
          }
        }
    )
      return PrismaUserMapper.toDomain(createUser);
    }

    async update(id: number, user: Partial<User>): Promise<User>{
        const updateData: any = {};
        
        if (user.nm_user !== undefined) updateData.nm_user = user.nm_user;
        if (user.nm_login !== undefined) updateData.nm_login = user.nm_login;
        if (user.vl_password !== undefined) updateData.vl_password = user.vl_password;
        if (user.vl_salt !== undefined) updateData.vl_salt = user.vl_salt;
        if (user.nm_email !== undefined) updateData.nm_email = user.nm_email;
        
        const userUpdate = await this.prisma.user.update({
            where: { 
                id_user: id 
            },
            data: updateData
        });  
        return PrismaUserMapper.toDomain(userUpdate);
    }

    async delete(id: number): Promise<void>{
        const user = await this.prisma.user.findUnique({
            where: { id_user: id }
        });
        
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        
        await this.prisma.user.delete({
            where: { id_user: id }
        });
    }
}
