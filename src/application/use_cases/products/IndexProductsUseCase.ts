import type { IProductRepository } from '@/domain/entities/products/repositories/IProductRepository'
import { ProductEntity } from '@/domain/entities/products/ProductEntity'
import { injectable, inject } from 'inversify'
import { TYPES } from '@/di/types'

// ─── IndexProductsUseCase ─────────────────────────────────────────────────────
@injectable()
export class IndexProductsUseCase {
  constructor(
    @inject(TYPES.IProductRepository) private readonly productRepository: IProductRepository,
  ) {}

  async execute(): Promise<ProductEntity[]> {
    return this.productRepository.index()
  }
}
