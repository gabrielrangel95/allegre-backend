import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ClassEntity } from './class.entity';
import { ClassCreateDto, ClassUpdateDto, ClassFindDto } from './dto';
import { Prisma } from '@prisma/client';
import { FindAllResponse } from 'src/shared/types/find-all.types';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}

  async list(params: ClassFindDto): Promise<FindAllResponse<ClassEntity>> {
    const where = {
      id: params.id || undefined,
      name: params.name
        ? {
            contains: params.name,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      organizationId: params.organizationId,
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.class.count({
        where,
      }),
      this.prisma.class.findMany({
        where,
      }),
    ]);

    return { total, data };
  }

  async create(
    organizationId: string,
    data: ClassCreateDto,
  ): Promise<ClassEntity> {
    return this.prisma.class.create({
      data: {
        ...data,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    });
  }

  async update(
    organizationId: string,
    id: string,
    data: ClassUpdateDto,
  ): Promise<ClassEntity> {
    const foundClass = await this.prisma.class.findUnique({
      where: {
        id,
      },
    });

    if (foundClass.organizationId !== organizationId) {
      throw new UnauthorizedException();
    }

    return this.prisma.class.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(organizationId: string, id: string): Promise<ClassEntity> {
    const foundClass = await this.prisma.class.findUnique({
      where: {
        id,
      },
    });

    if (foundClass.organizationId !== organizationId) {
      throw new UnauthorizedException();
    }

    return this.prisma.class.delete({
      where: {
        id,
      },
    });
  }
}
