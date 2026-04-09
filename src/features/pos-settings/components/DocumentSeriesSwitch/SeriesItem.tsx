import { Box, Typography } from '@mui/material'
import { Check } from 'lucide-react'
import type { SeriesOption } from './types'

interface SeriesItemProps {
  series: SeriesOption
  isSelected: boolean
  isDark: boolean
  onClick: () => void
  colors: {
    textPrimary: string
    textMuted: string
    border: string
    card: string
  }
}

export function SeriesItem({ series, isSelected, isDark, onClick, colors }: SeriesItemProps) {
  const { textPrimary, textMuted, border, card } = colors

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[4px] border p-0 text-left transition-all"
      style={{
        borderColor: isSelected ? '#005483' : border,
        backgroundColor: card,
        boxShadow: isSelected ? '0 0 0 2px #005483' : 'none',
      }}
    >
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ color: textPrimary, fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              {series.id}
            </Typography>
            <Box sx={{ bgcolor: isDark ? '#374151' : '#e2e8f0', px: 1, py: 0.25, borderRadius: '4px' }}>
              <Typography sx={{ color: textPrimary, fontSize: '0.65rem', fontWeight: 800 }}>
                {series.year}
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ color: textPrimary, fontWeight: 700, fontSize: '0.85rem' }}>
            {series.name}
          </Typography>

          {(series.description || series.terms) && (
            <Typography sx={{ color: textMuted, fontSize: '0.75rem', fontWeight: 500, mt: 0.5, lineHeight: 1.4 }}>
              {series.terms || series.description}
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1.5 }}>
            <Box>
              <Typography sx={{ color: textMuted, fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Próximo número
              </Typography>
              {/* <Typography sx={{ color: '#005483', fontWeight: 900, fontSize: '0.9rem' }}>
                {(series.currentNumber + 1).toString().padStart(6, '0')}
              </Typography> */}
            </Box>
            <Box>
              <Typography sx={{ color: textMuted, fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Tipo | Origen
              </Typography>
              <Typography sx={{ color: textMuted, fontWeight: 700, fontSize: '0.8rem' }}>
                {series.documentType} | {series.register}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: isSelected ? '#005483' : isDark ? '#111827' : '#eef2f6',
            color: isSelected ? 'white' : textMuted,
            border: `1px solid ${isSelected ? '#005483' : border}`,
            mt: 0.5
          }}
        >
          <Check size={18} strokeWidth={3} />
        </Box>
      </Box>
    </button>
  )
}
