import { useState } from 'react'
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
import { Check, ChevronDown, FileText, X } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'

interface SeriesOption {
  id: string
  name: string
  documentType: string
  register: string
}

const SERIES_OPTIONS: SeriesOption[] = [
  { id: 'B001', name: 'Boleta Principal', documentType: 'Boleta', register: 'Caja 01' },
  { id: 'F001', name: 'Factura General', documentType: 'Factura', register: 'Caja 01' },
  { id: 'NC01', name: 'Notas de Credito', documentType: 'Nota de Credito', register: 'Caja 01' },
]

export function DocumentSeriesSwitch() {
  const { isDark } = useTheme()
  const [open, setOpen] = useState(false)
  const [activeSeries, setActiveSeries] = useState<SeriesOption>(SERIES_OPTIONS[0])
  const [draftSeries, setDraftSeries] = useState<SeriesOption>(SERIES_OPTIONS[0])

  const textPrimary = isDark ? '#f3f4f6' : '#32363a'
  const textMuted = isDark ? '#a0aec0' : '#6a6d70'
  const border = isDark ? '#2a2a2a' : '#d9d9d9'
  const surface = isDark ? '#151515' : '#f7f9fb'
  const panel = isDark ? '#111827' : '#f8fafc'
  const card = isDark ? '#1f2937' : '#ffffff'

  const handleOpen = () => {
    setDraftSeries(activeSeries)
    setOpen(true)
  }

  const handleClose = () => {
    setDraftSeries(activeSeries)
    setOpen(false)
  }

  const handleApply = () => {
    setActiveSeries(draftSeries)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        className="flex items-center gap-2 rounded-[4px] border px-3 py-1.5 transition-colors"
        style={{
          borderColor: border,
          backgroundColor: surface,
          color: textPrimary,
        }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-[4px] text-white"
          style={{ backgroundColor: '#005483' }}
        >
          <FileText size={16} />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>
            Serie activa
          </span>
          <span className="text-xs font-black">{activeSeries.id}</span>
        </div>
        <ChevronDown size={16} color={textMuted} />
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
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
              Datos estaticos de prueba
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: 'rgba(255,255,255,0.72)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.08)' } }}
          >
            <X size={18} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, bgcolor: panel }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {SERIES_OPTIONS.map((series) => {
              const isSelected = draftSeries.id === series.id

              return (
                <button
                  key={series.id}
                  type="button"
                  onClick={() => setDraftSeries(series)}
                  className="w-full rounded-[4px] border p-0 text-left transition-all"
                  style={{
                    borderColor: isSelected ? '#005483' : border,
                    backgroundColor: card,
                    boxShadow: isSelected ? '0 0 0 1px #005483 inset' : 'none',
                  }}
                >
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.35 }}>
                      <Typography sx={{ color: textPrimary, fontWeight: 900, fontSize: '0.95rem', letterSpacing: '-0.02em' }}>
                        {series.id}
                      </Typography>
                      <Typography sx={{ color: textPrimary, fontWeight: 700, fontSize: '0.82rem' }}>
                        {series.name}
                      </Typography>
                      <Typography sx={{ color: textMuted, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {series.documentType} | {series.register}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: isSelected ? '#005483' : isDark ? '#111827' : '#eef2f6',
                        color: isSelected ? 'white' : textMuted,
                        border: `1px solid ${isSelected ? '#005483' : border}`,
                      }}
                    >
                      <Check size={16} />
                    </Box>
                  </Box>
                </button>
              )
            })}
          </Box>
        </DialogContent>

        <Divider sx={{ borderColor: border }} />

        <DialogActions sx={{ px: 3, py: 2, bgcolor: panel }}>
          <Button
            onClick={handleClose}
            variant="text"
            sx={{ color: textMuted, fontWeight: 800 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleApply}
            variant="contained"
            sx={{
              bgcolor: '#005483',
              px: 2.5,
              fontWeight: 800,
              '&:hover': { bgcolor: '#003f62' },
            }}
          >
            Aplicar serie
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
