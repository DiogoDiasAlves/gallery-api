import { IsString } from "class-validator";

export class UserLoginDTO{
    @IsString()
    login: string

    @IsString()
    password: string
}