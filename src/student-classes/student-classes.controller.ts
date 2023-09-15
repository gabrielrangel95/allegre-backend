import { Controller, Post, Get, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentClassesService } from './student-classes.service';
import { StudentClassesCreateDto } from './dto';
import { StudentClassesEntity } from './student-classes.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('student-classes')
@Controller('student-classes')
@UseGuards(AuthGuard, RolesGuard)
export class StudentClassesController {
  constructor(private readonly studentClassesService: StudentClassesService) {}

  @Get('/')
  @ApiOperation({ summary: 'List all students classes' })
  @ApiResponse({
    status: 200,
    description: 'All student classes',
    type: [StudentClassesEntity],
    isArray: true,
  })
  async listAll(@Query() { classId }): Promise<StudentClassesEntity[]> {
    return this.studentClassesService.list(classId);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_MEMBER)
  @Post('/')
  @ApiOperation({ summary: 'Include new students in a class' })
  @ApiResponse({
    status: 200,
    description: 'Student classes batch created',
    type: StudentClassesEntity,
  })
  async create(
    @Body()
    data: StudentClassesCreateDto,
  ): Promise<StudentClassesEntity[]> {
    return this.studentClassesService.create(data);
  }
}
