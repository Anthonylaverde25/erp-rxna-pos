import { Box, Typography } from '@mui/material';
import type { DocumentLineEntity } from '@/domain/entities/documents/PosDocumentEntity';
import { formatCurrency } from '../utils/formatters';

interface ReceiptLinesProps {
  lines: DocumentLineEntity[];
}

export function ReceiptLines({ lines }: ReceiptLinesProps) {
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', mb: 1, fontWeight: 900, fontSize: '0.75rem' }}>
        <Typography sx={{ flex: 1, fontWeight: 'inherit', fontSize: 'inherit' }}>CONCEPTO</Typography>
        <Typography sx={{ width: '40px', textAlign: 'center', fontWeight: 'inherit', fontSize: 'inherit' }}>CANT</Typography>
        <Typography sx={{ width: '80px', textAlign: 'right', fontWeight: 'inherit', fontSize: 'inherit' }}>TOTAL</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {lines.map((line, idx) => (
          <Box key={idx} sx={{ fontSize: '0.75rem' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '0.75rem' }}>{line.name}</Typography>
            <Box sx={{ display: 'flex', pl: 1, opacity: 0.8 }}>
              <Typography sx={{ flex: 1, fontSize: '0.7rem' }}>
                {formatCurrency(line.unitPrice)} {line.discountPercent > 0 ? `(-${line.discountPercent}%)` : ''}
              </Typography>
              <Typography sx={{ width: '40px', textAlign: 'center', fontSize: '0.7rem' }}>{line.quantity}</Typography>
              <Typography sx={{ width: '80px', textAlign: 'right', fontWeight: 800 }}>{formatCurrency(line.lineTotal)}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
