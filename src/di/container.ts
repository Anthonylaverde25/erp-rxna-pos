import { Container } from 'inversify'
import { registerProductModule } from './modules/product.module'
import { registerCatalogModule } from './modules/catalog.module'
import { registerCartModule } from './modules/cart.module'
import { registerSettingsModule } from './modules/settings.module'

// ─── Inversify IoC Container ──────────────────────────────────────────────────
const container = new Container()

// Register modules
registerProductModule(container)
registerCatalogModule(container)
registerCartModule(container)
registerSettingsModule(container)

export { container }
