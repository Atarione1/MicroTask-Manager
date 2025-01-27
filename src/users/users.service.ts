import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('TasksService');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Databse connected');
  }
  create(createUserDto: CreateUserDto) {
    return this.user.create({ data: createUserDto });
  }

  findAll() {
    return this.user.findMany();
  }

  async findOne(id: number) {
    const projectFound = await this.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!projectFound) {
      throw new NotFoundException('el usuario no fue encontrado');
    }
    return projectFound;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userr = this.user.update({
      where: {
        id,
      },
      data: updateTaskDto,
    })
    if (!userr) {
      throw new NotFoundException(`el usuario ${id} no fue encontrado `);
    }
  }

  async remove(id: number) {
    const projectDelete = await this.user.delete({
      where: {
        id: id,
      },
    });
    if (!projectDelete) {
      throw new NotFoundException(`el usuario ${id} no fue encontrado `);
    }
    return projectDelete;
  }
}
