import { ShoppingCart } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { useTheme } from '@/providers/ThemeProvider'
import { CartItem } from './CartItem'
import type { CartItem as CartItemType } from '@/types/pos.types'
import { List, Box, Typography } from '@mui/material'

interface CartItemListProps {
  items: CartItemType[]
  onUpdateQuantity: (id: string, delta: number) => void
}

export function CartItemList({ items, onUpdateQuantity }: CartItemListProps) {
  const { isDark } = useTheme()
  const textMuted = isDark ? '#9ca3af' : '#6b7280'

  return (
    <Box className="flex-1 overflow-y-auto">
      <List disablePadding>
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <CartItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} />
          ))}
        </AnimatePresence>
      </List>

      {items.length === 0 && (
        <Box 
          className={`flex h-full flex-col items-center justify-center opacity-50`}
          sx={{ color: textMuted }}
        >
          <ShoppingCart className="mb-2 h-12 w-12" />
          <Typography variant="body2" fontWeight="600">
            Cart is empty
          </Typography>
          <Typography
            variant="caption"
            sx={{ mt: 0.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            Click a product to add it
          </Typography>
        </Box>
      )}
    </Box>
  )
}
