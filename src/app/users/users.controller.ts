import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/domain/dtos/create-user.dto';
import { CurrentUser } from '../libs/security/decorators/current-user.decorator';
import { UserSessionDto } from 'src/domain/dtos/user-session.dto';
import { Role } from '@prisma/client';
import { Roles } from '../libs/security/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  async findUser(@CurrentUser() currentUser: UserSessionDto) {
    const user = await this.usersService.findById({ id: currentUser.sub });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('delete')
  removeMany(@Body() body: { ids: string[] }) {
    return this.usersService.delete(body.ids);
  }

  @Post('change-status')
  async changeStatus(
    @Body() body: { ids: string[]; status: 'blocked' | 'unblocked' },
  ) {
    return this.usersService.updateStatus(body.ids, body.status);
  }
  @Roles(Role.ADMIN)
  @Post('change-role')
  async changeRole(@Body() body: { userIds: string[]; role: Role }) {
    const { userIds, role } = body;
    return this.usersService.changeRole(userIds, role);
  }
}
