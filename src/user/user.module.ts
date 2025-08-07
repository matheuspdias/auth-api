import { Module } from '@nestjs/common';
import { UserRepository } from './interfaces/user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    UserService,
    PrismaService,
  ],
  exports: ['UserRepositoryInterface'],
  controllers: [UserController],
})
export class UserModule {}
