import { User } from '@prisma/client';

export type UpdateUserDto = Omit<User, 'createdAt'>;
