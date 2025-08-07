import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repositories/base-repository';
import { User } from '@prisma/client';
import { IUserRepository } from './iuser-repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  protected readonly model = 'user' as const;
  protected relations = ['position'];

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
