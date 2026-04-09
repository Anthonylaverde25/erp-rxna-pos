import { useState, useEffect, useMemo } from 'react'
import { CircularProgress } from '@mui/material'
import { useTheme } from '@/providers/ThemeProvider'
import { useNumberSeries } from '@/features/pos-settings/hooks/useNumberSeries'
import { usePosSettingsStore } from '@/features/pos-settings/store/usePosSettingsStore'
import type { SeriesOption } from './types'
import { SeriesTrigger } from './SeriesTrigger'
import { SeriesDialog } from './SeriesDialog'

export function DocumentSeriesSwitch() {
  const { isDark } = useTheme()
  const [open, setOpen] = useState(false)
  const { activeSeries, setActiveSeries } = usePosSettingsStore()

  // Hook de series desde la API (filtrado solo para Tickets)
  const { data: remoteSeries, isLoading, isError } = useNumberSeries('TKT')

  // Mapeo de series remotas al formato del componente
  const seriesOptions = useMemo<SeriesOption[]>(() => {
    if (!remoteSeries) return []
    return remoteSeries.map(s => ({
      id: s.serie,
      databaseId: s.id,
      name: s.documentType?.name || `Serie ${s.serie}`,
      documentType: s.documentType?.name || 'Documento',
      documentTypeCode: s.documentType?.code || 'TKT',
      register: 'Caja Activa',
      year: s.year,
      currentNumber: s.currentNumber,
      terms: s.terms,
      description: s.documentType?.description || null
    }))
  }, [remoteSeries])

  const [draftSeries, setDraftSeries] = useState<SeriesOption | null>(null)

  // Inicializar serie activa al cargar datos o validar si la guardada existe
  useEffect(() => {
    if (seriesOptions.length > 0) {
      const savedSeriesExists = activeSeries && seriesOptions.some(s => s.databaseId === activeSeries.databaseId)
      
      if (!savedSeriesExists) {
        setActiveSeries(seriesOptions[0])
        setDraftSeries(seriesOptions[0])
      } else if (activeSeries && !draftSeries) {
        setDraftSeries(activeSeries)
      }
    }
  }, [seriesOptions, activeSeries, draftSeries, setActiveSeries])

  // SAP Fiori Horizon Palette Shared Colors
  const colors = {
    textPrimary: isDark ? '#f3f4f6' : '#32363a',
    textMuted: isDark ? '#a0aec0' : '#6a6d70',
    border: isDark ? '#2a2a2a' : '#d9d9d9',
    surface: isDark ? '#151515' : '#f7f9fb',
    panel: isDark ? '#111827' : '#f8fafc',
    card: isDark ? '#1f2937' : '#ffffff',
  }

  const handleOpen = () => {
    setDraftSeries(activeSeries)
    setOpen(true)
  }

  const handleClose = () => {
    setDraftSeries(activeSeries)
    setOpen(false)
  }

  const handleApply = () => {
    if (draftSeries) {
      setActiveSeries(draftSeries)
    }
    setOpen(false)
  }

  if (isLoading && !activeSeries) {
    return (
      <div className="flex items-center gap-2 rounded-[4px] border px-3 py-1.5 opacity-60" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
        <CircularProgress size={16} thickness={6} sx={{ color: '#005483' }} />
        <span className="text-xs font-bold" style={{ color: colors.textMuted }}>Cargando series...</span>
      </div>
    )
  }

  if (!activeSeries) return null

  return (
    <>
      <SeriesTrigger
        activeSeriesId={activeSeries.id}
        onClick={handleOpen}
        colors={colors}
      />

      <SeriesDialog
        open={open}
        onClose={handleClose}
        onApply={handleApply}
        draftSeries={draftSeries}
        setDraftSeries={setDraftSeries}
        seriesOptions={seriesOptions}
        isError={isError}
        isDark={isDark}
        colors={colors}
      />
    </>
  )
}
