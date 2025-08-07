import { PrismaClient } from '@prisma/client';
import { BaseRepositoryInterface } from './base-repository.interface';

type Delegate<T> = {
  findUnique: (args: any) => Promise<T | null>;
  findFirst: (args: any) => Promise<T | null>;
  findMany: (args?: any) => Promise<T[]>;
  create: (args: any) => Promise<T>;
  update: (args: any) => Promise<T>;
  delete: (args: any) => Promise<T>;
  count: (args?: any) => Promise<number>;
};

export abstract class BaseRepository<TModel>
  implements BaseRepositoryInterface<TModel>
{
  protected abstract readonly model: keyof PrismaClient;

  constructor(protected readonly prisma: PrismaClient) {}

  protected get repository(): Delegate<TModel> {
    return this.prisma[this.model] as unknown as Delegate<TModel>;
  }

  async findById(id: number): Promise<TModel | null> {
    return this.repository.findUnique({
      where: { id },
    });
  }

  async findByCriteria(criteria: Partial<TModel>): Promise<TModel | null> {
    return this.repository.findFirst({
      where: criteria,
    });
  }

  async getAll(): Promise<TModel[]> {
    return this.repository.findMany();
  }

  async paginate(
    page = 1,
    perPage = 10,
  ): Promise<{
    data: TModel[];
    total: number;
    page: number;
    perPage: number;
  }> {
    const repository = this.repository;

    const [data, total] = await Promise.all([
      repository.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      repository.count(),
    ]);

    return {
      data,
      total,
      page,
      perPage,
    };
  }

  async store(data: Partial<TModel>): Promise<TModel> {
    return this.repository.create({
      data,
    });
  }

  async update(id: number, data: Partial<TModel>): Promise<TModel> {
    return this.repository.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({
      where: { id },
    });
  }
}
