import { useState } from 'react'
import { ShoppingCart, UserPlus, User, X } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'
import { SelectPartnerModal } from './SelectPartnerModal'
import type { PosPartner } from '@/domain/entities/partners/PartnerEntity'

interface CartHeaderProps {
  onVoid?: () => void
  selectedPartner?: PosPartner | null
  onSelectPartner?: (partner: PosPartner) => void
  onRemovePartner?: () => void
}

// ─── CartHeader ───────────────────────────────────────────────────────────────
export function CartHeader({ 
  onVoid, 
  selectedPartner, 
  onSelectPartner, 
  onRemovePartner 
}: CartHeaderProps) {
  const { isDark } = useTheme()
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false)

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

      <div className="flex flex-col gap-2">
        {selectedPartner ? (
          <div className={`flex items-center justify-between rounded border ${border} ${isDark ? 'bg-[#005483]/10' : 'bg-[#005483]/5'} p-2 px-3`}>
            <div className="flex items-center gap-3 overflow-hidden" onClick={() => setIsSelectModalOpen(true)} style={{ cursor: 'pointer' }}>
              <div className="shrink-0 rounded-full bg-[#005483] p-1.5 text-white">
                <User size={14} />
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-bold text-[#005483]">
                  {selectedPartner.name}
                </p>
                <p className={`truncate text-[10px] ${textMuted}`}>
                  {selectedPartner.vatNumber || 'Sin identificación'}
                </p>
              </div>
            </div>
            <button 
              onClick={onRemovePartner}
              className={`ml-2 rounded-full p-1 transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
            >
              <X size={14} className={textMuted} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              className={`flex-1 rounded border ${border} ${btnStyle} py-2 text-xs font-bold transition-colors`}
            >
              Park Order
            </button>
            <button
              onClick={() => setIsSelectModalOpen(true)}
              className={`flex flex-1 items-center justify-center gap-2 rounded border ${border} ${btnStyle} py-2 text-xs font-bold transition-colors`}
            >
              <UserPlus size={14} />
              Add Customer
            </button>
          </div>
        )}
      </div>

      <SelectPartnerModal
        open={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onSelect={(p) => onSelectPartner?.(p)}
      />
    </div>
  )
}
