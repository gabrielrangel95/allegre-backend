import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OrganizationCreateDto, OrganizationUpdateDto } from './dto';
import { OrganizationEntity } from './organization.entity';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async create(data: OrganizationCreateDto): Promise<OrganizationEntity> {
    return this.prisma.organization.create({
      data,
    });
  }

  async list(): Promise<OrganizationEntity[]> {
    return this.prisma.organization.findMany();
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
