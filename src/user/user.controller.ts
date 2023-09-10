import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto } from './dto';
import { UserEntity } from './user.entity';

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
  async listAll(): Promise<UserEntity[]> {
    return this.userService.list();
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
