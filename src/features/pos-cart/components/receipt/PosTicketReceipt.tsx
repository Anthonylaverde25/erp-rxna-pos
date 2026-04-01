import { useRef } from 'react'
import { Printer, CheckCircle2, Download, Send } from 'lucide-react'
import { Box, Typography, Button, Divider, Paper } from '@mui/material'
import { useTheme } from '@/providers/ThemeProvider'
import { useAuthStore } from '@/features/pos-auth/store/useAuthStore'

interface PosTicketReceiptProps {
  ticketData: any // This will be the response from the checkout API
  paymentInfo: {
    methodName: string
    tenderedAmount: number
    change: number
  }
  onClose: () => void
}

// ─── PosTicketReceipt (Thermal Style) ────────────────────────────────────────
// Simulates an 80mm thermal receipt with industrial/Fiori aesthetics.
export function PosTicketReceipt({ ticketData, paymentInfo, onClose }: PosTicketReceiptProps) {
  const { isDark } = useTheme()
  const user = useAuthStore((state) => state.user)
  const activeCompany = user?.companies.find(c => c.id === user.active_company_id)
  
  const receiptRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)

  // Extract totals from ticketData (based on DocumentResource structure)
  const data = ticketData?.data || {}
  const lines = data.lines || []
  const subtotal = data.subtotal || 0
  const taxTotal = data.tax_total || 0
  const total = data.total || 0
  const ticketNumber = data.number_serie || 'TKT-PENDING'
  const date = data.issue_date || new Date().toLocaleDateString()

  const sapBlue = '#005483'
  const textPrimary = isDark ? '#f3f4f6' : '#32363a'

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', p: 2 }}>
      
      {/* ── Action Buttons (Not for print) ── */}
      <Box className="no-print" sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={handlePrint}
          startIcon={<Printer size={18} />}
          sx={{ bgcolor: sapBlue, borderRadius: '4px', fontWeight: 900, px: 3 }}
        >
          Imprimir Ticket
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ borderColor: '#d9d9d9', color: textPrimary, borderRadius: '4px', fontWeight: 800 }}
        >
          Nueva Venta
        </Button>
      </Box>

      {/* ── Receipt Simulation ── */}
      <Paper
        ref={receiptRef}
        elevation={3}
        className="printable-ticket"
        sx={{
          width: '380px', // Approx 80mm scaling for screen
          bgcolor: 'white',
          color: '#000', // Always black text for receipts
          p: 4,
          fontFamily: "'Courier New', Courier, monospace",
          borderRadius: '0',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #f0f0f0 5px, #f0f0f0 10px)',
          },
          '@media print': {
            boxShadow: 'none',
            p: 1,
            width: '100%',
          }
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase', mb: 0.5 }}>
            {activeCompany?.name || 'NEXUS ERP SYSTEM'}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700 }}>
            CIF: B-12345678 | Tel: +34 900 000 000
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', mb: 2 }}>
            Calle Industrial 42, 28001 Madrid
          </Typography>
          
          <Divider sx={{ borderStyle: 'dashed', my: 1.5 }} />
          
          <Typography sx={{ fontWeight: 900, fontSize: '0.9rem' }}>
            TICKET DE VENTA
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 800 }}>
            No: {ticketNumber}
          </Typography>
          <Typography sx={{ fontSize: '0.7rem' }}>
            Fecha: {date} | Hora: {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
          </Typography>
          <Typography sx={{ fontSize: '0.7rem' }}>
            Atendido por: {user?.full_name}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', my: 1.5 }} />

        {/* Items Table */}
        <Box sx={{ width: '100%', mb: 3 }}>
          <Box sx={{ display: 'flex', mb: 1, fontWeight: 900, fontSize: '0.75rem' }}>
            <Typography sx={{ flex: 1, fontWeight: 'inherit', fontSize: 'inherit' }}>CONCEPTO</Typography>
            <Typography sx={{ width: '40px', textAlign: 'center', fontWeight: 'inherit', fontSize: 'inherit' }}>CANT</Typography>
            <Typography sx={{ width: '80px', textAlign: 'right', fontWeight: 'inherit', fontSize: 'inherit' }}>TOTAL</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {lines.map((line: any, idx: number) => (
              <Box key={idx} sx={{ fontSize: '0.75rem' }}>
                <Typography sx={{ fontWeight: 800, fontSize: '0.75rem' }}>{line.name}</Typography>
                <Box sx={{ display: 'flex', pl: 1, opacity: 0.8 }}>
                  <Typography sx={{ flex: 1, fontSize: '0.7rem' }}>
                    {fmt(line.unit_price)} {line.discount_percent > 0 ? `(-${line.discount_percent}%)` : ''}
                  </Typography>
                  <Typography sx={{ width: '40px', textAlign: 'center', fontSize: '0.7rem' }}>{line.quantity}</Typography>
                  <Typography sx={{ width: '80px', textAlign: 'right', fontWeight: 800 }}>{fmt(line.line_total)}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', my: 1.5 }} />

        {/* Totals */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 'inherit' }}>SUBTOTAL BRUTO:</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 'inherit' }}>{fmt(subtotal)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 'inherit' }}>IVA INCLUIDO:</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 'inherit' }}>{fmt(taxTotal)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography sx={{ fontWeight: 900, fontSize: '1.1rem' }}>TOTAL NETO:</Typography>
            <Typography sx={{ fontWeight: 900, fontSize: '1.1rem' }}>{fmt(total)}</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', my: 1.5 }} />

        {/* Payment Details */}
        <Box sx={{ mb: 4, fontSize: '0.75rem' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography sx={{ fontSize: 'inherit' }}>FORMA DE PAGO:</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: 'inherit' }}>{paymentInfo.methodName.toUpperCase()}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography sx={{ fontSize: 'inherit' }}>ENTREGADO:</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: 'inherit' }}>{fmt(paymentInfo.tenderedAmount || total)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 'inherit' }}>SU CAMBIO:</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: 'inherit' }}>{fmt(paymentInfo.change)}</Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography sx={{ fontWeight: 900, fontSize: '0.8rem', mb: 1 }}>
            ¡GRACIAS POR SU COMPRA!
          </Typography>
          <Typography sx={{ fontSize: '0.65rem', opacity: 0.7 }}>
            Este ticket es un comprobante simplificado.
          </Typography>
          <Typography sx={{ fontSize: '0.65rem', opacity: 0.7 }}>
            Conserve este documento para cambios o devoluciones.
          </Typography>
          <Box sx={{ mt: 3, opacity: 0.2 }}>
            {/* Simulation of a barcode or QR */}
            <Box sx={{ height: '30px', bgcolor: 'black', width: '80%', mx: 'auto', mb: 0.5 }} />
            <Typography sx={{ fontSize: '8px' }}>*{data.id}*</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Print styles - scoped to this component */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-ticket, .printable-ticket * {
              visibility: visible;
            }
            .printable-ticket {
              position: absolute;
              left: 0;
              top: 0;
              width: 80mm !important;
              margin: 0;
              padding: 5mm;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
    </Box>
  )
}
