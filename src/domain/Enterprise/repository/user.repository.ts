// domain/Enterprise/repository/user.repository.ts
import { User } from "src/core/entities/user";

export abstract class IUserRepository {
    abstract findAll(): Promise<User[]>;
    abstract findById(id: number): Promise<User | null>;
    abstract create(user: User): Promise<User>;
    abstract update(id: number, user: Partial<User>): Promise<User>;
    abstract delete(id: number): Promise<void>;
}



