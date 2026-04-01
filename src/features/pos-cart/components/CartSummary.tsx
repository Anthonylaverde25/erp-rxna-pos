import { CreditCard, Tag, ReceiptText } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'
import { Box, Typography, Button, Divider } from '@mui/material'

interface CartSummaryProps {
  subtotal: number
  tax: number
  total: number
  onCheckout: () => void
}

// ─── CartSummary (Fiori Edition) ─────────────────────────────────────────────
export function CartSummary({ subtotal, tax, total, onCheckout }: CartSummaryProps) {
  const { isDark } = useTheme()

  const sapBlue = '#005483'
  const sapBorder = isDark ? '#2a2a2a' : '#d9d9d9'
  const sapTextPrimary = isDark ? '#f3f4f6' : '#32363a'
  const sapTextMuted = isDark ? '#a0aec0' : '#6a6d70'
  const surface = isDark ? '#1a1a1a' : '#ffffff'

  const fmt = (n: number) => n.toLocaleString('es-ES', { 
    style: 'currency', 
    currency: 'EUR' 
  })

  return (
    <Box
      sx={{
        borderTop: `2px solid ${sapBorder}`,
        bgcolor: surface,
        p: 3,
        mt: 'auto', // Asegura el anclaje al fondo en flex containers
        transition: 'all 0.2s',
        boxShadow: isDark ? '0 -4px 10px rgba(0,0,0,0.3)' : '0 -4px 10px rgba(0,0,0,0.03)',
      }}
    >
      {/* Subtotales e Impuestos */}
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography sx={{ fontSize: '11px', fontWeight: 800, color: sapTextMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Subtotal Bruto
          </Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 900, color: sapTextPrimary }}>
            {fmt(subtotal)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontSize: '11px', fontWeight: 800, color: sapTextMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            IVA Estimado (15%)
          </Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 900, color: sapTextPrimary }}>
            {fmt(tax)}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 1.5, borderColor: sapBorder }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ReceiptText size={16} color={sapBlue} strokeWidth={2.5} />
            <Typography sx={{ fontSize: '13px', fontWeight: 900, color: sapBlue, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Total Neto
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '24px', fontBlack: 900, fontWeight: 900, color: sapBlue, tracking: '-1px' }}>
            {fmt(total)}
          </Typography>
        </Box>
      </Box>

      {/* Botones de Acción SAP Style */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="contained"
          fullWidth
          disabled={total <= 0}
          onClick={onCheckout}
          startIcon={<CreditCard size={18} strokeWidth={2.5} />}
          sx={{
            bgcolor: sapBlue,
            color: 'white',
            py: 1.5,
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: 900,
            textTransform: 'uppercase',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#003f63',
              boxShadow: '0 4px 8px rgba(0,84,131,0.3)',
            },
            '&.Mui-disabled': {
              bgcolor: isDark ? '#2a2a2a' : '#f0f0f0',
              opacity: 0.5
            }
          }}
        >
          Finalizar y Cobrar
        </Button>
        
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Tag size={16} />}
          sx={{
            borderColor: sapBorder,
            color: sapTextPrimary,
            py: 1,
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            '&:hover': {
              borderColor: sapBlue,
              bgcolor: isDark ? '#222' : '#f8f9fa',
            }
          }}
        >
          Descuento Global
        </Button>
      </Box>
    </Box>
  )
}
