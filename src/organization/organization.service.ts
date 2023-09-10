import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Organization } from '@prisma/client';
import { OrganizationCreateDto } from './dto/organization-create.dto';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async create(data: OrganizationCreateDto): Promise<Organization> {
    return this.prisma.organization.create({
      data,
    });
  }

  async list(): Promise<Organization[]> {
    return this.prisma.organization.findMany();
  }
}
