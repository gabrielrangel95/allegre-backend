import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { StudentEntity } from './student.entity';
import { StudentCreateDto, StudentUpdateDto, StudentFindDto } from './dto';
import { FindAllResponse } from 'src/shared/types/find-all.types';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async list(params: StudentFindDto): Promise<FindAllResponse<StudentEntity>> {
    const where = {
      id: params.id || undefined,
      name: params.name
        ? {
            contains: params.name,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      organizationId: params.organizationId || undefined,
      rg: params.rg
        ? {
            contains: params.rg,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      cpf: params.cpf
        ? {
            contains: params.cpf,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      nis: params.nis
        ? {
            contains: params.nis,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      dateOfBirth: params.dateOfBirth || undefined,
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.student.count({
        where,
      }),
      this.prisma.student.findMany({
        where: where,
        take: Number(params.take) || 20,
        skip: Number(params.skip) || 0,
      }),
    ]);

    return { total, data };
  }

  async create(
    organizationId: string,
    data: StudentCreateDto,
  ): Promise<StudentEntity> {
    return this.prisma.student.create({
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
    data: StudentUpdateDto,
  ): Promise<StudentEntity> {
    const student = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (student.organizationId !== organizationId) {
      throw new UnauthorizedException();
    }

    return this.prisma.student.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(organizationId: string, id: string): Promise<StudentEntity> {
    const student = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (student.organizationId !== organizationId) {
      throw new UnauthorizedException();
    }

    return this.prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
