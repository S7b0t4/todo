import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { Task } from 'src/task/task.model';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([User, Task])
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
