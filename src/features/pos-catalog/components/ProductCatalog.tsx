import { useEffect, useState } from 'react'
import { useTheme } from '@/providers/ThemeProvider'
import { useCatalogStore } from '../application/store/useCatalogStore'
import { ProductSearch } from './ProductSearch'
import { CategoryFilter } from './CategoryFilter'
import { ProductTable } from './ProductTable'
import type { CatalogItem } from '../domain/entities/CatalogItem'

interface ProductCatalogProps {
  onAddToCart: (product: any) => void
}

// ─── ProductCatalog ───────────────────────────────────────────────────────────
export function ProductCatalog({ onAddToCart }: ProductCatalogProps) {
  const { isDark } = useTheme()
  const { items, isLoading, fetchCatalog, filteredItems } = useCatalogStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  useEffect(() => {
    fetchCatalog()
  }, [fetchCatalog])

  const products = filteredItems(searchQuery, selectedCategoryId)

  // Extraer categorías únicas de los productos cargados
  const categories = Array.from(new Set(items.map(item => item.categoryId)))
    .filter(id => id !== null)
    .map(id => {
      const item = items.find(i => i.categoryId === id);
      return { id: id as number, name: item?.categoryName || 'Unknown' };
    });

  const border = isDark ? 'border-[#2a2a2a]' : 'border-gray-200'
  const surface = isDark ? 'bg-[#1a1a1a]' : 'bg-white'
  const textPrimary = isDark ? 'text-gray-100' : 'text-gray-900'

  if (isLoading && items.length === 0) {
    return (
      <div className={`flex flex-1 items-center justify-center ${surface}`}>
        <p className={`text-sm font-bold ${textPrimary} opacity-40 animate-pulse`}>
          Sincronizando catálogo...
        </p>
      </div>
    )
  }

  return (
    <section className={`flex flex-1 flex-col ${surface} min-w-0 transition-colors duration-200`}>
      <div className={`border-b ${border} p-4 md:p-6`}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h1 className={`text-xl font-black tracking-tight ${textPrimary} md:text-2xl`}>
            Catálogo de Productos
          </h1>
          <CategoryFilter
            categories={categories}
            selected={selectedCategoryId}
            onSelect={setSelectedCategoryId}
          />
        </div>
        <ProductSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-6">
        <ProductTable products={products} onAddToCart={onAddToCart} />
      </div>
    </section>
  )
}
