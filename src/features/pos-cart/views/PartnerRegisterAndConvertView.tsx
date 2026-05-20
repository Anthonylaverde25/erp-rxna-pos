import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  IconButton,
  Divider,
  alpha
} from '@mui/material';
import { ArrowLeft, UserPlus, FileText, ChevronRight, Save } from 'lucide-react';
import { useTransaction } from '../hooks/useTransaction';
import { useNumberSeries } from '@/features/pos-settings/hooks/useNumberSeries';
import { PosTicketReceipt } from '../components/receipt/PosTicketReceipt';
import { useTheme } from '@/providers/ThemeProvider';

export function PartnerRegisterAndConvertView() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { document, loading, getTransactionById } = useTransaction();
  const { data: series = [], isLoading: seriesLoading } = useNumberSeries('INV');

  // Form State
  const [partnerData, setPartnerData] = useState({
    name: '',
    vat_number: '',
    email: '',
    phone: '',
    address: '',
  });
  const [selectedSeriesId, setSelectedSeriesId] = useState<number | ''>('');

  useEffect(() => {
    if (ticketId) {
      getTransactionById(Number(ticketId));
    }
  }, [ticketId, getTransactionById]);

  // SAP Fiori Horizon styles
  const sapBlue = '#005483';
  const sectionBg = isDark ? '#1a1a1a' : '#ffffff';
  const borderColor = isDark ? '#2a2a2a' : '#e5e7eb';

  if (loading && !document) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: isDark ? '#000' : '#f8fafc' }}>
        <CircularProgress sx={{ color: sapBlue }} />
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: isDark ? '#000' : '#f8fafc', width: '100%' }}>
      {/* Header Bar */}
      <Box sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderBottom: `1px solid ${borderColor}`,
        bgcolor: sectionBg,
        zIndex: 10
      }}>
        <IconButton onClick={() => navigate(-1)} size="small">
          <ArrowLeft size={20} />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 800, color: sapBlue }}>
          Registro y Conversión a Factura
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="contained"
          startIcon={<Save size={18} />}
          sx={{
            bgcolor: sapBlue,
            fontWeight: 700,
            borderRadius: '4px',
            '&:hover': { bgcolor: alpha(sapBlue, 0.9) }
          }}
        >
          Guardar y Generar Factura
        </Button>
      </Box>

      {/* Main Content Area (Split Screen using Flex) */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Left Column: Form (40% width) */}
        <Box >
          <Box sx={{ maxWidth: 500, mx: 'auto' }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <UserPlus size={24} color={sapBlue} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Datos del Nuevo Cliente</Typography>
            </Box>

            {/* Form Fields using modern CSS Grid via Box */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
              <Box sx={{ gridColumn: 'span 2' }}>
                <TextField
                  fullWidth
                  label="Nombre o Razón Social"
                  variant="filled"
                  value={partnerData.name}
                  onChange={(e) => setPartnerData({ ...partnerData, name: e.target.value })}
                  placeholder="Ej: Anthony Laverde"
                  required
                  sx={{ '& .MuiFilledInput-root': { borderRadius: '4px' } }}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: 'span 2', sm: 'span 1' } }}>
                <TextField
                  fullWidth
                  label="NIF / CIF"
                  variant="filled"
                  value={partnerData.vat_number}
                  onChange={(e) => setPartnerData({ ...partnerData, vat_number: e.target.value })}
                  placeholder="Ej: 12345678Z"
                  sx={{ '& .MuiFilledInput-root': { borderRadius: '4px' } }}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: 'span 2', sm: 'span 1' } }}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  variant="filled"
                  value={partnerData.phone}
                  onChange={(e) => setPartnerData({ ...partnerData, phone: e.target.value })}
                  placeholder="Ej: 600000000"
                  sx={{ '& .MuiFilledInput-root': { borderRadius: '4px' } }}
                />
              </Box>
              <Box sx={{ gridColumn: 'span 2' }}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  variant="filled"
                  value={partnerData.email}
                  onChange={(e) => setPartnerData({ ...partnerData, email: e.target.value })}
                  placeholder="ejemplo@correo.com"
                  sx={{ '& .MuiFilledInput-root': { borderRadius: '4px' } }}
                />
              </Box>
              <Box sx={{ gridColumn: 'span 2' }}>
                <TextField
                  fullWidth
                  label="Dirección Completa"
                  variant="filled"
                  multiline
                  rows={2}
                  value={partnerData.address}
                  onChange={(e) => setPartnerData({ ...partnerData, address: e.target.value })}
                  placeholder="C/ Mayor 1, 28001 Madrid"
                  sx={{ '& .MuiFilledInput-root': { borderRadius: '4px' } }}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <FileText size={24} color={sapBlue} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Configuración de Factura</Typography>
            </Box>

            <TextField
              select
              fullWidth
              label="Serie de Facturación"
              variant="filled"
              value={selectedSeriesId}
              onChange={(e) => setSelectedSeriesId(Number(e.target.value))}
              helperText="Seleccione la serie para la nueva factura"
              sx={{ '& .MuiFilledInput-root': { borderRadius: '4px' } }}
            >
              {seriesLoading ? (
                <MenuItem disabled>Cargando series...</MenuItem>
              ) : (
                series.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name} ({s.code}) - Prox: {s.nextNumber}
                  </MenuItem>
                ))
              )}
            </TextField>

            <Box sx={{ mt: 6, p: 2, bgcolor: alpha(sapBlue, 0.05), borderLeft: `4px solid ${sapBlue}`, borderRadius: '0 4px 4px 0' }}>
              <Typography variant="caption" sx={{ color: sapBlue, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ChevronRight size={14} /> INFORMACIÓN TÉCNICA
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Al guardar, se creará el registro maestro del partner y se disparará automáticamente el proceso de conversión para el ticket indicado.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Column: Document Preview (60% width) */}
        <Box sx={{
          flex: 1,
          height: '100%',
          overflowY: 'auto',
          p: 4,
          bgcolor: isDark ? '#080808' : '#e2e8f0',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Box sx={{ width: '100%', maxWidth: 450 }}>
            <Typography variant="overline" sx={{ display: 'block', mb: 2, textAlign: 'center', fontWeight: 700, color: 'text.secondary' }}>
              PREVISUALIZACIÓN DE TICKET ORIGINAL
            </Typography>
            {document && (
              <PosTicketReceipt
                ticketData={document}
                hideActions={true}
                paymentInfo={{
                  methodId: 1,
                  methodName: 'Efectivo',
                  tenderedAmount: document.total,
                  change: 0
                }}
                onClose={() => navigate(-1)}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
