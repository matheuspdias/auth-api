import { User } from '@prisma/client';
import { BaseRepositoryInterface } from 'src/common/repositories/base-repository.interface';

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
  findByEmail(email: string): Promise<User | null>;
}
