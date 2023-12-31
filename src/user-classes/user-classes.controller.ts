import { Controller, Post, Get, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserClassesService } from './user-classes.service';
import { UserClassesCreateDto, UserClassesFindDto } from './dto';
import { UserClassesEntity } from './user-classes.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';
import { FindAllResponse } from 'src/shared/types/find-all.types';

@ApiTags('user-classes')
@Controller('user-classes')
@UseGuards(AuthGuard, RolesGuard)
export class UserClassesController {
  constructor(private readonly userClassesService: UserClassesService) {}

  @Get('/')
  @ApiOperation({ summary: 'List all users classes' })
  @ApiResponse({
    status: 200,
    description: 'All users classes',
    type: [UserClassesEntity],
    isArray: true,
  })
  async listAll(
    @Query() params: UserClassesFindDto,
  ): Promise<FindAllResponse<UserClassesEntity>> {
    return this.userClassesService.list(params);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_MEMBER)
  @Post('/')
  @ApiOperation({ summary: 'Include new user in a class' })
  @ApiResponse({
    status: 200,
    description: 'User classes batch created',
    type: UserClassesEntity,
  })
  async create(
    @Body()
    data: UserClassesCreateDto,
  ): Promise<FindAllResponse<UserClassesEntity>> {
    return this.userClassesService.create(data);
  }
}
