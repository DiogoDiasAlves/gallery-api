import { Injectable } from '@nestjs/common';
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
      const createUser = await this.prisma.user.create(     
        {data: {
            
            
            nm_user: user.nm_user,
            nm_login: user.nm_login,
            vl_password: user.vl_password,
            vl_salt: user.vl_salt
      }
    }
)
      return PrismaUserMapper.toDomain(createUser);
    }

    async update(id: number, user: Partial<User>): Promise<User>{
        const userUpdate = await this.prisma.user.update({
            where: { 
                id_user: id 
            },
            data: {
                nm_user: user.nm_user,
                nm_login: user.nm_login,
                vl_password: user.vl_password,
                vl_salt: user.vl_salt
            }
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
