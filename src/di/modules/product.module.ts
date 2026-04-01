import { Container } from 'inversify'
import { TYPES } from '../types'
import type { IProductRepository } from '@/domain/entities/products/repositories/IProductRepository'
import { ProductRepositoryMock } from '@/infrastructure/repositories/products/ProductRepositoryMock'
import { IndexProductsUseCase } from '@/application/use_cases/products/IndexProductsUseCase'

export function registerProductModule(container: Container) {
  // Repository — swap ProductRepositoryMock for ProductRepositoryHttp when API is ready
  container.bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepositoryMock).inSingletonScope()

  // Use Cases
  container.bind<IndexProductsUseCase>(TYPES.IndexProductsUseCase).to(IndexProductsUseCase)
}
