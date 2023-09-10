import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Organization, Prisma } from '@prisma/client';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    return this.prisma.organization.create({
      data,
    });
  }

  async list(): Promise<Organization[]> {
    return this.prisma.organization.findMany();
  }
}
