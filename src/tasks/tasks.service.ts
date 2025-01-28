import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

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
    return this.task.findMany();
  }

  async findOne(id: number) {
    const taskFound = await this.task.findUnique({
      where: {
        id: id,
      },
    });
    if (!taskFound) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `task with id ${id} not found`,
      });
    }
    return taskFound;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskF = await this.findOne(id);
    if (!taskF) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `task with id ${id} not found`,
      });
    }
    const taskFound = await this.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
    if (!taskFound) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `task with id ${id} not found`,
      });
    }
    return taskFound;
  }

  async remove(id: number) {
    const taskDelete = await this.task.delete({
      where: {
        id: id,
      },
    });
    if (!taskDelete) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `task with id ${id} not found`,
      });
    }
    return taskDelete;
  }
}
