import { Box, List, Typography } from '@mui/material'
import { CartItem } from './CartItem'
import type { CartItem as CartItemType } from '@/types/pos.types'
import { useTheme } from '@/providers/ThemeProvider'
import { ShoppingBag } from 'lucide-react'

interface CartItemListProps {
  items: CartItemType[]
  onUpdateQuantity: (id: string, delta: number) => void
  onUpdateDiscount: (id: string, percent: number) => void
}

export function CartItemList({ items, onUpdateQuantity, onUpdateDiscount }: CartItemListProps) {
  const { isDark } = useTheme()

  if (items.length === 0) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.3,
          px: 4,
          textAlign: 'center',
        }}
      >
        <ShoppingBag size={48} strokeWidth={1.5} />
        <Typography variant="body2" sx={{ mt: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
          El carrito está vacío
        </Typography>
        <Typography variant="caption" sx={{ mt: 0.5, fontWeight: 600 }}>
          Seleccione productos del catálogo para iniciar una venta
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', bgcolor: isDark ? 'transparent' : 'white' }}>
      <List disablePadding>
        {items.map((item) => (
          <CartItem 
            key={item.id} 
            item={item} 
            onUpdateQuantity={onUpdateQuantity} 
            onUpdateDiscount={onUpdateDiscount}
          />
        ))}
      </List>
    </Box>
  )
}
