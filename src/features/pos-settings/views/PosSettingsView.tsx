import type { ReactNode } from 'react'
import { Avatar, Box, Chip, Divider, Typography } from '@mui/material'
import {
  Building2,
  CheckCircle2,
  Layers3,
  Lock,
  MonitorSmartphone,
  User,
  Users,
} from 'lucide-react'
import { useAuthStore } from '@/features/pos-auth/store/useAuthStore'
import { useTheme } from '@/providers/ThemeProvider'

const READ_ONLY_POS_CONTEXT = [
  { label: 'Serie sugerida', value: 'B001', hint: 'Editable en el header para pruebas de UX' },
  { label: 'Terminal', value: 'T-102', hint: 'Asignada al puesto principal' },
  { label: 'Caja', value: 'Caja 01', hint: 'Contexto operativo de la sesion' },
  { label: 'Lista de precios', value: 'General', hint: 'Heredada desde la empresa activa' },
]

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  const { isDark } = useTheme()

  return (
    <Box
      sx={{
        borderRadius: '4px',
        border: `1px solid ${isDark ? '#2a2a2a' : '#d9e0e7'}`,
        bgcolor: isDark ? '#171717' : '#ffffff',
        overflow: 'hidden',
        boxShadow: isDark ? '0 18px 40px rgba(0,0,0,0.28)' : '0 18px 40px rgba(15,23,42,0.06)',
      }}
    >
      <Box sx={{ px: 3, py: 2.25, bgcolor: isDark ? '#111827' : '#f8fafc' }}>
        <Typography sx={{ fontWeight: 900, fontSize: '0.95rem', color: isDark ? '#f8fafc' : '#0f172a' }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 700, letterSpacing: '0.03em' }}>
          {subtitle}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: isDark ? '#2a2a2a' : '#e2e8f0' }} />
      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  )
}

function KVRow({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  const { isDark } = useTheme()

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, py: 1.25 }}>
      <Box>
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: isDark ? '#94a3b8' : '#64748b' }}>
          {label}
        </Typography>
        {hint ? (
          <Typography sx={{ mt: 0.4, fontSize: '0.77rem', color: isDark ? '#7c8aa0' : '#94a3b8', fontWeight: 600 }}>
            {hint}
          </Typography>
        ) : null}
      </Box>
      <Typography sx={{ fontSize: '0.9rem', fontWeight: 900, color: isDark ? '#f8fafc' : '#0f172a', textAlign: 'right' }}>
        {value}
      </Typography>
    </Box>
  )
}

export function PosSettingsView() {
  const { isDark } = useTheme()
  const user = useAuthStore((state) => state.user)
  const companies = user?.companies || []
  const activeCompany = companies.find((company) => company.id === user?.active_company_id) || companies[0] || null

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', pr: 0.5 }}>
      <Box
        sx={{
          borderRadius: '4px',
          border: `1px solid ${isDark ? '#2a2a2a' : '#d9e0e7'}`,
          bgcolor: isDark ? '#101418' : '#ffffff',
          overflow: 'hidden',
          boxShadow: isDark ? '0 24px 50px rgba(0,0,0,0.32)' : '0 24px 50px rgba(15,23,42,0.08)',
        }}
      >
        <Box
          sx={{
            px: 4,
            py: 3,
            background: isDark
              ? 'linear-gradient(135deg, #003b5c 0%, #0f172a 100%)'
              : 'linear-gradient(135deg, #005483 0%, #dbeafe 100%)',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 3, flexWrap: 'wrap' }}>
            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: '1.35rem', letterSpacing: '-0.03em' }}>
                Configuracion de sesion POS
              </Typography>
              <Typography sx={{ mt: 0.75, maxWidth: 760, fontSize: '0.84rem', opacity: 0.88, fontWeight: 600, lineHeight: 1.5 }}>
                Vista dedicada para exponer el contexto heredado desde el ERP. Por ahora es solo lectura:
                empresa activa, operador autenticado, empresas disponibles y parametros operativos visibles para validacion de UX.
              </Typography>
            </Box>
            <Chip
              icon={<Lock size={14} />}
              label="Solo lectura"
              sx={{
                bgcolor: 'rgba(255,255,255,0.14)',
                color: 'white',
                fontWeight: 800,
                borderRadius: '4px',
                '& .MuiChip-icon': { color: 'white' },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ p: 3.5, display: 'grid', gap: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: '1.35fr 0.95fr' }, gap: 3 }}>
            <SectionCard
              title="Contexto de empresa activa"
              subtitle="Este bloque deberia venir amarrado al launch context ERP -> POS"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.25 }}>
                <Avatar
                  sx={{
                    width: 54,
                    height: 54,
                    bgcolor: isDark ? '#0f3e63' : '#dbeafe',
                    color: isDark ? '#7dd3fc' : '#005483',
                    borderRadius: '6px',
                  }}
                >
                  <Building2 size={26} />
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', color: isDark ? '#f8fafc' : '#0f172a' }}>
                    {activeCompany?.name || 'Empresa no disponible'}
                  </Typography>
                  <Typography sx={{ mt: 0.4, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: isDark ? '#94a3b8' : '#64748b' }}>
                    Company ID {user?.active_company_id ?? 'N/A'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2.5, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, columnGap: 3 }}>
                <KVRow label="Origen del contexto" value="ERP Launch" hint="La empresa llega definida antes de entrar al POS" />
                <KVRow label="Empresas accesibles" value={String(companies.length)} hint="Tomadas desde user.companies" />
                <KVRow label="Cambio directo en POS" value="Restringido" hint="Recomendado como accion controlada" />
                <KVRow label="Resolucion esperada" value="Sesion unica por empresa" hint="Evita contaminar carrito, correlativos y stock" />
              </Box>
            </SectionCard>

            <SectionCard
              title="Operador autenticado"
              subtitle="Resumen compacto de la sesion actual"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    width: 46,
                    height: 46,
                    bgcolor: isDark ? '#0f3e63' : '#dbeafe',
                    color: isDark ? '#7dd3fc' : '#005483',
                    borderRadius: '6px',
                  }}
                >
                  <User size={22} />
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ fontWeight: 900, fontSize: '1rem', color: isDark ? '#f8fafc' : '#0f172a' }}>
                    {user?.full_name || 'Sin sesion'}
                  </Typography>
                  <Typography sx={{ mt: 0.35, fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 700 }}>
                    {user?.email || 'No disponible'}
                  </Typography>
                  <Box sx={{ mt: 1.2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={user?.role || 'Sin rol'}
                      sx={{
                        bgcolor: isDark ? '#111827' : '#f8fafc',
                        color: isDark ? '#cbd5e1' : '#334155',
                        fontWeight: 800,
                        borderRadius: '4px',
                      }}
                    />
                    <Chip
                      label={user?.status?.label || 'Desconocido'}
                      sx={{
                        bgcolor: isDark ? '#0f1f2e' : '#eff6ff',
                        color: isDark ? '#7dd3fc' : '#005483',
                        fontWeight: 800,
                        borderRadius: '4px',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </SectionCard>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: '1fr 1fr' }, gap: 3 }}>
            <SectionCard
              title="Empresas del usuario"
              subtitle="Inventario visual de user.companies para discutir la futura UX multiempresa"
            >
              <Box sx={{ display: 'grid', gap: 1.25 }}>
                {companies.length ? (
                  companies.map((company) => {
                    const isActive = company.id === user?.active_company_id

                    return (
                      <Box
                        key={company.id}
                        sx={{
                          border: `1px solid ${isActive ? '#005483' : isDark ? '#2a2a2a' : '#d9e0e7'}`,
                          bgcolor: isActive ? (isDark ? '#0f1f2e' : '#eff6ff') : (isDark ? '#171717' : '#ffffff'),
                          borderRadius: '4px',
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 2,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            sx={{
                              width: 38,
                              height: 38,
                              bgcolor: isActive ? '#005483' : isDark ? '#111827' : '#f1f5f9',
                              color: isActive ? '#fff' : isDark ? '#cbd5e1' : '#334155',
                              borderRadius: '4px',
                            }}
                          >
                            <Layers3 size={18} />
                          </Avatar>
                          <Box>
                            <Typography sx={{ fontSize: '0.92rem', fontWeight: 900, color: isDark ? '#f8fafc' : '#0f172a' }}>
                              {company.name}
                            </Typography>
                            <Typography sx={{ mt: 0.35, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: isDark ? '#94a3b8' : '#64748b' }}>
                              Empresa #{company.id}
                            </Typography>
                          </Box>
                        </Box>
                        {isActive ? (
                          <Chip
                            icon={<CheckCircle2 size={14} />}
                            label="Activa"
                            sx={{
                              bgcolor: '#005483',
                              color: 'white',
                              fontWeight: 800,
                              borderRadius: '4px',
                              '& .MuiChip-icon': { color: 'white' },
                            }}
                          />
                        ) : (
                          <Chip
                            label="Disponible"
                            sx={{
                              bgcolor: isDark ? '#111827' : '#f8fafc',
                              color: isDark ? '#cbd5e1' : '#475569',
                              fontWeight: 800,
                              borderRadius: '4px',
                            }}
                          />
                        )}
                      </Box>
                    )
                  })
                ) : (
                  <Box
                    sx={{
                      borderRadius: '4px',
                      border: `1px dashed ${isDark ? '#334155' : '#cbd5e1'}`,
                      p: 3,
                      textAlign: 'center',
                    }}
                  >
                    <Typography sx={{ fontWeight: 800, color: isDark ? '#e2e8f0' : '#334155' }}>
                      No hay empresas cargadas en la sesion
                    </Typography>
                    <Typography sx={{ mt: 0.75, fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 600 }}>
                      Cuando llegue el payload final podremos decidir aqui el patron de cambio multiempresa.
                    </Typography>
                  </Box>
                )}
              </Box>
            </SectionCard>

            <SectionCard
              title="Contexto operativo visible"
              subtitle="Datos de referencia para el trabajo de diseno"
            >
              <Box sx={{ display: 'grid', gap: 0.25 }}>
                {READ_ONLY_POS_CONTEXT.map((item) => (
                  <KVRow
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    hint={item.hint}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 2, borderColor: isDark ? '#2a2a2a' : '#e2e8f0' }} />

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.25 }}>
                {[
                  { icon: <User size={18} />, title: 'Usuario', value: user?.siglas || 'ADM' },
                  { icon: <Users size={18} />, title: 'Scope', value: `${companies.length || 0} empresas` },
                  { icon: <MonitorSmartphone size={18} />, title: 'Puesto', value: 'Front Register' },
                ].map((item) => (
                  <Box
                    key={item.title}
                    sx={{
                      borderRadius: '4px',
                      border: `1px solid ${isDark ? '#2a2a2a' : '#d9e0e7'}`,
                      bgcolor: isDark ? '#111827' : '#f8fafc',
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: isDark ? '#7dd3fc' : '#005483' }}>
                      {item.icon}
                      <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography sx={{ mt: 1.15, fontWeight: 900, fontSize: '0.92rem', color: isDark ? '#f8fafc' : '#0f172a' }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </SectionCard>
          </Box>

        </Box>
      </Box>
    </Box>
  )
}
