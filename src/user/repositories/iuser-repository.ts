import { User } from '@prisma/client';
import { IBaseRepository } from 'src/common/repositories/ibase-repository';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
