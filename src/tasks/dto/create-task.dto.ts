import { TaskStatus } from '@prisma/client';
import {
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { TasksStatusList } from '../enum/task.enum';

export class CreateTaskDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsISO8601()
  finishedAt: string;
  @IsEnum(TasksStatusList, { message: 'error status task' })
  @IsOptional()
  status: TaskStatus = TaskStatus.POR_HACER;
  @IsPositive()
  @IsNumber()
  userId: number;
}
