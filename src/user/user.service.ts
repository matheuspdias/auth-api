import { Inject, Injectable } from '@nestjs/common';
import type { UserRepositoryInterface } from './interfaces/user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async findUserById(id: number) {
    return this.userRepository.findById(id);
  }

  async getAll() {
    return await this.userRepository.paginate(1, 3);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
