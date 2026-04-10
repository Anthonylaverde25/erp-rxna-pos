import { Box, Typography, Divider } from '@mui/material';
import { receiptStyles } from '../styles';
import type { CompanyInfo } from '../types';

interface ReceiptHeaderProps {
  company: CompanyInfo;
  ticketNumber: string;
  date: string;
  userName?: string;
  partnerInfo?: { name: string; identification: string } | null;
}

export function ReceiptHeader({ company, ticketNumber, date, userName, partnerInfo }: ReceiptHeaderProps) {
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

      {partnerInfo && (
        <Box sx={{ mt: 1.5, p: 1, border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#64748b', mb: 0.5 }}>
            Datos del Cliente
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 800 }}>
            {partnerInfo.name}
          </Typography>
          {partnerInfo.identification && (
            <Typography sx={{ fontSize: '0.7rem' }}>
              ID: {partnerInfo.identification}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
