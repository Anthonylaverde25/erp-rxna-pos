import { Minus, Plus, X, Percent } from 'lucide-react'
import { motion } from 'motion/react'
import {
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  InputBase,
  Tooltip,
} from '@mui/material'
import { useTheme } from '@/providers/ThemeProvider'
import type { CartItem as CartItemType } from '@/types/pos.types'
import { useState } from 'react'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string, delta: number) => void
  onUpdateDiscount: (id: string, percent: number) => void
}

// ─── CartItem (Fiori Edition with Discounts) ────────────────────────────────
export function CartItem({ item, onUpdateQuantity, onUpdateDiscount }: CartItemProps) {
  const { isDark } = useTheme()
  const [isEditingDiscount, setIsEditingDiscount] = useState(false)

  const borderColor = isDark ? '#2a2a2a' : '#eeeeee'
  const textPrimary = isDark ? '#f3f4f6' : '#32363a'
  const textMuted = isDark ? '#a0aec0' : '#6a6d70'
  const rowHoverBg = isDark ? '#222222' : '#f5f7f9'
  const sapBlue = '#005483'
  const sapRed = '#ff4d4d'

  const hasDiscount = (item.discountPercent || 0) > 0
  const lineSubtotal = (item.price || 0) * item.quantity
  const lineDiscountAmount = lineSubtotal * ((item.discountPercent || 0) / 100)
  const lineTotal = lineSubtotal - lineDiscountAmount

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
        borderLeft: `4px solid ${hasDiscount ? '#f57c00' : 'transparent'}`,
        paddingX: 2,
        paddingY: 1.5,
        backgroundColor: 'transparent',
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: rowHoverBg,
          borderLeftColor: hasDiscount ? '#f57c00' : sapBlue,
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="caption"
              sx={{ color: textMuted, fontWeight: 700, fontSize: '10px', fontFamily: 'monospace' }}
            >
              {item.sku}
            </Typography>
            {hasDiscount && (
              <span className="bg-[#fff3e0] text-[#e65100] dark:bg-[#e6510033] dark:text-[#ffb74d] px-1 rounded text-[9px] font-black uppercase">
                -{item.discountPercent}% OFF
              </span>
            )}
          </Box>
        }
        sx={{ margin: 0 }}
      />

      <Box sx={{ flexShrink: 0, textAlign: 'right', px: 2 }}>
        <Typography
          variant="body2"
          sx={{ 
            color: hasDiscount ? '#e65100' : textPrimary, 
            fontWeight: 900, 
            fontSize: '14px',
            textDecoration: hasDiscount ? 'none' : 'none'
          }}
        >
          {lineTotal.toLocaleString('es-ES', { 
            style: 'currency', 
            currency: 'EUR' 
          })}
        </Typography>
        
        {hasDiscount && (
          <Typography
            variant="caption"
            sx={{ color: textMuted, fontSize: '10px', textDecoration: 'line-through', display: 'block' }}
          >
            {lineSubtotal.toLocaleString('es-ES', { 
              style: 'currency', 
              currency: 'EUR' 
            })}
          </Typography>
        )}
        
        {!hasDiscount && (
          <Typography
            variant="caption"
            sx={{ color: sapBlue, fontSize: '10px', fontWeight: 800, display: 'block' }}
          >
            {item.quantity} x {(item.price || 0).toLocaleString('es-ES', { 
              style: 'currency', 
              currency: 'EUR' 
            })}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {/* Quantity Control */}
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

        {/* Discount Control */}
        {isEditingDiscount ? (
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: isDark ? '#2a2a2a' : '#f0f0f0', borderRadius: '4px', px: 0.5 }}>
            <InputBase
              autoFocus
              defaultValue={item.discountPercent || 0}
              onBlur={(e) => {
                onUpdateDiscount(item.id, parseFloat(e.target.value) || 0)
                setIsEditingDiscount(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onUpdateDiscount(item.id, parseFloat((e.target as HTMLInputElement).value) || 0)
                  setIsEditingDiscount(false)
                }
              }}
              sx={{ 
                width: '35px', 
                fontSize: '11px', 
                fontWeight: 900, 
                color: '#e65100',
                '& input': { textAlign: 'center', padding: '4px 0' }
              }}
            />
            <Typography sx={{ fontSize: '10px', fontWeight: 900, color: '#e65100', pr: 0.5 }}>%</Typography>
          </Box>
        ) : (
          <Tooltip title="Añadir Descuento">
            <IconButton
              size="small"
              onClick={() => setIsEditingDiscount(true)}
              sx={{
                padding: '4px',
                color: hasDiscount ? '#e65100' : textMuted,
                borderRadius: '4px',
                bgcolor: hasDiscount ? (isDark ? '#e6510022' : '#fff3e0') : 'transparent',
                '&:hover': {
                  backgroundColor: isDark ? '#e6510033' : '#ffe0b2',
                  color: '#e65100'
                },
              }}
            >
              <Percent size={14} strokeWidth={3} />
            </IconButton>
          </Tooltip>
        )}
        
        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(item.id, -item.quantity)}
          sx={{
            padding: '4px',
            color: sapRed,
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
