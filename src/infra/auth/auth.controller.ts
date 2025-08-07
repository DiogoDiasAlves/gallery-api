import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserLoginDTO } from './dto/user-login.dto';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  loginUser(@Body() userLoginDTO: UserLoginDTO) {
    return this.authService.loginUser(userLoginDTO);
  }
}