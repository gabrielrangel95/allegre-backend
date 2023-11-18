import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserClassesEntity } from './user-classes.entity';
import { UserClassesCreateDto } from './dto';

@Injectable()
export class UserClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(classId: string): Promise<UserClassesEntity[]> {
    return this.prisma.userClasses.findMany({
      where: {
        classId,
      },
      include: {
        user: true,
      },
    });
  }

  async create(data: UserClassesCreateDto): Promise<UserClassesEntity[]> {
    await this.prisma.userClasses.createMany({
      data: data.usersIds.map((id) => ({
        classId: data.classId,
        userId: id,
      })),
    });

    return this.list(data.classId);
  }
}
