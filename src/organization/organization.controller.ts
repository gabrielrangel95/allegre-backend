import { Controller, Post, Get, Body } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationCreateDto } from './dto/organization-create.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrganizationEntity } from './organization.entity';

@ApiTags('organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get('/')
  @ApiOperation({ summary: 'List all organizations' })
  @ApiResponse({
    status: 200,
    description: 'All organizations returned',
    type: OrganizationEntity,
    isArray: true,
  })
  async listAll(): Promise<OrganizationEntity[]> {
    return this.organizationService.list();
  }

  @Post('/')
  @ApiOperation({ summary: 'Create new organization' })
  @ApiResponse({
    status: 200,
    description: 'Created new organization',
    type: OrganizationEntity,
  })
  async create(
    @Body()
    data: OrganizationCreateDto,
  ): Promise<OrganizationEntity> {
    return this.organizationService.create(data);
  }
}
