import { Task } from '@prisma/client';

export type UpdateTaskDto = Omit<Task, 'createdAt'>;
