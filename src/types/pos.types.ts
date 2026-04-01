// ─── POS Domain Types ─────────────────────────────────────────────────────────

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  image: string
}

export interface CartItem extends Product {
  quantity: number
  discountPercent?: number
}

export type ThemeMode = 'light' | 'dark'
