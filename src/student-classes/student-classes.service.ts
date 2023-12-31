import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { StudentClassesEntity } from './student-classes.entity';
import { StudentClassesCreateDto, StudentClassesFindDto } from './dto';
import { FindAllResponse } from 'src/shared/types/find-all.types';

@Injectable()
export class StudentClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(
    params: StudentClassesFindDto,
  ): Promise<FindAllResponse<StudentClassesEntity>> {
    const where = {
      id: params.id || undefined,
      classId: params.classId || undefined,
      studentId: params.studentId || undefined,
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.studentClasses.count({
        where,
      }),
      this.prisma.studentClasses.findMany({
        where,
        include: {
          student: true,
        },
      }),
    ]);
    return { total, data };
  }

  async create(
    data: StudentClassesCreateDto,
  ): Promise<FindAllResponse<StudentClassesEntity>> {
    await this.prisma.studentClasses.createMany({
      data: data.studentIds.map((id) => ({
        classId: data.classId,
        studentId: id,
      })),
    });

    return this.list({
      classId: data.classId,
      take: 100,
      skip: 0,
    });
  }
}
