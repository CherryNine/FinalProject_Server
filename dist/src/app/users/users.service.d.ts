import { CreateUserDto } from 'src/domain/dtos/create-user.dto';
import { Role, User } from '@prisma/client';
import { UsersRepo } from 'src/domain/repos/users-repo';
export declare class UsersService {
    private usersRepo;
    constructor(usersRepo: UsersRepo);
    create(user: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.Status;
        refreshToken: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.Status;
        refreshToken: string | null;
    }[]>;
    findByEmail(user: Pick<User, 'email'>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.Status;
        refreshToken: string | null;
    }>;
    findById(user: Pick<User, 'id'>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.Status;
        refreshToken: string | null;
    }>;
    delete(ids: string | string[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.Status;
        refreshToken: string | null;
    } | {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.Status;
        refreshToken: string | null;
    }[]>;
    updateStatus(ids: string | string[], status: 'blocked' | 'unblocked'): Promise<User[]>;
    changeRole(userIds: string[], newRole: Role): Promise<User[]>;
}
