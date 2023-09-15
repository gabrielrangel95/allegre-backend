import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ClassEntity } from './class.entity';
import { ClassCreateDto, ClassUpdateDto } from './dto';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}

  async list(organizationId: string): Promise<ClassEntity[]> {
    return this.prisma.class.findMany({
      where: {
        organizationId,
      },
    });
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
