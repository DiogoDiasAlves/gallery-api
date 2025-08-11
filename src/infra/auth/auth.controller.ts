import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserLoginDTO } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  loginUser(@Body() userLoginDTO: UserLoginDTO) {
    return this.authService.loginUser(userLoginDTO);
  }
}