import { Box, Button, Tooltip } from '@mui/material';
import { Printer, FileText, PlusCircle } from 'lucide-react';

interface ReceiptActionsProps {
  onPrint: () => void;
  onNewSale: () => void;
  onConvertToInvoice: () => void;
  sapBlue: string;
  textPrimary: string;
}

/**
 * ReceiptActions optimized for UX.
 * Primary Action: Print (Contained/SAP Blue)
 * Secondary Action: New Sale (Outlined)
 * Optional Action: Convert to Invoice (Outlined/Informative)
 */
export function ReceiptActions({ onPrint, onNewSale, onConvertToInvoice, sapBlue, textPrimary }: ReceiptActionsProps) {
  return (
    <Box
      className="no-print"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        width: '100%',
        justifyContent: 'center',
        mb: 1
      }}
    >
      <Button
        variant="contained"
        onClick={onPrint}
        startIcon={<Printer size={18} />}
        sx={{
          bgcolor: sapBlue,
          color: 'white',
          borderRadius: '4px',
          fontWeight: 900,
          px: 3,
          minWidth: '160px',
          '&:hover': {
            bgcolor: sapBlue,
            opacity: 0.9
          }
        }}
      >
        Imprimir Ticket
      </Button>

      <Button
        variant="outlined"
        onClick={onConvertToInvoice}
        startIcon={<FileText size={18} />}
        sx={{
          borderColor: '#d9d9d9',
          color: textPrimary,
          borderRadius: '4px',
          fontWeight: 800,
          minWidth: '160px',
          '&:hover': {
            borderColor: sapBlue,
            bgcolor: 'rgba(0, 84, 131, 0.04)'
          }
        }}
      >
        Facturar Ticket
      </Button>

      <Button
        variant="outlined"
        onClick={onNewSale}
        startIcon={<PlusCircle size={18} />}
        sx={{
          borderColor: '#d9d9d9',
          color: textPrimary,
          borderRadius: '4px',
          fontWeight: 800,
          minWidth: '160px',
          '&:hover': {
            borderColor: '#2e7d32', // Success Green hint
            bgcolor: 'rgba(46, 125, 50, 0.04)'
          }
        }}
      >
        Nueva Venta
      </Button>
    </Box>
  );
}
