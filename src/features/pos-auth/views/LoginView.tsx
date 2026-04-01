import { Lock, User, Building2 } from 'lucide-react'
import { Box, Button, TextField, Typography, useTheme as useMuiTheme } from '@mui/material'
import { motion } from 'motion/react'
import { useTheme } from '@/providers/ThemeProvider'

// ─── LoginView ────────────────────────────────────────────────────────────────
// Static blueprint for the standalone POS Login following SAP Fiori aesthetics
export function LoginView() {
  const { isDark } = useTheme()

  const surfaceBg = isDark ? '#1a1a1a' : '#ffffff'
  const borderCol = isDark ? '#2a2a2a' : '#e2e8f0'
  const textMuted = isDark ? '#9ca3af' : '#64748b'

  return (
    <Box
      className="flex min-h-screen items-center justify-center p-4"
      sx={{
        backgroundColor: isDark ? '#111111' : '#f8fafc',
        backgroundImage: isDark 
          ? 'radial-gradient(ellipse at top, rgba(0,84,131,0.15), transparent 50%)' 
          : 'radial-gradient(ellipse at top, rgba(0,84,131,0.05), transparent 50%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Box
          sx={{
            backgroundColor: surfaceBg,
            border: `1px solid ${borderCol}`,
            borderRadius: '4px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}
        >
          {/* Header Banner - SAP Blue */}
          <Box
            sx={{
              backgroundColor: '#005483', // SAP Core Blue
              px: 4,
              py: 4,
              color: 'white',
              textAlign: 'center',
              borderBottom: `4px solid ${isDark ? '#003b5c' : '#007bbd'}`,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                mb: 2,
              }}
            >
              <Building2 size={32} color="white" />
            </Box>
            <Typography variant="h5" fontWeight="900" letterSpacing="-0.5px">
              Nexus POS
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Enterprise Point of Sale
            </Typography>
          </Box>

          {/* Form Body */}
          <Box sx={{ p: 4 }}>
            <Typography variant="subtitle2" fontWeight="700" sx={{ mb: 3, color: isDark ? '#f3f4f6' : '#334155' }}>
              Sign in to your register
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Tenant / Endpoint */}
              <TextField
                fullWidth
                label="Workspace URL / Tenant"
                variant="filled"
                size="small"
                defaultValue="https://erp.nexus.dev"
                disabled
                slotProps={{
                  input: {
                    disableUnderline: true,
                    style: { borderRadius: '4px' },
                    startAdornment: <Building2 size={18} color={textMuted} style={{ marginRight: 8 }} />
                  }
                }}
              />

              <TextField
                fullWidth
                label="Email or Username"
                variant="filled"
                size="small"
                slotProps={{
                  input: {
                    disableUnderline: true,
                    style: { borderRadius: '4px' },
                    startAdornment: <User size={18} color={textMuted} style={{ marginRight: 8 }} />
                  }
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="filled"
                size="small"
                slotProps={{
                  input: {
                    disableUnderline: true,
                    style: { borderRadius: '4px' },
                    startAdornment: <Lock size={18} color={textMuted} style={{ marginRight: 8 }} />
                  }
                }}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                disableElevation
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: '#005483', // SAP Action Primary
                  color: 'white',
                  borderRadius: '4px', // Sharp edge precision
                  fontWeight: 800,
                  textTransform: 'none',
                  fontSize: '15px',
                  '&:hover': {
                    backgroundColor: '#003b5c',
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>

          {/* Footer Info */}
          <Box
            sx={{
              backgroundColor: isDark ? '#151515' : '#f8fafc',
              borderTop: `1px solid ${borderCol}`,
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: textMuted, fontWeight: 500 }}>
              Device ID: POS-TML-8924 • v1.0.4
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  )
}
