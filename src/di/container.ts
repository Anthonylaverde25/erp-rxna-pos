import { Container } from 'inversify'
import { registerProductModule } from './modules/product.module'
import { registerCatalogModule } from './modules/catalog.module'
import { registerCartModule } from './modules/cart.module'

// ─── Inversify IoC Container ──────────────────────────────────────────────────
const container = new Container()

// Register modules
registerProductModule(container)
registerCatalogModule(container)
registerCartModule(container)

export { container }
