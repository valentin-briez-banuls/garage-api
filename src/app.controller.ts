import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './modules/user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
