import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserLoginDTO } from './dto/user-login.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(userLoginDTO: UserLoginDTO) {
    const { login, password: passwordDTO } = userLoginDTO;

    let user = await this.prisma.user.findUnique({
      where: {
        nm_login: login,

      },
    });
    if (!user) throw new NotFoundException('User not found');

    const verifyHashPw = await bcrypt.compare(passwordDTO, user.vl_password);

    if (!verifyHashPw) throw new BadRequestException();
    const payload = { name: user.nm_user, user_id: user.id_user };
    return {
      token_access: this.jwtService.sign(payload),
    };
  }
}

