import { useTheme } from '@/providers/ThemeProvider'

interface CategoryItem {
  id: number
  name: string
}

interface CategoryFilterProps {
  categories: CategoryItem[]
  selected: number | null
  onSelect: (id: number | null) => void
}

// ─── CategoryFilter ───────────────────────────────────────────────────────────
export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const { isDark } = useTheme()

  const pillActive = 'bg-[#d5e3ff] text-[#00529c]'
  const pillInactive = isDark
    ? 'bg-[#1f1f1f] text-gray-400 hover:bg-[#2a2a2a]'
    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      <button
        onClick={() => onSelect(null)}
        className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
          selected === null ? pillActive : pillInactive
        }`}
      >
        Todos
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
            selected === category.id ? pillActive : pillInactive
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
