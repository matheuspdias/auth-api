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

  // Relacionamentos dinâmicos que os repositórios filhos sobrescrevem
  protected relations: string[] = [];

  constructor(protected readonly prisma: PrismaClient) {}

  protected get repository(): Delegate<TModel> {
    return this.prisma[this.model] as unknown as Delegate<TModel>;
  }

  // Função auxiliar para transformar ['user', 'customer'] ou outros relacionamento em { user: true, customer: true }
  protected buildIncludes(): Record<string, boolean> {
    return this.relations.reduce(
      (acc, relation) => {
        acc[relation] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );
  }

  async findById(id: number): Promise<TModel | null> {
    return this.repository.findUnique({
      where: { id },
      include: this.buildIncludes(),
    });
  }

  async findByCriteria(criteria: Partial<TModel>): Promise<TModel | null> {
    return this.repository.findFirst({
      where: criteria,
    });
  }

  async getAll(): Promise<TModel[]> {
    return this.repository.findMany({
      include: this.buildIncludes(),
    });
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
    const include = this.buildIncludes();

    const [data, total] = await Promise.all([
      this.repository.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        include,
      }),
      this.repository.count(),
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
