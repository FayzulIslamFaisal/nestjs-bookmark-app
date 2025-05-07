
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from "argon2";
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService){}
  async signup(authDto: AuthDto) {
    const { email, password, lastName, firstName } = authDto;
    const hash = await argon2.hash(password);
    const existUser = await this.prisma.user.findUnique({
      where:{
        email
      }
    });
    if (existUser) {
      throw new BadRequestException("User Already Exist!!!.");
    }
    const user = await this.prisma.user.create({
      data: {
        email,
        hash:hash,
        lastName,
        firstName
      }
    });
    if (!user) {
      throw new BadRequestException();
    }
    return user;

  };
  async signin(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    };
    const pwMatch = await argon2.verify(user.hash, password);
    
    if (!pwMatch) {
      throw new ForbiddenException("Invalid Credentials");
    };

    const {hash, ...userWithoutHash } = user;
    return userWithoutHash;
  }




  
}
