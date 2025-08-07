export interface BaseRepositoryInterface<
  TModel,
  TWhereInput = any,
  TCreateInput = Partial<TModel>,
  TUpdateInput = Partial<TModel>,
> {
  findById(id: number): Promise<TModel | null>;
  findByCriteria(criteria: TWhereInput): Promise<TModel | null>;
  getAll(): Promise<TModel[]>;
  paginate(
    page?: number,
    perPage?: number,
  ): Promise<{
    data: TModel[];
    total: number;
    page: number;
    perPage: number;
  }>;
  store(data: TCreateInput): Promise<TModel>;
  update(id: number, data: TUpdateInput): Promise<TModel>;
  deleteById(id: number): Promise<void>;
}
