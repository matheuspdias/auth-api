export interface BaseRepositoryInterface<
  TModel,
  TWhereInput = any,
  TCreateInput = Partial<TModel>,
  TUpdateInput = Partial<TModel>,
> {
  findById(id: number): Promise<TModel | null>;
  findByCriteria(criteria: TWhereInput): Promise<TModel | null>;
  getAll(): Promise<TModel[]>;
  store(data: TCreateInput): Promise<TModel>;
  update(id: number, data: TUpdateInput): Promise<TModel>;
  deleteById(id: number): Promise<void>;
}
