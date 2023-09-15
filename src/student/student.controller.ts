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
import { StudentService } from './student.service';
import { StudentCreateDto, StudentUpdateDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentEntity } from './student.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('student')
@Controller('student')
@UseGuards(AuthGuard, RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/')
  @ApiOperation({ summary: 'List all organization students' })
  @ApiResponse({
    status: 200,
    description: 'All organizations returned',
    type: [StudentEntity],
    isArray: true,
  })
  async listAll(@Request() req): Promise<StudentEntity[]> {
    return this.studentService.list(req.user.organizationId);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_MEMBER)
  @Post('/')
  @ApiOperation({ summary: 'Create new student' })
  @ApiResponse({
    status: 200,
    description: 'Created new student',
    type: StudentEntity,
  })
  async create(
    @Request() req,
    @Body()
    data: StudentCreateDto,
  ): Promise<StudentEntity> {
    return this.studentService.create(req.user.organizationId, data);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_MEMBER)
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete student' })
  @ApiResponse({
    status: 200,
    description: 'Student deleted',
    type: StudentEntity,
  })
  async delete(
    @Request() req,
    @Param('id') studentId: string,
  ): Promise<StudentEntity> {
    return this.studentService.delete(req.user.organizationId, studentId);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_MEMBER)
  @Put('/:id')
  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({
    status: 200,
    description: 'Student updated',
    type: StudentEntity,
  })
  async update(
    @Request() req,
    @Param('id') studentId: string,
    @Body()
    data: StudentUpdateDto,
  ): Promise<StudentEntity> {
    return this.studentService.update(req.user.organizationId, studentId, data);
  }
}
