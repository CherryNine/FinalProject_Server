import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role, Status, User } from '@prisma/client';
import { UsersRepo } from 'src/domain/repos/users-repo';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepo) {}

  async create(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.usersRepo.create({
      ...user,
      password: hashedPassword,
    });
  }

  async findAll() {
    return this.usersRepo.findAll();
  }
  async findByEmail(user: Pick<User, 'email'>) {
    return this.usersRepo.findByEmail(user);
  }
  async findById(user: Pick<User, 'id'>) {
    return this.usersRepo.findById(user);
  }

  async delete(ids: string | string[]) {
    if (Array.isArray(ids)) {
      return Promise.all(ids.map((id) => this.usersRepo.delete({ id })));
    } else {
      return this.usersRepo.delete({ id: ids });
    }
  }

  async updateStatus(
    ids: string | string[],
    status: 'blocked' | 'unblocked',
  ): Promise<User[]> {
    const updatePromises: Promise<User>[] = [];
    const idArray = Array.isArray(ids) ? ids : [ids];
    const statusValue =
      status === 'blocked' ? Status.BLOCKED : Status.UNBLOCKED;

    for (const id of idArray) {
      updatePromises.push(this.usersRepo.updateStatus(id, statusValue));
    }

    return Promise.all(updatePromises);
  }

  async changeRole(userIds: string[], newRole: Role): Promise<User[]> {
    const userPromises = userIds.map((userId) =>
      this.usersRepo.findById({ id: userId }).then((targetUser) => {
        if (!targetUser) {
          throw new NotFoundException(`User with ID ${userId} not found!`);
        }
        return targetUser;
      }),
    );

    const users = await Promise.all(userPromises);

    const updatePromises = users.map((user) =>
      this.usersRepo.updateRole(user.id, newRole),
    );

    return Promise.all(updatePromises);
  }
}
