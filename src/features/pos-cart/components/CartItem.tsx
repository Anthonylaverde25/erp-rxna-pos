import { Minus, Plus, X } from 'lucide-react'
import { motion } from 'motion/react'
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Box,
  Typography,
} from '@mui/material'
import { useTheme } from '@/providers/ThemeProvider'
import type { CartItem as CartItemType } from '@/types/pos.types'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string, delta: number) => void
}

// ─── CartItem (Fiori Edition) ────────────────────────────────────────────────
export function CartItem({ item, onUpdateQuantity }: CartItemProps) {
  const { isDark } = useTheme()

  const borderColor = isDark ? '#2a2a2a' : '#eeeeee'
  const textPrimary = isDark ? '#f3f4f6' : '#32363a'
  const textMuted = isDark ? '#a0aec0' : '#6a6d70'
  const rowHoverBg = isDark ? '#222222' : '#f5f7f9'
  const sapBlue = '#005483'

  return (
    <ListItem
      component={motion.li}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      disablePadding
      sx={{
        borderBottom: `1px solid ${borderColor}`,
        borderLeft: `4px solid transparent`,
        paddingX: 2,
        paddingY: 1.5,
        backgroundColor: 'transparent',
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: rowHoverBg,
          borderLeftColor: sapBlue,
        },
      }}
    >
      <ListItemText
        primary={
          <Typography
            variant="subtitle2"
            sx={{ color: textPrimary, fontWeight: 900, fontSize: '13px', lineHeight: 1.2 }}
            noWrap
          >
            {item.name}
          </Typography>
        }
        secondary={
          <Typography
            variant="caption"
            sx={{ color: textMuted, fontWeight: 700, fontSize: '10px', fontFamily: 'monospace' }}
          >
            {item.sku}
          </Typography>
        }
        sx={{ margin: 0 }}
      />

      <Box sx={{ flexShrink: 0, textAlign: 'right', px: 2 }}>
        <Typography
          variant="body2"
          sx={{ color: textPrimary, fontWeight: 900, fontSize: '14px' }}
        >
          {((item.price || 0) * item.quantity).toLocaleString('es-ES', { 
            style: 'currency', 
            currency: 'EUR' 
          })}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: sapBlue, fontSize: '10px', fontWeight: 800, display: 'block' }}
        >
          {item.quantity} x {(item.price || 0).toLocaleString('es-ES', { 
            style: 'currency', 
            currency: 'EUR' 
          })}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <IconButton
            size="small"
            onClick={() => onUpdateQuantity(item.id, -1)}
            sx={{
              borderRadius: 0,
              padding: '4px',
              color: textPrimary,
              '&:hover': { backgroundColor: isDark ? '#3f3f46' : '#e5e7eb' },
            }}
          >
            <Minus size={12} strokeWidth={3} />
          </IconButton>
          
          <Box sx={{ px: 1, minWidth: '24px', textAlign: 'center' }}>
            <Typography sx={{ fontSize: '12px', fontWeight: 900, color: sapBlue }}>
              {item.quantity}
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={() => onUpdateQuantity(item.id, 1)}
            sx={{
              borderRadius: 0,
              padding: '4px',
              color: textPrimary,
              '&:hover': { backgroundColor: isDark ? '#3f3f46' : '#e5e7eb' },
            }}
          >
            <Plus size={12} strokeWidth={3} />
          </IconButton>
        </Box>
        
        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(item.id, -item.quantity)}
          sx={{
            padding: '4px',
            color: '#ff4d4d',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(255, 77, 77, 0.1)',
            },
          }}
        >
          <X size={14} strokeWidth={3} />
        </IconButton>
      </Box>
    </ListItem>
  )
}
