import { ShoppingCart } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'

interface CartHeaderProps {
  onVoid?: () => void
}

// ─── CartHeader ───────────────────────────────────────────────────────────────
export function CartHeader({ onVoid }: CartHeaderProps) {
  const { isDark } = useTheme()

  const border = isDark ? 'border-[#2a2a2a]' : 'border-gray-200'
  const surface = isDark ? 'bg-[#1a1a1a]' : 'bg-white'
  const textPrimary = isDark ? 'text-gray-100' : 'text-gray-900'
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500'
  const btnStyle = isDark
    ? 'bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

  return (
    <div className={`border-b ${border} ${surface} p-6`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg p-2 ${isDark ? 'bg-[#003f7b]' : 'bg-[#d5e3ff]'}`}>
            <ShoppingCart className="h-5 w-5 text-[#005eb2]" />
          </div>
          <div>
            <h2 className={`text-base font-bold ${textPrimary}`}>Active Cart</h2>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${textMuted}`}>
              Terminal #02 • J. DOE
            </p>
          </div>
        </div>
        <button
          onClick={onVoid}
          className="text-xs font-bold text-red-500 hover:underline"
        >
          Void
        </button>
      </div>
      <div className="flex gap-2">
        <button
          className={`flex-1 rounded border ${border} ${btnStyle} py-2 text-xs font-bold transition-colors`}
        >
          Park Order
        </button>
        <button
          className={`flex-1 rounded border ${border} ${btnStyle} py-2 text-xs font-bold transition-colors`}
        >
          Add Customer
        </button>
      </div>
    </div>
  )
}
