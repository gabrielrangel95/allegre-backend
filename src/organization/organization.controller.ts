import { Controller, Post, Get, Body } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization as OrganizationModel } from '@prisma/client';
import { OrganizationCreateDto } from './dto/organization-create.dto';

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
    data: OrganizationCreateDto,
  ): Promise<OrganizationModel> {
    return this.organizationService.create(data);
  }
}
