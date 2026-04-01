import { useState } from 'react'
import { useTheme } from '@/providers/ThemeProvider'
import { PosHeader } from './PosHeader'
import { PosSidebar } from './PosSidebar'
import { ActiveCart } from '@/features/pos-cart/components/ActiveCart'
import { ProductCatalog } from '@/features/pos-catalog/components/ProductCatalog'
import { PosPaymentModal } from '@/features/pos-cart/components/PosPaymentModal'
import type { CatalogItem } from '@/features/pos-catalog/domain/entities/CatalogItem'
import { useCart } from '@/features/pos-cart/hooks/useCart'

// ─── PosLayout (Fiori Edition) ────────────────────────────────────────────────
export function PosLayout() {
  const { isDark } = useTheme()
  const { cart, addToCart, updateQuantity, clearCart, subtotal, tax, total, checkout, isProcessing } = useCart([])
  const [paymentOpen, setPaymentOpen] = useState(false)

  // SAP Fiori Workspace Background
  const bg = isDark ? 'bg-[#0f0f0f]' : 'bg-[#f5f7f9]'

  const handleAddToCart = (product: CatalogItem) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      sku: product.sku,
      category: product.categoryName || 'General',
      price: product.salePrice,
      image: product.image,
    })
  }

  const handleConfirmPayment = async () => {
    try {
      // Por defecto usamos método de pago ID: 1 (Efectivo/Caja)
      await checkout(1)
      setPaymentOpen(false)
      // Podríamos mostrar un mensaje de éxito o imprimir el ticket aquí
    } catch (error) {
      alert('Error al procesar el pago. Por favor, reintente.')
    }
  }

  return (
    <div className={`flex h-screen flex-col overflow-hidden ${bg} font-sans transition-colors duration-200`}>
      <PosHeader />

      <div className="flex flex-1 overflow-hidden">
        <PosSidebar />

        <main className="flex flex-1 overflow-hidden p-3 gap-3">
          <div className="flex flex-col h-full shadow-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] rounded-[4px] overflow-hidden">
            <ActiveCart
              cart={cart}
              subtotal={subtotal}
              tax={tax}
              total={total}
              onUpdateQuantity={updateQuantity}
              onClearCart={clearCart}
              onCheckout={() => setPaymentOpen(true)}
            />
          </div>

          <div className="flex flex-1 flex-col h-full shadow-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] rounded-[4px] overflow-hidden">
            <ProductCatalog onAddToCart={handleAddToCart} />
          </div>
        </main>
      </div>

      <PosPaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        total={total}
        isProcessing={isProcessing}
        onConfirm={handleConfirmPayment}
      />
    </div>
  )
}
