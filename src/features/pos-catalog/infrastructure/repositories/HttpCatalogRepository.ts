import { injectable, inject } from 'inversify';
import type { CatalogItem } from '../../domain/entities/CatalogItem';
import type { ICatalogRepository } from '../../domain/repositories/ICatalogRepository';
import type { AxiosInstance } from 'axios';
import { TYPES } from '@/di/types';

@injectable()
export class HttpCatalogRepository implements ICatalogRepository {
  constructor(
    @inject(TYPES.HttpClient) private httpClient: AxiosInstance
  ) {}

  async getCatalog(): Promise<CatalogItem[]> {
    const response = await this.httpClient.get<{ data: any[] }>('/pos/catalog');
    
    return response.data.data.map(item => ({
      id: item.id,
      sku: item.sku,
      name: item.name,
      image: item.image,
      salePrice: item.sale_price,
      categoryId: item.category_id,
      categoryName: item.category_name,
      unitId: item.unit_id,
      unitName: item.unit_name,
      totalStock: item.total_stock,
      taxes: item.taxes.map((tax: any) => ({
        id: tax.id,
        name: tax.name,
        rate: tax.rate
      }))
    }));
  }
}
