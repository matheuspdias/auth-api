import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    UserService,
    PrismaService,
  ],
  exports: ['IUserRepository', UserService],
  controllers: [UserController],
})
export class UserModule {}
