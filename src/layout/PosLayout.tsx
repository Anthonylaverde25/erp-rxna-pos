import { useState } from 'react'
import { useTheme } from '@/providers/ThemeProvider'
import { PosHeader } from './PosHeader'
import { PosSidebar } from './PosSidebar'
import { ActiveCart } from '@/features/pos-cart/components/ActiveCart'
import { ProductCatalog } from '@/features/pos-catalog/components/ProductCatalog'
import { PosPaymentModal } from '@/features/pos-cart/components/PosPaymentModal'
import { PosTicketReceipt } from '@/features/pos-cart/components/receipt/PosTicketReceipt'
import type { CatalogItem } from '@/features/pos-catalog/domain/entities/CatalogItem'
import { useCart } from '@/features/pos-cart/hooks/useCart'
import { Box } from '@mui/material'

// ─── PosLayout (Fiori Edition) ────────────────────────────────────────────────
export function PosLayout() {
  const { isDark } = useTheme()
  const { 
    cart, 
    addToCart, 
    updateQuantity, 
    updateDiscount, 
    clearCart, 
    subtotal, 
    tax, 
    total, 
    checkout, 
    isProcessing 
  } = useCart([])
  
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [completedTicket, setCompletedTicket] = useState<any | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<any | null>(null)

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

  const handleConfirmPayment = async (pInfo: any) => {
    try {
      setPaymentInfo(pInfo)
      const result = await checkout(pInfo.methodId)
      
      // Store result to show receipt
      setCompletedTicket(result)
      setPaymentOpen(false)
    } catch (error) {
      alert('Error al procesar el pago. Por favor, reintente.')
    }
  }

  const handleCloseReceipt = () => {
    setCompletedTicket(null)
    setPaymentInfo(null)
  }

  return (
    <div className={`flex h-screen flex-col overflow-hidden ${bg} font-sans transition-colors duration-200`}>
      <PosHeader />

      <div className="flex flex-1 overflow-hidden">
        <PosSidebar />

        <main className="flex flex-1 overflow-hidden p-3 gap-3">
          {completedTicket ? (
            /* ── Receipt View ── */
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto', bgcolor: isDark ? '#000' : '#e2e8f0', borderRadius: '4px', p: 4 }}>
              <PosTicketReceipt 
                ticketData={completedTicket} 
                paymentInfo={paymentInfo}
                onClose={handleCloseReceipt} 
              />
            </Box>
          ) : (
            /* ── Standard POS View ── */
            <>
              <div className="flex flex-col h-full shadow-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] rounded-[4px] overflow-hidden">
                <ActiveCart
                  cart={cart}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                  onUpdateQuantity={updateQuantity}
                  onUpdateDiscount={updateDiscount}
                  onClearCart={clearCart}
                  onCheckout={() => setPaymentOpen(true)}
                />
              </div>

              <div className="flex flex-1 flex-col h-full shadow-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] rounded-[4px] overflow-hidden">
                <ProductCatalog onAddToCart={handleAddToCart} />
              </div>
            </>
          )}
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
