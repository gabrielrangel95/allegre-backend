import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationCreateDto, OrganizationUpdateDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrganizationEntity } from './organization.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('organization')
@Controller('organization')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
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

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete organization' })
  @ApiResponse({
    status: 200,
    description: 'Organization deleted',
    type: OrganizationEntity,
  })
  async delete(
    @Param('id') organizationId: string,
  ): Promise<OrganizationEntity> {
    return this.organizationService.delete(organizationId);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update organization' })
  @ApiResponse({
    status: 200,
    description: 'Organization updated',
    type: OrganizationEntity,
  })
  async update(
    @Param('id') organizationId: string,
    @Body()
    data: OrganizationUpdateDto,
  ): Promise<OrganizationEntity> {
    return this.organizationService.update(organizationId, data);
  }
}
