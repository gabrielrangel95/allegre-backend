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

@ApiTags('organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
