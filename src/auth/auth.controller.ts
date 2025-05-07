import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  async signup(@Body() authDto: AuthDto) {
    const user = await this.authService.signup(authDto);
    return {
      statusCode: 201,
      success: true,
      resuts: user,
    };
  }
  @Post('/signin')
  async signin(@Body() authDto: AuthDto) {
    const user = await this.authService.signin(authDto);
    return {
      statusCode: 201,
      succes: true,
      message: "user login successfully!!!." ,
      resuts: user,
    }
  }
}
