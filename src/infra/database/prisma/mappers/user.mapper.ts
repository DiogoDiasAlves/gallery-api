// infra/database/prisma/mappers/user.mapper.ts
import { User as PrismaUser } from '@prisma/client';
import { User } from '@/core/entities/user';

export class PrismaUserMapper {
    static toDomain(prismaUser: PrismaUser): User {
        return new User(
            prismaUser.id_user,
            prismaUser.nm_user,       
            prismaUser.nm_login,
            prismaUser.vl_password,
            prismaUser.vl_salt,
            prismaUser.nm_email,
            prismaUser.dt_created
        );
    }

    static toPrisma(user: User) {
        return {
            id_user: user.id,
            nm_user: user.nm_user,
            nm_login: user.nm_login,
            vl_password: user.vl_password,
            vl_salt: user.vl_salt,
            nm_email: user.nm_email,
            dt_created: user.createdAt
        };
    }
}