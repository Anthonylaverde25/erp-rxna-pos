import { Box, Typography, Divider } from '@mui/material';
import { receiptStyles } from '../styles';
import type { CompanyInfo } from '../types';

interface ReceiptHeaderProps {
  company: CompanyInfo;
  ticketNumber: string;
  date: string;
  userName?: string;
}

export function ReceiptHeader({ company, ticketNumber, date, userName }: ReceiptHeaderProps) {
  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <Typography sx={receiptStyles.headerTitle}>
        {company.name}
      </Typography>

      <Typography sx={receiptStyles.textSmall}>
        CIF: {company.cif || 'B-00000000'} | Tel: {company.phone || '+00 000 000 000'}
      </Typography>

      <Typography sx={receiptStyles.textExtraSmall}>
        {company.address || 'Sin dirección registrada'}
      </Typography>

      <Divider sx={receiptStyles.divider} />

      <Typography sx={{ fontWeight: 900, fontSize: '0.9rem' }}>
        TICKET DE VENTA
      </Typography>

      <Typography sx={{ fontSize: '0.8rem', fontWeight: 800 }}>
        No: {ticketNumber}
      </Typography>

      <Typography sx={receiptStyles.textExtraSmall}>
        Fecha: {date} | Hora: {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
      </Typography>

      {userName && (
        <Typography sx={receiptStyles.textExtraSmall}>
          Atendido por: {userName}
        </Typography>
      )}
    </Box>
  );
}
