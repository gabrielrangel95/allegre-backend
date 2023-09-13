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

@ApiTags('student')
@Controller('student')
@UseGuards(AuthGuard)
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

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete student' })
  @ApiResponse({
    status: 200,
    description: 'Student deleted',
    type: StudentEntity,
  })
  async delete(@Param('id') studentId: string): Promise<StudentEntity> {
    return this.studentService.delete(studentId);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({
    status: 200,
    description: 'Student updated',
    type: StudentEntity,
  })
  async update(
    @Param('id') organizationId: string,
    @Body()
    data: StudentUpdateDto,
  ): Promise<StudentEntity> {
    return this.studentService.update(organizationId, data);
  }
}
