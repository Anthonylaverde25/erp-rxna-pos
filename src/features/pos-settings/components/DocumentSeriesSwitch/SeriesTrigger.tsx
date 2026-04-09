import { ChevronDown, FileText } from 'lucide-react'

interface SeriesTriggerProps {
  activeSeriesId: string
  onClick: () => void
  colors: {
    border: string
    surface: string
    textPrimary: string
    textMuted: string
  }
}

export function SeriesTrigger({ activeSeriesId, onClick, colors }: SeriesTriggerProps) {
  const { border, surface, textPrimary, textMuted } = colors

  return (
    <button
      type="button"
      onClick={onClick}
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
        <span className="text-xs font-black">{activeSeriesId}</span>
      </div>
      <ChevronDown size={16} color={textMuted} />
    </button>
  )
}
