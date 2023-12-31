import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { UserCreateDto, UserFindDto } from './dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { FindAllResponse } from 'src/shared/types/find-all.types';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(
    email: string,
    organizationId?: string,
  ): Promise<UserEntity> {
    return this.prisma.user.findFirst({
      where: {
        email,
        organizationId,
      },
    });
  }

  async list(params: UserFindDto): Promise<FindAllResponse<UserEntity>> {
    const where = {
      id: params.id || undefined,
      organizationId: params.organizationId || undefined,
      role: params.role || undefined,
      name: params.name
        ? {
            contains: params.name,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      email: params.email
        ? {
            contains: params.email,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.user.count({
        where,
      }),
      this.prisma.user.findMany({
        where: where,
        include: {
          organization: true,
        },
        take: Number(params.take) || 20,
        skip: Number(params.skip) || 0,
      }),
    ]);

    return { total, data };
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
