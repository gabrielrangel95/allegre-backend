import { Controller, Post, Get, Body } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization as OrganizationModel } from '@prisma/client';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get('/')
  async listAll(): Promise<OrganizationModel[]> {
    return this.organizationService.list();
  }

  @Post('/')
  async create(
    @Body()
    data: {
      name: string;
      logoUrl?: string;
      cnpj: string;
      phone?: string;
    },
  ): Promise<OrganizationModel> {
    return this.organizationService.create(data);
  }
}
