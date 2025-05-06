import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login() {
    return 'Login User';
  }

  async signup() {
    return 'Sign Up User';
  }
}
