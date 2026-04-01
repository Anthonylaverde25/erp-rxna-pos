import { Search } from 'lucide-react'
import { useRef, useEffect } from 'react'
import { useTheme } from '@/providers/ThemeProvider'

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
}

// ─── ProductSearch ────────────────────────────────────────────────────────────
// Search bar with autoFocus via useRef — keyboard-first UX for POS operators.
export function ProductSearch({ value, onChange }: ProductSearchProps) {
  const { isDark } = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)

  // Autofocus on mount so operators can start typing immediately
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="relative">
      <Search
        className={`absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, category, or SKU..."
        autoFocus={true}
        className={`w-full rounded-xl border px-12 py-3 text-sm font-medium outline-none transition-all
          ${
            isDark
              ? 'border-[#2a2a2a] bg-[#1a1a1a] text-gray-300 placeholder-gray-600 focus:border-[#005eb2] focus:ring-2 focus:ring-[#005eb2]/20'
              : 'border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:border-[#005eb2] focus:ring-2 focus:ring-blue-50'
          }`}
      />
    </div>
  )
}

