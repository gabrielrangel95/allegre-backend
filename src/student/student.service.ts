import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { StudentEntity } from './student.entity';
import { StudentCreateDto, StudentUpdateDto } from './dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async list(organizationId: string): Promise<StudentEntity[]> {
    return this.prisma.student.findMany({
      where: {
        organizationId,
      },
    });
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
