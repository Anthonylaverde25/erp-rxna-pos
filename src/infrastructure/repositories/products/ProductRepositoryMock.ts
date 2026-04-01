import { injectable } from 'inversify'
import type { IProductRepository } from '@/domain/entities/products/repositories/IProductRepository'
import { ProductEntity } from '@/domain/entities/products/ProductEntity'

// ─── Static mock data — replace with HTTP implementation when API is ready ────
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Nexus Book Pro 16',
    sku: 'LAP-8877',
    category: 'Tech / Hardware',
    price: 2499.0,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    id: '2',
    name: 'Ultra-Vision Display 32"',
    sku: 'MON-3290',
    category: 'Tech / Monitor',
    price: 1299.0,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    id: '3',
    name: 'Linear-Flow Keyboard',
    sku: 'KBD-5520',
    category: 'Accessories',
    price: 189.0,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    id: '4',
    name: 'Industrial Ambient Light',
    sku: 'LGT-9012',
    category: 'Office / Decor',
    price: 245.5,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    id: '5',
    name: 'Studio Clarity H1',
    sku: 'HDP-1010',
    category: 'Tech / Audio',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    id: '6',
    name: 'BrewMaster Smart-V',
    sku: 'CFE-2200',
    category: 'Office / Pantry',
    price: 890.0,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=100&h=100',
  },
]

// ─── ProductRepositoryMock — Infrastructure ───────────────────────────────────
// Implements IProductRepository with static mock data.
// Swap this class for ProductRepositoryHttp when the backend API is available.
@injectable()
export class ProductRepositoryMock implements IProductRepository {
  async index(): Promise<ProductEntity[]> {
    // Simulate async API call
    await Promise.resolve()
    return MOCK_PRODUCTS.map(ProductEntity.fromData)
  }
}
