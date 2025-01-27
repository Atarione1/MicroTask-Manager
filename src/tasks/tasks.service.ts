import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TasksService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('TasksService');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Databse connected');
  }
  create(createTaskDto: CreateTaskDto) {
    return this.task.create({ data: createTaskDto });
  }

  findAll() {
    return this.prismaService.task.findMany();
  }

  findOne(id: number) {
    const taskFound = await this..task.findUnique({
      where: {
        id: id,
      },
    });
    if (!taskFound) {
      throw new NotFoundException('la tarea no fue encontrado');
    }
    return taskFound;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskFound = await this.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
    if (!taskFound) {
      throw new NotFoundException(`la tarea ${id} no fue encontrado `);
    }
    return taskFound;
  }

  remove(id: number) {
    const taskDelete = await this..task.delete({
      where: {
        id: id,
      },
    });
    if (!taskDelete) {
      throw new NotFoundException(`la tarea ${id} no fue encontrado `);
    }
    return taskDelete;
  }
}
