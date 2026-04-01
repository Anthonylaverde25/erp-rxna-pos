import { useTheme } from '@/providers/ThemeProvider'
import { CartHeader } from './CartHeader'
import { CartItemList } from './CartItemList'
import { CartSummary } from './CartSummary'
import type { CartItem } from '@/types/pos.types'

interface ActiveCartProps {
  cart: CartItem[]
  subtotal: number
  tax: number
  total: number
  onUpdateQuantity: (id: string, delta: number) => void
  onUpdateDiscount: (id: string, percent: number) => void
  onClearCart: () => void
  onCheckout: () => void
}

// ─── ActiveCart (Fiori Edition) ──────────────────────────────────────────────
export function ActiveCart({ 
  cart, 
  subtotal, 
  tax, 
  total, 
  onUpdateQuantity, 
  onUpdateDiscount,
  onClearCart, 
  onCheckout 
}: ActiveCartProps) {
  const { isDark } = useTheme()

  const border = isDark ? 'border-[#2a2a2a]' : 'border-gray-200'
  const surfaceAlt = isDark ? 'bg-[#111111]' : 'bg-[#ffffff]'

  return (
    <section
      className={`flex h-full w-[350px] shrink-0 flex-col border-r ${border} ${surfaceAlt} xl:w-[400px] transition-colors duration-200`}
    >
      <CartHeader onVoid={onClearCart} />
      
      {/* Container que ocupa el espacio disponible y empuja al summary abajo */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <CartItemList 
          items={cart} 
          onUpdateQuantity={onUpdateQuantity} 
          onUpdateDiscount={onUpdateDiscount} 
        />
      </div>

      {/* CartSummary siempre al final gracias a flex-1 arriba */}
      <CartSummary subtotal={subtotal} tax={tax} total={total} onCheckout={onCheckout} />
    </section>
  )
}
