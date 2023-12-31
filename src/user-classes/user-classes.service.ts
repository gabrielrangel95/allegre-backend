import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserClassesEntity } from './user-classes.entity';
import { UserClassesCreateDto, UserClassesFindDto } from './dto';
import { FindAllResponse } from 'src/shared/types/find-all.types';

@Injectable()
export class UserClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(
    params: UserClassesFindDto,
  ): Promise<FindAllResponse<UserClassesEntity>> {
    const where = {
      id: params.id || undefined,
      classId: params.classId || undefined,
      userId: params.userId || undefined,
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.userClasses.count({
        where,
      }),
      this.prisma.userClasses.findMany({
        where,
        include: {
          user: true,
        },
      }),
    ]);

    return { total, data };
  }

  async create(
    data: UserClassesCreateDto,
  ): Promise<FindAllResponse<UserClassesEntity>> {
    await this.prisma.userClasses.createMany({
      data: data.usersIds.map((id) => ({
        classId: data.classId,
        userId: id,
      })),
    });

    return this.list({
      classId: data.classId,
      take: 100,
      skip: 0,
    });
  }
}
