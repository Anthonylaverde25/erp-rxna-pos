import { useQuery } from '@tanstack/react-query'
import { container } from '@/di/container'
import { TYPES } from '@/di/types'
import { IndexProductsUseCase } from '@/application/use_cases/products/IndexProductsUseCase'
import type { ProductEntity } from '@/domain/entities/products/ProductEntity'

// ─── useProducts ──────────────────────────────────────────────────────────────
// Fetches all products via the DI container + IndexProductsUseCase.
export const useProducts = () => {
  return useQuery<ProductEntity[], Error>({
    queryKey: ['pos-products'],
    queryFn: async () => {
      const useCase = container.get<IndexProductsUseCase>(TYPES.IndexProductsUseCase)
      return useCase.execute()
    },
  })
}
