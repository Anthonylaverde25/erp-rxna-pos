import { CreditCard, Gift, Printer, Tag } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'

interface CartSummaryProps {
  subtotal: number
  tax: number
  total: number
  onCheckout: () => void
}

// ─── CartSummary ──────────────────────────────────────────────────────────────
export function CartSummary({ subtotal, tax, total, onCheckout }: CartSummaryProps) {
  const { isDark } = useTheme()

  const border = isDark ? 'border-[#2a2a2a]' : 'border-gray-200'
  const surface = isDark ? 'bg-[#1a1a1a]' : 'bg-white'
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500'
  const btnSecondary = isDark
    ? 'bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]'
    : 'bg-white text-gray-700 hover:bg-gray-50'
  const btnAlt = isDark
    ? 'bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2 })

  return (
    <div
      className={`border-t ${border} ${surface} p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-colors duration-200`}
    >
      <div className="mb-6 space-y-2">
        <div className={`flex justify-between text-[11px] font-bold ${textMuted}`}>
          <span>Subtotal</span>
          <span>${fmt(subtotal)}</span>
        </div>
        <div className={`flex justify-between text-[11px] font-bold ${textMuted}`}>
          <span>Tax (8.5%)</span>
          <span>${fmt(tax)}</span>
        </div>
        <div className={`flex items-center justify-between border-t ${border} pt-2`}>
          <span className={`text-xs font-bold uppercase tracking-widest ${textMuted}`}>
            Total
          </span>
          <span className="text-2xl font-black text-[#005eb2]">${fmt(total)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={onCheckout}
          disabled={total <= 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#005eb2] to-[#003f7b] py-4 font-bold text-white shadow-lg shadow-blue-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <CreditCard className="h-5 w-5" />
          Complete Payment
        </button>
        <button
          className={`flex w-full items-center justify-center gap-1.5 rounded-xl border ${border} ${btnSecondary} py-2.5 text-xs font-bold transition-colors`}
        >
          <Tag className="h-4 w-4" />
          Add Discount
        </button>

      </div>
    </div>
  )
}

