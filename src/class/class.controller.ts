import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassService } from './class.service';
import { ClassCreateDto, ClassUpdateDto } from './dto';
import { ClassEntity } from './class.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('class')
@Controller('class')
@UseGuards(AuthGuard, RolesGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get('/')
  @ApiOperation({ summary: 'List all classes from a organization' })
  @ApiResponse({
    status: 200,
    description: 'All organizations classes returned',
    type: [ClassEntity],
    isArray: true,
  })
  async listAll(@Request() req): Promise<ClassEntity[]> {
    return this.classService.list(req.user.organizationId);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_MEMBER)
  @Post('/')
  @ApiOperation({ summary: 'Create new class' })
  @ApiResponse({
    status: 200,
    description: 'Created new class',
    type: ClassEntity,
  })
  async create(
    @Request() req,
    @Body()
    data: ClassCreateDto,
  ): Promise<ClassEntity> {
    return this.classService.create(req.user.organizationId, data);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_MEMBER)
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete class' })
  @ApiResponse({
    status: 200,
    description: 'Class deleted',
    type: ClassEntity,
  })
  async delete(
    @Request() req,
    @Param('id') studentId: string,
  ): Promise<ClassEntity> {
    return this.classService.delete(req.user.organizationId, studentId);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_MEMBER)
  @Put('/:id')
  @ApiOperation({ summary: 'Update class' })
  @ApiResponse({
    status: 200,
    description: 'Class updated',
    type: ClassEntity,
  })
  async update(
    @Request() req,
    @Param('id') studentId: string,
    @Body()
    data: ClassUpdateDto,
  ): Promise<ClassEntity> {
    return this.classService.update(req.user.organizationId, studentId, data);
  }
}
