import { Outlet } from 'react-router-dom'
import { useTheme } from '@/providers/ThemeProvider'
import { PosHeader } from './PosHeader'
import { PosSidebar } from './PosSidebar'

// ─── PosLayout (Fiori Edition) ────────────────────────────────────────────────
export function PosLayout() {
  const { isDark } = useTheme()

  // SAP Fiori Workspace Background
  const bg = isDark ? 'bg-[#0f0f0f]' : 'bg-[#f5f7f9]'

  return (
    <div className={`flex h-screen flex-col overflow-hidden ${bg} font-sans transition-colors duration-200`}>
      <PosHeader />

      <div className="flex flex-1 overflow-hidden">
        <PosSidebar />

        <main className="flex flex-1 overflow-hidden p-3 gap-3">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
