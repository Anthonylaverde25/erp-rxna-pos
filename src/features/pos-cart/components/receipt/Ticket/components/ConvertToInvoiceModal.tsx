import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  Typography, 
  Autocomplete, 
  TextField, 
  CircularProgress,
  Divider,
  Alert
} from '@mui/material';
import { FileText, User, Hash, AlertTriangle } from 'lucide-react';
import { usePartners } from '@/features/pos-cart/hooks/usePartners';
import { useNumberSeries } from '@/features/pos-settings/hooks/useNumberSeries';
import type { PosPartner } from '@/domain/entities/partners/PartnerEntity';
import { container } from '@/di/container';
import { TYPES } from '@/di/types';
import type { ITransactionRepository } from '@/features/pos-cart/domain/repositories/ITransactionRepository';

interface ConvertToInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  ticketId: number;
  ticketNumber: string;
  onSuccess: (newDocument: any) => void;
}

export function ConvertToInvoiceModal({ open, onClose, ticketId, ticketNumber, onSuccess }: ConvertToInvoiceModalProps) {
  const transactionRepository = container.get<ITransactionRepository>(TYPES.ITransactionRepository);
  
  // Partners Logic
  const { partners, loading: partnersLoading, searchPartners } = usePartners();
  const [selectedPartner, setSelectedPartner] = useState<PosPartner | null>(null);
  const [partnerInputValue, setPartnerInputValue] = useState('');

  // Series Logic (INV = Factura)
  const { data: series = [], isLoading: seriesLoading } = useNumberSeries('INV');
  const [selectedSeriesId, setSelectedSeriesId] = useState<number | ''>('');

  // Action State
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Trigger search when typing (only if no partner is selected)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (partnerInputValue.length >= 2 && !selectedPartner) {
        searchPartners(partnerInputValue);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [partnerInputValue, searchPartners, selectedPartner]);

  const handleConvert = async () => {
    if (!selectedPartner || selectedSeriesId === '') return;

    setProcessing(true);
    setError(null);
    try {
      const newInvoice = await transactionRepository.convert(
        ticketId, 
        selectedPartner.id, 
        selectedSeriesId as number
      );
      onSuccess(newInvoice);
      onClose();
    } catch (err: any) {
      console.error('Conversion error:', err);
      setError(err.response?.data?.message || 'Error al convertir el documento. Verifique la conexión.');
    } finally {
      setProcessing(false);
    }
  };

  const sapBlue = '#005483';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 800, color: sapBlue }}>
        <FileText size={24} />
        Convertir Ticket a Factura
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Alert severity="info" icon={<AlertTriangle size={20} />} sx={{ borderRadius: 0, borderLeft: `4px solid ${sapBlue}` }}>
            Está a punto de certificar el ticket <strong>{ticketNumber}</strong> como una Factura oficial. 
            Este proceso es irreversible en la numeración sucesora.
          </Alert>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Partner Selection */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: 'text.secondary', textTransform: 'uppercase' }}>
              1. Seleccionar Cliente (Partner)
            </Typography>
            <Autocomplete
              options={partners}
              getOptionLabel={(option) => option.displayName}
              loading={partnersLoading}
              onInputChange={(_, value, reason) => {
                if (reason === 'input') {
                  setPartnerInputValue(value);
                } else if (reason === 'clear') {
                  setPartnerInputValue('');
                }
              }}
              onChange={(_, value) => setSelectedPartner(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Buscar por nombre o NIF..."
                  variant="filled"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <React.Fragment>
                        <User size={18} style={{ color: sapBlue, marginRight: 8 }} />
                        {params.InputProps.startAdornment}
                      </React.Fragment>
                    ),
                    endAdornment: (
                      <React.Fragment>
                        {partnersLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  sx={{ 
                    '& .MuiFilledInput-root': { borderRadius: '4px 4px 0 0' }
                  }}
                />
              )}
            />
          </Box>

          <Divider />

          {/* Series Selection */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: 'text.secondary', textTransform: 'uppercase' }}>
              2. Serie de Facturación
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {seriesLoading ? (
                <CircularProgress size={24} sx={{ mt: 1 }} />
              ) : series.length > 0 ? (
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  value={selectedSeriesId}
                  onChange={(e) => setSelectedSeriesId(Number(e.target.value))}
                  SelectProps={{ native: true }}
                  InputProps={{
                    startAdornment: <Hash size={18} style={{ color: sapBlue, marginRight: 8 }} />,
                  }}
                  sx={{ '& .MuiFilledInput-root': { borderRadius: '4px 4px 0 0' } }}
                >
                  <option value="">Seleccione una serie...</option>
                  {series.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.serie} ({s.documentType?.name || 'Factura'})
                    </option>
                  ))}
                </TextField>
              ) : (
                <Typography color="error" variant="body2">No hay series de factura (INV) configuradas.</Typography>
              )}
            </Box>
          </Box>

          {error && (
            <Typography color="error" variant="caption" sx={{ mt: 1, fontWeight: 600 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, backgroundColor: '#f8fafc' }}>
        <Button onClick={onClose} disabled={processing} sx={{ fontWeight: 700 }}>
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          onClick={handleConvert}
          disabled={!selectedPartner || !selectedSeriesId || processing}
          sx={{ 
            backgroundColor: sapBlue, 
            fontWeight: 800,
            '&:hover': { backgroundColor: '#003d5f' }
          }}
          startIcon={processing ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {processing ? 'Procesando...' : 'Generar Factura'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
