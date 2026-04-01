import { motion } from 'motion/react'
import {
  BarChart3,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Package,
  ShieldCheck,
  ShoppingCart,
  Users,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useTheme } from '@/providers/ThemeProvider'

interface SidebarItemProps {
  icon: ReactNode
  label: string
  active?: boolean
}

function SidebarItem({ icon, label, active = false }: SidebarItemProps) {
  const { isDark } = useTheme()

  return (
    <div
      className={`relative flex cursor-pointer items-center gap-4 px-4 py-3 transition-all ${
        active
          ? 'border-l-4 border-[#005eb2] bg-white font-bold text-[#005eb2] shadow-sm dark:bg-[#1a1a1a] dark:text-[#4da6ff]'
          : isDark
            ? 'text-gray-400 hover:bg-[#1f1f1f] hover:text-gray-200'
            : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
      }`}
    >
      <div className="shrink-0 [&>svg]:h-6 [&>svg]:w-6">
        {icon}
      </div>
      <span className="whitespace-nowrap text-xs font-bold tracking-tight opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="active-pill"
          className="absolute right-0 h-8 w-1 rounded-l-full bg-[#005eb2]"
        />
      )}
    </div>
  )
}

// ─── PosSidebar ───────────────────────────────────────────────────────────────
export function PosSidebar() {
  const { isDark } = useTheme()

  const border = isDark ? 'border-[#2a2a2a]' : 'border-gray-200'
  const sidebarBg = isDark ? 'bg-[#141414]' : 'bg-[#f1f3f5]'

  return (
    <aside
      className={`group z-40 flex w-16 flex-col border-r ${border} ${sidebarBg} transition-all duration-300 hover:w-64`}
    >
      <div className="flex-1 py-4">
        <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
        <SidebarItem icon={<ShoppingCart />} label="Sales" active />
        <SidebarItem icon={<Package />} label="Products" />
        <SidebarItem icon={<Users />} label="Customers" />
        <SidebarItem icon={<BarChart3 />} label="Reports" />
        <SidebarItem icon={<ShieldCheck />} label="Admin" />
      </div>
      <div className={`border-t ${border} py-4`}>
        <SidebarItem icon={<HelpCircle />} label="Help" />
        <SidebarItem icon={<LogOut />} label="Logout" />
      </div>
    </aside>
  )
}
