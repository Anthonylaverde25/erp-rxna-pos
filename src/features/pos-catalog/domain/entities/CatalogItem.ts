export interface CatalogItem {
  id: number;
  sku: string;
  name: string;
  image: string | null;
  salePrice: number;
  categoryId: number | null;
  categoryName: string | null;
  unitId: number | null;
  unitName: string | null;
  totalStock: number;
  taxes: CatalogItemTax[];
}

export interface CatalogItemTax {
  id: number;
  name: string;
  rate: number;
}
