import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import { X, AlertCircle } from 'lucide-react'
import type { SeriesOption } from './types'
import { SeriesItem } from './SeriesItem'

interface SeriesDialogProps {
  open: boolean
  onClose: () => void
  onApply: () => void
  draftSeries: SeriesOption | null
  setDraftSeries: (series: SeriesOption) => void
  seriesOptions: SeriesOption[]
  isError: boolean
  isDark: boolean
  colors: {
    panel: string
    border: string
    textPrimary: string
    textMuted: string
    card: string
  }
}

export function SeriesDialog({
  open,
  onClose,
  onApply,
  draftSeries,
  setDraftSeries,
  seriesOptions,
  isError,
  isDark,
  colors
}: SeriesDialogProps) {
  const { panel, border, textPrimary, textMuted } = colors

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '4px',
          bgcolor: panel,
          border: `1px solid ${border}`,
          boxShadow: isDark
            ? '0 25px 50px -12px rgba(0,0,0,0.6)'
            : '0 25px 50px -12px rgba(0,0,0,0.2)',
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: '#005483',
          color: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.2 }}>
            Cambiar serie de documento
          </Typography>
          <Typography sx={{ fontSize: '0.68rem', opacity: 0.75, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Series configuradas en el sistema
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: 'rgba(255,255,255,0.72)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.08)' } }}
        >
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, bgcolor: panel }}>
        {isError ? (
          <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <AlertCircle size={40} color="#ef4444" />
            <Typography sx={{ color: textPrimary, fontWeight: 700 }}>Error al cargar series numéricas</Typography>
            <Button onClick={() => window.location.reload()} size="small" variant="outlined" sx={{ borderColor: border, color: textMuted }}>Reintentar</Button>
          </Box>
        ) : (
          <Box className=' bg-amber-600 mt-3' sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {seriesOptions.map((series) => (
              <SeriesItem
                key={series.id}
                series={series}
                isSelected={draftSeries?.id === series.id}
                isDark={isDark}
                onClick={() => setDraftSeries(series)}
                colors={colors}
              />
            ))}
            {seriesOptions.length === 0 && (
              <Typography sx={{ py: 4, textAlign: 'center', color: textMuted, fontWeight: 700 }}>
                No hay series disponibles para esta empresa.
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>

      <Divider sx={{ borderColor: border }} />

      <DialogActions sx={{ px: 3, py: 2, bgcolor: panel }}>
        <Button
          onClick={onClose}
          variant="text"
          sx={{ color: textMuted, fontWeight: 800, textTransform: 'none' }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onApply}
          disabled={!draftSeries}
          variant="contained"
          sx={{
            bgcolor: '#005483',
            px: 3,
            py: 1,
            fontWeight: 800,
            textTransform: 'none',
            borderRadius: '4px',
            '&:hover': { bgcolor: '#003f62' },
          }}
        >
          Aplicar serie seleccionada
        </Button>
      </DialogActions>
    </Dialog>
  )
}
