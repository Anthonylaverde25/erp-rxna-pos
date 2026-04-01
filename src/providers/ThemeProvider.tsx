import { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import type { ThemeMode } from '@/types/pos.types'

// ─── Theme Context ────────────────────────────────────────────────────────────
interface ThemeContextValue {
  mode: ThemeMode
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

// ─── useTheme hook ────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

// ─── ThemeProvider ────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light')

  const toggleTheme = () => {
    const isDark = mode === 'light'
    setMode(isDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark)
  }

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#005eb2',
            dark: '#003f7b',
            light: '#d5e3ff',
          },
          ...(mode === 'dark'
            ? { background: { default: '#0f0f0f', paper: '#1a1a1a' } }
            : { background: { default: '#f8f9fb', paper: '#ffffff' } }),
        },
        shape: { borderRadius: 8 },
        typography: { fontFamily: 'inherit' },
      }),
    [mode],
  )

  const value = useMemo(
    () => ({ mode, isDark: mode === 'dark', toggleTheme }),
    [mode], // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
