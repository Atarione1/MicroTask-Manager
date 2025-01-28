import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [TasksModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
