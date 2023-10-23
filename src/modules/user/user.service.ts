import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private userRepository: PrismaService;

  constructor(private prisma: PrismaService) {
    this.userRepository = prisma;
  }

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10); // "10" est le nombre de tours pour le hachage
    return this.prisma.user.create({
      data: {
        password: hashedPassword,
        name: data.name,
        email: data.email,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
