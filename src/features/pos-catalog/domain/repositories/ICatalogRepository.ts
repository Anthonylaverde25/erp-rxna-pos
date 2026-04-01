import type { CatalogItem } from '../entities/CatalogItem';

export interface ICatalogRepository {
  getCatalog(): Promise<CatalogItem[]>;
}
