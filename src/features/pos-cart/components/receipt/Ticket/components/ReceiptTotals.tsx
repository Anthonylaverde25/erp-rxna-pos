import { Box, Typography, Divider } from '@mui/material';
import { receiptStyles } from '../styles';
import { formatCurrency } from '../utils/formatters';
import type { PaymentInfo } from '../types';

interface ReceiptTotalsProps {
  subtotal: number;
  taxTotal: number;
  total: number;
  paymentInfo: PaymentInfo;
}

export function ReceiptTotals({ subtotal, taxTotal, total, paymentInfo }: ReceiptTotalsProps) {
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 1.5 }}>
        <Box sx={receiptStyles.totalRow}>
          <Typography sx={{ fontWeight: 700, fontSize: 'inherit' }}>SUBTOTAL BRUTO:</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 'inherit' }}>{formatCurrency(subtotal)}</Typography>
        </Box>
        <Box sx={receiptStyles.totalRow}>
          <Typography sx={{ fontWeight: 700, fontSize: 'inherit' }}>IVA INCLUIDO:</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 'inherit' }}>{formatCurrency(taxTotal)}</Typography>
        </Box>
        <Box sx={receiptStyles.grandTotal}>
          <Typography>TOTAL NETO:</Typography>
          <Typography>{formatCurrency(total)}</Typography>
        </Box>
      </Box>

      <Divider sx={receiptStyles.divider} />

      <Box sx={{ mb: 2, fontSize: '0.75rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography sx={{ fontSize: 'inherit' }}>FORMA DE PAGO:</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: 'inherit' }}>{paymentInfo.methodName.toUpperCase()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography sx={{ fontSize: 'inherit' }}>ENTREGADO:</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: 'inherit' }}>{formatCurrency(paymentInfo.tenderedAmount || total)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 'inherit' }}>SU CAMBIO:</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: 'inherit' }}>{formatCurrency(paymentInfo.change)}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
