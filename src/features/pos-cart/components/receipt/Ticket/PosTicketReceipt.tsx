import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useTheme } from '@/providers/ThemeProvider';
import { useAuthStore } from '@/features/pos-auth/store/useAuthStore';
import { ReceiptHeader } from './components/ReceiptHeader';
import { ReceiptLines } from './components/ReceiptLines';
import { ReceiptTotals } from './components/ReceiptTotals';
import { ReceiptFooter } from './components/ReceiptFooter';
import { ReceiptActions } from './components/ReceiptActions';
import { ConvertToInvoiceModal } from './components/ConvertToInvoiceModal';
import { receiptStyles } from './styles';
import type { PaymentInfo, CompanyInfo } from './types';
import type { PosDocumentEntity } from '@/domain/entities/documents/PosDocumentEntity';

interface PosTicketReceiptProps {
  ticketData: PosDocumentEntity; 
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
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  // Extract context data
  const activeCompany = user?.companies.find(c => c.id === user.active_company_id);

  const companyInfo: CompanyInfo = {
    name: activeCompany?.name || 'NEXUS ERP SYSTEM',
    cif: 'B-12345678', // These could come from company details in a real scenario
    phone: '+34 900 000 000',
    address: 'Calle Industrial 42, 28001 Madrid'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleConvertToInvoice = () => {
    setIsConvertModalOpen(true);
  };

  const handleConversionSuccess = (newInvoice: any) => {
    console.log('Document converted successfully:', newInvoice);
    // Future: Maybe show a "Success" snackbar or redirect to the nuevo documento
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
          ticketNumber={ticketData.numberSerie}
          date={ticketData.issueDate}
          userName={user?.full_name}
        />

        <ReceiptLines lines={ticketData.lines} />

        <ReceiptTotals
          subtotal={ticketData.subtotal}
          taxTotal={ticketData.taxTotal}
          total={ticketData.total}
          paymentInfo={paymentInfo}
        />

        <ReceiptFooter ticketId={ticketData.id} />

      </Paper>

      {/* Modal de Conversión (HIDDEN IN PRINT) */}
      <ConvertToInvoiceModal
        open={isConvertModalOpen}
        onClose={() => setIsConvertModalOpen(false)}
        ticketId={ticketData.id}
        ticketNumber={ticketData.numberSerie}
        onSuccess={handleConversionSuccess}
      />

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
