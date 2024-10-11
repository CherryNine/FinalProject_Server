import { UsersService } from './users.service';
import { CreateUserDto } from 'src/domain/dtos/create-user.dto';
import { UserSessionDto } from 'src/domain/dtos/user-session.dto';
import { Role } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findUser(currentUser: UserSessionDto): Promise<{
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
    create(createUserDto: CreateUserDto): Promise<{
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
    removeMany(body: {
        ids: string[];
    }): Promise<{
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
    changeStatus(body: {
        ids: string[];
        status: 'blocked' | 'unblocked';
    }): Promise<{
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
    changeRole(body: {
        userIds: string[];
        role: Role;
    }): Promise<{
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
}
