import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { StudentClassesEntity } from './student-classes.entity';
import { StudentClassesCreateDto } from './dto';

@Injectable()
export class StudentClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(classId: string): Promise<StudentClassesEntity[]> {
    return this.prisma.studentClasses.findMany({
      where: {
        classId,
      },
      include: {
        student: true,
      },
    });
  }

  async create(data: StudentClassesCreateDto): Promise<StudentClassesEntity[]> {
    await this.prisma.studentClasses.createMany({
      data: data.studentIds.map((id) => ({
        classId: data.classId,
        studentId: id,
      })),
    });

    return this.list(data.classId);
  }
}
