import { Box, Typography } from '@mui/material';

interface ReceiptFooterProps {
  ticketId?: number;
}

export function ReceiptFooter({ ticketId }: ReceiptFooterProps) {
  return (
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
        {/* Simulación de código de barras */}
        <Box sx={{ height: '30px', bgcolor: 'black', width: '80%', mx: 'auto', mb: 0.5 }} />
        {ticketId && <Typography sx={{ fontSize: '8px' }}>*{ticketId}*</Typography>}
      </Box>
    </Box>
  );
}
