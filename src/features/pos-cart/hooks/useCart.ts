import { useState, useCallback, useMemo } from 'react'
import type { CartItem } from '@/types/pos.types'
import { container } from '@/di/container'
import { TYPES } from '@/di/types'
import type { ITransactionRepository, CheckoutPayload } from '../domain/repositories/ITransactionRepository'

// ─── useCart Hook (POS Edition) ──────────────────────────────────────────────
export function useCart(initialItems: CartItem[] = []) {
  const [cart, setCart] = useState<CartItem[]>(initialItems.map(i => ({ ...i, discountPercent: i.discountPercent || 0 })))
  const [isProcessing, setIsProcessing] = useState(false)

  const addToCart = useCallback((item: Omit<CartItem, 'quantity' | 'discountPercent'>) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1, discountPercent: 0 }]
    })
  }, [])

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const updateDiscount = useCallback((id: string, percent: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, discountPercent: Math.min(100, Math.max(0, percent)) } : item))
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  // Cálculos dinámicos con descuento
  const subtotal = useMemo(() => 
    cart.reduce((sum, i) => {
      const lineTotal = (i.price * i.quantity) * (1 - (i.discountPercent || 0) / 100);
      return sum + lineTotal;
    }, 0), [cart])

  const tax = useMemo(() => subtotal * 0.15, [subtotal]) 
  const total = useMemo(() => subtotal + tax, [subtotal, tax])

  const checkout = useCallback(async (paymentMethodId: number = 1) => {
    if (cart.length === 0) return null

    setIsProcessing(true)
    try {
      const repository = container.get<ITransactionRepository>(TYPES.ITransactionRepository)
      
      const payload: CheckoutPayload = {
        items: cart.map(item => ({
          item_id: parseInt(item.id),
          quantity: item.quantity,
          unit_price: item.price,
          discount_percent: item.discountPercent || 0
        })),
        payment_method_id: paymentMethodId,
        notes: 'Venta desde Terminal POS'
      }

      const result = await repository.checkout(payload)
      clearCart()
      return result
    } catch (error) {
      console.error('POS Checkout Failed:', error)
      throw error
    } finally {
      setIsProcessing(false)
    }
  }, [cart, clearCart])

  return {
    cart,
    addToCart,
    updateQuantity,
    updateDiscount,
    clearCart,
    checkout,
    isProcessing,
    subtotal,
    tax,
    total,
  }
}
