import { AuthService } from './auth.service';
import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signup() {
    const user = await this.authService.signup();
    return {
      statusCode: 201,
      succes: true,
      resuts: user,
    };
  }
  @Post('signin')
  async signin() {
    const user = await this.authService.login();
    return {
      statusCode: 201,
      succes: true,
      resuts: user,
    };
  }
}
