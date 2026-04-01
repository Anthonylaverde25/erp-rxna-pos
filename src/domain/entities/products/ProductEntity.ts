// ─── ProductEntity — Domain Entity ───────────────────────────────────────────

export class ProductEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly sku: string,
    public readonly category: string,
    public readonly price: number,
    public readonly image: string,
  ) {}

  /**
   * Creates a ProductEntity from a plain data object (e.g. DTO or mock data).
   */
  static fromData(data: {
    id: string
    name: string
    sku: string
    category: string
    price: number
    image: string
  }): ProductEntity {
    return new ProductEntity(
      data.id,
      data.name,
      data.sku,
      data.category,
      data.price,
      data.image,
    )
  }
}
