// ─── DI Symbols ───────────────────────────────────────────────────────────────
// Unique symbols for the Inversify IoC container.

export const TYPES = {
  // Infrastructure
  HttpClient: Symbol.for('HttpClient'),

  // Products
  IProductRepository: Symbol.for('IProductRepository'),
  IndexProductsUseCase: Symbol.for('IndexProductsUseCase'),
  
  // POS Catalog
  ICatalogRepository: Symbol.for('ICatalogRepository'),
  
  // POS Cart / Transactions
  ITransactionRepository: Symbol.for('ITransactionRepository'),
}
