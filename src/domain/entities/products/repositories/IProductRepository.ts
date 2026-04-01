import type { ProductEntity } from '../ProductEntity'

// ─── IProductRepository — Domain Interface ────────────────────────────────────
export interface IProductRepository {
  index(): Promise<ProductEntity[]>
}
