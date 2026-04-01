import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  IconButton,
  Chip,
} from '@mui/material'
import { X, CreditCard, CheckCircle2, Delete } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'

interface PosPaymentModalProps {
  open: boolean
  onClose: () => void
  total: number
  onConfirm: () => void
}

// Simulated payment methods — replace with real API hook when backend is integrated
const PAYMENT_METHODS = [
  { id: 1, name: 'Efectivo', icon: '💵' },
  { id: 2, name: 'Tarjeta de Crédito / Débito', icon: '💳' },
  { id: 3, name: 'Transferencia Bancaria', icon: '🏦' },
  { id: 4, name: 'Pago Móvil / Bizum', icon: '📱' },
  { id: 5, name: 'Vale Descuento', icon: '🎟️' },
  { id: 6, name: 'Paypal', icon: '🔵' },
]

const QUICK_CASH = [5, 10, 20, 50, 100, 200]
const NUMPAD_KEYS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'DEL']

// ─── PosPaymentModal ──────────────────────────────────────────────────────────
// POS payment modal: MUI Select for payment method, numpad for cash, change calc.
export function PosPaymentModal({ open, onClose, total, onConfirm }: PosPaymentModalProps) {
  const { isDark } = useTheme()
  const [methodId, setMethodId] = useState<number>(1)
  const [inputDisplay, setInputDisplay] = useState<string>('')

  // Derive if cash method is selected
  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === methodId)
  const isCash = methodId === 1

  const tenderedAmount = useMemo(() => {
    const parsed = parseFloat(inputDisplay)
    return isNaN(parsed) ? 0 : parsed
  }, [inputDisplay])

  const change = useMemo(() => {
    if (!isCash) return 0
    return Math.max(0, tenderedAmount - total)
  }, [tenderedAmount, total, isCash])

  const canConfirm = !isCash || tenderedAmount >= total

  const handleNumpad = (key: string) => {
    if (key === 'DEL') {
      setInputDisplay((prev) => prev.slice(0, -1))
      return
    }
    if (key === '.' && inputDisplay.includes('.')) return
    if (inputDisplay.includes('.')) {
      const dec = inputDisplay.split('.')[1]
      if (dec && dec.length >= 2) return
    }
    setInputDisplay((prev) => prev + key)
  }

  const handleMethodChange = (id: number) => {
    setMethodId(id)
    setInputDisplay('')
  }

  const handleClose = () => {
    setInputDisplay('')
    setMethodId(1)
    onClose()
  }

  const handleConfirm = () => {
    if (!canConfirm) return
    setInputDisplay('')
    setMethodId(1)
    onConfirm()
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)

  // ── Theme tokens ────────────────────────────────────
  const modalBg = isDark ? '#111827' : '#f8fafc'
  const cardBg = isDark ? '#1f2937' : '#ffffff'
  const borderColor = isDark ? '#374151' : '#e2e8f0'
  const textPrimary = isDark ? '#f9fafb' : '#0f172a'
  const textMuted = isDark ? '#9ca3af' : '#64748b'
  const numBtnBg = isDark ? '#1f2937' : '#ffffff'
  const numBtnBorder = isDark ? '#374151' : '#e2e8f0'
  const numBtnText = isDark ? '#f9fafb' : '#0f172a'
  const numBtnHover = isDark ? '#374151' : '#f1f5f9'
  const displayBg = isDark ? '#0f172a' : '#1e293b'
  const footerBg = isDark ? '#1f2937' : '#e2e8f0'
  const changePosColor = isDark ? '#4ade80' : '#16a34a'

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: '4px',
          bgcolor: modalBg,
          width: '740px',
          maxWidth: '95vw',
          overflow: 'hidden',
          boxShadow: isDark
            ? '0 25px 50px -12px rgba(0,0,0,0.6)'
            : '0 25px 50px -12px rgba(0,0,0,0.25)',
          border: `1px solid ${borderColor}`,
        },
      }}
    >
      {/* ── Header ── */}
      <DialogTitle
        sx={{
          bgcolor: '#005483',
          color: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <CreditCard size={20} />
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.2 }}>
              Cobrar Pedido
            </Typography>
            <Typography sx={{ fontSize: '0.65rem', opacity: 0.7, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              Importe a cobrar
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 900, fontSize: '1.6rem', letterSpacing: '-0.5px' }}>
            {fmt(total)}
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: 'rgba(255,255,255,0.65)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            <X size={18} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5, bgcolor: modalBg }}>

        {/* ── Payment Method Select ── */}
        <FormControl fullWidth variant="filled" size="small">
          <InputLabel sx={{ color: textMuted, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Método de Pago
          </InputLabel>
          <Select
            value={methodId}
            onChange={(e) => handleMethodChange(Number(e.target.value))}
            disableUnderline
            sx={{
              bgcolor: cardBg,
              color: textPrimary,
              fontWeight: 700,
              borderRadius: '4px',
              '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1 },
              '& .MuiSvgIcon-root': { color: textMuted },
            }}
          >
            {PAYMENT_METHODS.map((m) => (
              <MenuItem key={m.id} value={m.id} sx={{ gap: 1.5, fontWeight: 600 }}>
                <span>{m.icon}</span>
                {m.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* ── Cash: numpad + quick cash ── */}
        {isCash && (
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
            {/* Left column */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: textMuted, display: 'block', mb: 0.75, letterSpacing: '0.8px', textTransform: 'uppercase' }}
                >
                  Importe Entregado
                </Typography>
                {/* Amount display */}
                <Box sx={{
                  bgcolor: displayBg,
                  borderRadius: '4px',
                  px: 2,
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  minHeight: '64px',
                  border: `2px solid ${isDark ? '#1e3a5f' : '#334155'}`,
                }}>
                  <Typography sx={{
                    fontFamily: 'monospace',
                    fontSize: '2.1rem',
                    fontWeight: 900,
                    color: inputDisplay ? '#38bdf8' : 'rgba(100,116,139,0.5)',
                    letterSpacing: '-1px',
                  }}>
                    {inputDisplay ? `€ ${inputDisplay}` : '€ 0.00'}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  onClick={() => setInputDisplay(total.toFixed(2))}
                  sx={{ mt: 0.5, fontSize: '0.65rem', fontWeight: 800, color: '#4da6ff', p: 0, minWidth: 'auto', '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
                >
                  EXACTO: {fmt(total)}
                </Button>
              </Box>

              {/* Quick cash */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: textMuted, display: 'block', mb: 0.75, letterSpacing: '0.8px', textTransform: 'uppercase' }}
                >
                  Billetes Rápidos
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0.75 }}>
                  {QUICK_CASH.map((amount) => (
                    <Chip
                      key={amount}
                      label={`€${amount}`}
                      onClick={() => setInputDisplay(String(amount))}
                      sx={{
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        bgcolor: isDark ? '#1f2937' : '#e2e8f0',
                        color: textPrimary,
                        borderRadius: '4px',
                        height: '34px',
                        border: `1px solid ${borderColor}`,
                        '&:hover': { bgcolor: isDark ? '#374151' : '#cbd5e1' },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Right: numpad */}
            <Box>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: textMuted, display: 'block', mb: 0.75, letterSpacing: '0.8px', textTransform: 'uppercase' }}
              >
                Teclado Numérico
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0.75 }}>
                {NUMPAD_KEYS.map((key) => (
                  <Button
                    key={key}
                    onClick={() => handleNumpad(key)}
                    sx={{
                      height: '54px',
                      fontWeight: 900,
                      fontSize: key === 'DEL' ? '0.7rem' : '1.2rem',
                      borderRadius: '4px',
                      border: `1px solid ${numBtnBorder}`,
                      color: key === 'DEL' ? '#ef4444' : numBtnText,
                      bgcolor: numBtnBg,
                      minWidth: 0,
                      '&:hover': {
                        bgcolor: key === 'DEL'
                          ? isDark ? 'rgba(239,68,68,0.1)' : '#fef2f2'
                          : numBtnHover,
                        borderColor: key === 'DEL' ? '#ef4444' : numBtnBorder,
                      },
                    }}
                  >
                    {key === 'DEL' ? <Delete size={16} /> : key}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        )}

        {/* ── Non-cash info banner ── */}
        {!isCash && (
          <Box sx={{
            bgcolor: isDark ? 'rgba(0,84,131,0.15)' : '#f0f7ff',
            border: `1px solid ${isDark ? '#1e3a5f' : '#bfdbfe'}`,
            borderLeft: '4px solid #005483',
            borderRadius: '4px',
            p: 2.5,
          }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: isDark ? '#60a5fa' : '#1e40af', mb: 0.5 }}>
              {selectedMethod?.icon} {selectedMethod?.name}
            </Typography>
            <Typography sx={{ fontSize: '0.82rem', color: isDark ? '#93c5fd' : '#3b4a6b' }}>
              Procese el cobro de <strong>{fmt(total)}</strong> a través del terminal correspondiente y confirme una vez completado.
            </Typography>
          </Box>
        )}

        <Divider sx={{ borderColor: borderColor }} />

        {/* ── Summary row ── */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.5 }}>
          {[
            { label: 'Total a Cobrar', value: fmt(total), color: textPrimary },
            { label: 'Entregado', value: isCash ? fmt(tenderedAmount) : '—', color: textPrimary },
            {
              label: 'Vuelto',
              value: isCash ? fmt(change) : '—',
              color: change > 0 ? changePosColor : textMuted,
              large: true,
            },
          ].map(({ label, value, color, large }) => (
            <Box
              key={label}
              sx={{
                bgcolor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '4px',
                p: 1.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: textMuted, display: 'block', mb: 0.5, letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '0.6rem' }}
              >
                {label}
              </Typography>
              <Typography sx={{ fontWeight: 900, fontSize: large ? '1.4rem' : '1rem', color, letterSpacing: '-0.3px' }}>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>

      {/* ── Footer ── */}
      <DialogActions sx={{ px: 3, py: 2, bgcolor: footerBg, borderTop: `1px solid ${borderColor}`, gap: 2 }}>
        <Button
          onClick={handleClose}
          sx={{ color: textMuted, fontWeight: 700, textTransform: 'none', fontSize: '0.9rem', borderRadius: '4px' }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!canConfirm}
          startIcon={<CheckCircle2 size={18} />}
          sx={{
            bgcolor: '#005483',
            color: 'white',
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '0.95rem',
            px: 4,
            borderRadius: '4px',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#004272', boxShadow: 'none' },
            '&.Mui-disabled': { bgcolor: isDark ? '#374151' : '#94a3b8', color: 'rgba(255,255,255,0.5)' },
          }}
        >
          {canConfirm
            ? 'Confirmar Cobro'
            : isCash
              ? `Faltan ${fmt(total - tenderedAmount)}`
              : 'Seleccione método'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
