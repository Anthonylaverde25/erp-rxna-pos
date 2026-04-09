import { Bell, Moon, Search, Settings, Sun, Store } from 'lucide-react'
import { IconButton, Tooltip, Avatar, Divider, Box } from '@mui/material'
import { useTheme } from '@/providers/ThemeProvider'
import { useAuthStore } from '@/features/pos-auth/store/useAuthStore'
import { DocumentSeriesSwitch } from '@/features/pos-settings/components/DocumentSeriesSwitch'
import { Link as RouterLink, useLocation } from 'react-router-dom'

// ─── PosHeader (Fiori Edition) ───────────────────────────────────────────────
export function PosHeader() {
  const { isDark, toggleTheme } = useTheme()
  const user = useAuthStore((state) => state.user)
  const location = useLocation()
  const isSettingsRoute = location.pathname === '/setting'

  // SAP Fiori Horizon Palette
  const sapBlue = '#005483'
  const sapBorder = isDark ? '#2a2a2a' : '#d9d9d9'
  const sapTextPrimary = isDark ? '#f3f4f6' : '#32363a'
  const sapTextMuted = isDark ? '#a0aec0' : '#6a6d70'

  return (
    <header
      className={`z-50 flex h-14 shrink-0 items-center justify-between border-b ${isDark ? 'border-[#2a2a2a]' : 'border-[#d9d9d9]'} ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#ffffff]'} px-4 shadow-sm transition-colors duration-200`}
      style={{ borderBottom: `2px solid ${isDark ? '#2a2a2a' : '#f0f0f0'}` }}
    >
      {/* Brand + Nav */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#005483] text-white">
            <Store size={18} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-sm font-black tracking-tight ${sapTextPrimary} uppercase`}>
              Nexus ERP
            </span>
            <span className="text-[10px] font-bold text-[#005483]">POINT OF SALE</span>
          </div>
        </div>

        <Divider orientation="vertical" flexItem sx={{ my: 1.5, borderColor: sapBorder }} />

        <div className="flex items-center gap-1 px-2">
          <div className="flex flex-col items-start leading-none">
            <span className={`text-[11px] font-bold ${sapTextMuted} uppercase tracking-wider`}>Terminal</span>
            <span className={`text-xs font-black ${sapTextPrimary}`}>T-102 (Main Floor)</span>
          </div>
        </div>

        <Divider orientation="vertical" flexItem sx={{ my: 1.5, borderColor: sapBorder }} />

        <DocumentSeriesSwitch />
      </div>

      {/* Center: Search (Industrial Style) */}
      <div className="hidden flex-1 justify-center md:flex">
        <div
          className={`group flex w-full max-w-md items-center border transition-all ${
            isDark ? 'bg-[#222] border-[#333]' : 'bg-[#f5f5f5] border-[#ccc]'
          } focus-within:border-[#005483] focus-within:bg-white px-3 py-1.5`}
          style={{ borderRadius: '4px' }}
        >
          <Search size={14} className={sapTextMuted} />
          <input
            type="text"
            placeholder="Search items, SKU or barcode..."
            className={`ml-2 w-full border-none bg-transparent p-0 text-xs font-medium ${sapTextPrimary} placeholder:text-gray-400 focus:outline-none focus:ring-0`}
          />
        </div>
      </div>

      {/* Actions (Fiori Style) */}
      <div className="flex items-center gap-1">
        <Tooltip title="Notifications">
          <IconButton size="small" sx={{ color: sapTextMuted, borderRadius: '4px' }}>
            <Bell size={18} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Switch Theme">
          <IconButton onClick={toggleTheme} size="small" sx={{ color: sapTextMuted, borderRadius: '4px' }}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Configuracion">
          <IconButton
            component={RouterLink}
            to="/setting"
            size="small"
            sx={{
              color: isSettingsRoute ? '#005483' : sapTextMuted,
              borderRadius: '4px',
              bgcolor: isSettingsRoute ? (isDark ? 'rgba(0,84,131,0.22)' : '#e6f0f7') : 'transparent',
              '&:hover': {
                bgcolor: isSettingsRoute ? (isDark ? 'rgba(0,84,131,0.28)' : '#d9ebf5') : isDark ? '#222' : '#f8f9fa',
              },
            }}
          >
            <Settings size={18} />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 1.5, borderColor: sapBorder }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1, cursor: 'pointer', p: '4px', borderRadius: '4px', '&:hover': { bgcolor: isDark ? '#222' : '#f8f9fa' } }}>
          <div className="hidden flex-col items-end leading-tight sm:flex">
            <span className={`text-xs font-black ${sapTextPrimary}`}>
              {user?.full_name?.split(' ')[0] || 'User'}
            </span>
            <span className={`text-[10px] font-bold text-[#005483] uppercase`}>
              Cashier
            </span>
          </div>
          <Avatar 
            sx={{ 
              width: 32, 
              height: 32, 
              bgcolor: sapBlue, 
              fontSize: '12px', 
              fontWeight: 900,
              borderRadius: '4px' 
            }}
          >
            {user?.full_name?.charAt(0) || 'U'}
          </Avatar>
        </Box>
      </div>
    </header>
  )
}
