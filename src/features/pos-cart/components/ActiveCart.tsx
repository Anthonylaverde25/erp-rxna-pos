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
  onClearCart: () => void
  onCheckout: () => void
}

// ─── ActiveCart ───────────────────────────────────────────────────────────────
// Cart panel — receives shared cart state from PosLayout (single source of truth).
export function ActiveCart({ cart, subtotal, tax, total, onUpdateQuantity, onClearCart, onCheckout }: ActiveCartProps) {
  const { isDark } = useTheme()

  const border = isDark ? 'border-[#2a2a2a]' : 'border-gray-200'
  const surfaceAlt = isDark ? 'bg-[#111111]' : 'bg-[#f0f4f7]'

  return (
    <section
      className={`flex w-[350px] shrink-0 flex-col border-r ${border} ${surfaceAlt} xl:w-[400px] transition-colors duration-200`}
    >
      <CartHeader onVoid={onClearCart} />
      <CartItemList items={cart} onUpdateQuantity={onUpdateQuantity} />
      <CartSummary subtotal={subtotal} tax={tax} total={total} onCheckout={onCheckout} />
    </section>
  )
}


