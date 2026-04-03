import { useState } from 'react'
import { Box } from '@mui/material'
import { ActiveCart } from '@/features/pos-cart/components/ActiveCart'
import { PosPaymentModal } from '@/features/pos-cart/components/PosPaymentModal'
import { PosTicketReceipt } from '@/features/pos-cart/components/receipt/PosTicketReceipt'
import { useCart } from '@/features/pos-cart/hooks/useCart'
import { ProductCatalog } from '@/features/pos-catalog/components/ProductCatalog'
import type { CatalogItem } from '@/features/pos-catalog/domain/entities/CatalogItem'
import { useTheme } from '@/providers/ThemeProvider'

interface PaymentInfo {
  methodId: number
  methodName: string
  tenderedAmount: number
  change: number
}

export function PosSalesView() {
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
    isProcessing,
  } = useCart([])

  const [paymentOpen, setPaymentOpen] = useState(false)
  const [completedTicket, setCompletedTicket] = useState<unknown | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)

  const handleAddToCart = (product: CatalogItem) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      sku: product.sku,
      category: product.categoryName || 'General',
      price: product.salePrice,
      image: product.image || '',
    })
  }

  const handleConfirmPayment = async (pInfo: PaymentInfo) => {
    try {
      setPaymentInfo(pInfo)
      const result = await checkout(pInfo.methodId)
      setCompletedTicket(result)
      setPaymentOpen(false)
    } catch {
      alert('Error al procesar el pago. Por favor, reintente.')
    }
  }

  const handleCloseReceipt = () => {
    setCompletedTicket(null)
    setPaymentInfo(null)
  }

  return (
    <>
      {completedTicket && paymentInfo ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            overflowY: 'auto',
            bgcolor: isDark ? '#000' : '#e2e8f0',
            borderRadius: '4px',
            p: 4,
          }}
        >
          <PosTicketReceipt
            ticketData={completedTicket}
            paymentInfo={paymentInfo}
            onClose={handleCloseReceipt}
          />
        </Box>
      ) : (
        <>
          <div className="flex h-full flex-col overflow-hidden rounded-[4px] border border-gray-200 bg-white shadow-lg dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
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

          <div className="flex h-full flex-1 flex-col overflow-hidden rounded-[4px] border border-gray-200 bg-white shadow-lg dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
            <ProductCatalog onAddToCart={handleAddToCart} />
          </div>
        </>
      )}

      <PosPaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        total={total}
        isProcessing={isProcessing}
        onConfirm={handleConfirmPayment}
      />
    </>
  )
}
