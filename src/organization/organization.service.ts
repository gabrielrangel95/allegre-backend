import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import {
  OrganizationCreateDto,
  OrganizationUpdateDto,
  OrganizationFindDto,
} from './dto';
import { OrganizationEntity } from './organization.entity';
import { FindAllResponse } from 'src/shared/types/find-all.types';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async create(data: OrganizationCreateDto): Promise<OrganizationEntity> {
    return this.prisma.organization.create({
      data,
    });
  }

  async list(
    params: OrganizationFindDto,
  ): Promise<FindAllResponse<OrganizationEntity>> {
    const where = {
      id: params.id || undefined,
      name: params.name
        ? {
            contains: params.name,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      cnpj: params.cnpj
        ? {
            contains: params.cnpj,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.organization.count({
        where,
      }),
      this.prisma.organization.findMany({
        where,
      }),
    ]);

    return { total, data };
  }

  async delete(id: string): Promise<OrganizationEntity> {
    return this.prisma.organization.delete({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    data: OrganizationUpdateDto,
  ): Promise<OrganizationEntity> {
    return this.prisma.organization.update({
      where: {
        id,
      },
      data,
    });
  }
}
