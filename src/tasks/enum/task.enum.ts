import { TaskStatus } from '@prisma/client';

export const TasksStatusList = [
  TaskStatus.POR_HACER,
  TaskStatus.EN_PROCESO,
  TaskStatus.COMPLETADA,
];
