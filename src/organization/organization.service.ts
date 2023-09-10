import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OrganizationCreateDto } from './dto/organization-create.dto';
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
}
