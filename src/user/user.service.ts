import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserCreateDto } from './dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(
    email: string,
    organizationId: string,
  ): Promise<UserEntity> {
    return this.prisma.user.findFirst({
      where: {
        email,
        organizationId,
      },
    });
  }

  async list(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      include: {
        organization: true,
      },
    });
  }

  async create(data: UserCreateDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 10),
      },
    });
  }
}
