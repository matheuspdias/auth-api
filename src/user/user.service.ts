import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from './repositories/iuser-repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async findUserById(id: number) {
    return this.userRepository.findById(id);
  }

  async getAll() {
    return await this.userRepository.paginate(1, 3);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByCriteria({ email });
  }
}
