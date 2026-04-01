import { ThemeProvider } from '@/providers/ThemeProvider'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PosLayout } from '@/layout/PosLayout'
import { PosBootstrap } from '@/features/pos-auth/PosBootstrap'
import { LoginView } from '@/features/pos-auth/views/LoginView'

// ─── App ──────────────────────────────────────────────────────────────────────
// Entry point — only providers + root layout.
// All business logic, state, and UI is encapsulated in feature modules.
export default function App() {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* The Login Route - Static for UI development */}
            <Route path="/login" element={<LoginView />} />
            
            {/* The Main POS App - Protected by SSO Launch Token Manager */}
            <Route
              path="/"
              element={
                <PosBootstrap>
                  <PosLayout />
                </PosBootstrap>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}
