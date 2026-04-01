import { useTheme } from '@/providers/ThemeProvider'
import { Plus, Info } from 'lucide-react'
import type { CatalogItem } from '../domain/entities/CatalogItem'

interface ProductTableProps {
  products: CatalogItem[]
  onAddToCart: (product: CatalogItem) => void
}

// ─── ProductTable (Fiori Edition) ─────────────────────────────────────────────
export function ProductTable({ products, onAddToCart }: ProductTableProps) {
  const { isDark } = useTheme()

  const sapBlue = '#005483'
  const sapTextPrimary = isDark ? '#f3f4f6' : '#32363a'
  const sapTextSecondary = isDark ? '#a0aec0' : '#6a6d70'
  const sapBorder = isDark ? '#2a2a2a' : '#eeeeee'
  const sapHover = isDark ? 'hover:bg-[#222222]' : 'hover:bg-[#f5f7f9]'

  if (products.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center opacity-30">
        <Info size={48} className="mb-2" />
        <p className={`text-sm font-black ${sapTextPrimary} uppercase`}>Sin resultados técnicos</p>
        <p className="text-[10px] font-bold uppercase tracking-widest">Ajuste los parámetros de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead className={`sticky top-0 z-10 ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
          <tr className={`border-b-2 ${sapBorder}`}>
            <th className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest ${sapTextSecondary}`}>Detalle del Item</th>
            <th className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest ${sapTextSecondary} hidden sm:table-cell`}>Categoría</th>
            <th className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest ${sapTextSecondary} text-right`}>Inventario</th>
            <th className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest ${sapTextSecondary} text-right`}>Precio Neto</th>
            <th className="px-4 py-3 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-[#2a2a2a]">
          {products.map((product) => (
            <tr
              key={product.id}
              onClick={() => onAddToCart(product)}
              className={`group cursor-pointer transition-all border-l-[4px] border-l-transparent ${sapHover} hover:border-l-[#005483]`}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border ${isDark ? 'bg-[#222] border-[#333]' : 'bg-[#f8f9fa] border-[#eee]'}`}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover rounded-[3px]" />
                    ) : (
                      <span className="text-[10px] font-black text-[#005483] opacity-40 uppercase">{product.sku.substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xs font-black leading-tight ${sapTextPrimary} uppercase`}>{product.name}</span>
                    <span className="mt-0.5 font-mono text-[9px] font-bold text-[#005483] tracking-tighter uppercase">
                      SKU: {product.sku}
                    </span>
                  </div>
                </div>
              </td>
              <td className={`px-4 py-3 hidden sm:table-cell`}>
                <span className={`inline-block border ${isDark ? 'border-[#333] bg-[#222]' : 'border-gray-200 bg-gray-50'} px-2 py-0.5 text-[9px] font-black uppercase text-[#6a6d70]`}>
                  {product.categoryName || 'General'}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex flex-col items-end">
                  <span className={`font-mono text-xs font-black ${product.totalStock <= 0 ? 'text-red-500' : sapTextPrimary}`}>
                    {product.totalStock}
                  </span>
                  <span className="text-[8px] font-bold uppercase text-gray-400">Unidades</span>
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <span className={`text-sm font-black tracking-tight ${sapTextPrimary}`}>
                  {(product.salePrice || 0).toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className={`flex h-7 w-7 items-center justify-center rounded-[4px] transition-all ${
                  isDark ? 'bg-[#2a2a2a] group-hover:bg-[#005483]' : 'bg-gray-100 group-hover:bg-[#d5e3ff]'
                }`}>
                  <Plus size={14} strokeWidth={3} className={isDark ? 'text-white' : 'text-[#00529c]'} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
