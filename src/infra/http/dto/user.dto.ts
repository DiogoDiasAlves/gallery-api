import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  nm_user: string;

  @IsString()
  @MaxLength(30)
  nm_login: string;

  @IsString()
  @MinLength(6)
  vl_password: string;

  @IsString()
  @MaxLength(50)
  vl_salt: string;

  @IsEmail()
  @MaxLength(100)
  nm_email: string;
}

export class UpdateUserDto {
  @IsString()
  @MaxLength(50)
  nm_user?: string;

  @IsString()
  @MaxLength(30)
  nm_login?: string;

  @IsString()
  @MinLength(6)
  vl_password?: string;

  @IsString()
  @MaxLength(50)
  vl_salt?: string;

  @IsEmail()
  @MaxLength(100)
  nm_email?: string;
}
