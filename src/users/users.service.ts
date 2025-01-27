import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
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
  async create(createUserDto: CreateUserDto) {
    const found = await this.user.findUnique({
      where: {
        name: createUserDto.name,
      },
    });
    if (found?.name === createUserDto.name) {
      throw new BadRequestException('usuario ya existe');
    }
    return this.user.create({ data: createUserDto });
  }

  findAll() {
    return this.user.findMany();
  }

  async findOne(id: number) {
    const Found = await this.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!Found) {
      throw new NotFoundException('el usuario no fue encontrado');
    }
    return Found;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const Found = await this.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    if (!Found) {
      throw new NotFoundException(`el usuario ${id} no fue encontrado `);
    }
    return Found;
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
