import { Box, Paper } from '@mui/material';
import { useTheme } from '@/providers/ThemeProvider';
import { useAuthStore } from '@/features/pos-auth/store/useAuthStore';
import { ReceiptHeader } from './components/ReceiptHeader';
import { ReceiptLines } from './components/ReceiptLines';
import { ReceiptTotals } from './components/ReceiptTotals';
import { ReceiptFooter } from './components/ReceiptFooter';
import { ReceiptActions } from './components/ReceiptActions';
import { receiptStyles } from './styles';
import type { PaymentInfo, ReceiptData, CompanyInfo } from './types';

interface PosTicketReceiptProps {
  ticketData: any; // Response from checkout API
  paymentInfo: PaymentInfo;
  onClose: () => void;
}

/**
 * PosTicketReceipt (Modular Edition)
 * Simulates an 80mm thermal receipt with industrial/Fiori aesthetics.
 */
export function PosTicketReceipt({ ticketData, paymentInfo, onClose }: PosTicketReceiptProps) {
  const { isDark } = useTheme();
  const user = useAuthStore((state) => state.user);

  // Extract context data
  const activeCompany = user?.companies.find(c => c.id === user.active_company_id);
  const data = ticketData?.data || {};

  const companyInfo: CompanyInfo = {
    name: activeCompany?.name || 'NEXUS ERP SYSTEM',
    cif: 'B-12345678', // These could come from company details in a real scenario
    phone: '+34 900 000 000',
    address: 'Calle Industrial 42, 28001 Madrid'
  };

  const receiptData: ReceiptData = {
    id: data.id,
    number_serie: data.number_serie || 'TKT-PENDING',
    issue_date: data.issue_date || new Date().toLocaleDateString(),
    subtotal: data.subtotal || 0,
    tax_total: data.tax_total || 0,
    total: data.total || 0,
    lines: data.lines || []
  };

  const handlePrint = () => {
    window.print();
  };

  const handleConvertToInvoice = () => {
    console.log('Convert to Invoice triggered for ticket:', receiptData.id);
    // Future logic: Trigger conversion modal or API call
  };

  // JARVIS Styles (Industrial Technical)
  const sapBlue = '#005483';
  const textPrimary = isDark ? '#f3f4f6' : '#32363a';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', p: 2 }}>

      {/* Action Buttons (UI Only) */}
      <ReceiptActions
        onPrint={handlePrint}
        onNewSale={onClose}
        onConvertToInvoice={handleConvertToInvoice}
        sapBlue={sapBlue}
        textPrimary={textPrimary}
      />

      {/* Printable Receipt Area */}
      <Paper elevation={3} className="printable-ticket" sx={receiptStyles.paper}>

        <ReceiptHeader
          company={companyInfo}
          ticketNumber={receiptData.number_serie}
          date={receiptData.issue_date}
          userName={user?.full_name}
        />

        <ReceiptLines lines={receiptData.lines} />

        <ReceiptTotals
          subtotal={receiptData.subtotal}
          taxTotal={receiptData.tax_total}
          total={receiptData.total}
          paymentInfo={paymentInfo}
        />

        <ReceiptFooter ticketId={receiptData.id} />

      </Paper>

      {/* Global CSS for Print (Scoped to the Receipt Identity) */}
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
              box-shadow: none !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
    </Box>
  );
}
