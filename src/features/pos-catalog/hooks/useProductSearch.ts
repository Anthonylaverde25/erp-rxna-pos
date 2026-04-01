import { useMemo, useState } from 'react'
import type { ProductEntity } from '@/domain/entities/products/ProductEntity'

// ─── useProductSearch ─────────────────────────────────────────────────────────
// Encapsulates search query + category filter state and the derived filtered list.
export const CATEGORIES = ['All Items', 'Tech', 'Office', 'Hardware', 'Accessory']

export function useProductSearch(products: ProductEntity[]) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Items')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        product.name.toLowerCase().includes(q) || product.sku.toLowerCase().includes(q)
      const matchesCategory =
        selectedCategory === 'All Items' || product.category.includes(selectedCategory)
      return matchesSearch && matchesCategory
    })
  }, [products, searchQuery, selectedCategory])

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  }
}
