import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto, UserFindDto } from './dto';
import { UserEntity } from './user.entity';
import { FindAllResponse } from 'src/shared/types/find-all.types';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: 200,
    description: 'All users returned',
    type: UserEntity,
    isArray: true,
  })
  async listAll(
    @Query() query: UserFindDto,
  ): Promise<FindAllResponse<UserEntity>> {
    return this.userService.list(query);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 200,
    description: 'Created new user',
    type: UserEntity,
  })
  async create(
    @Body()
    data: UserCreateDto,
  ): Promise<UserEntity> {
    return this.userService.create(data);
  }
}
