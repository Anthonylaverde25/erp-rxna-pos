import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Autocomplete,
  TextField,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material'
import { User, Search } from 'lucide-react'
import { usePartners } from '../hooks/usePartners'
import type { PosPartner } from '@/domain/entities/partners/PartnerEntity'

interface SelectPartnerModalProps {
  open: boolean
  onClose: () => void
  onSelect: (partner: PosPartner) => void
}

export function SelectPartnerModal({ open, onClose, onSelect }: SelectPartnerModalProps) {
  const [inputValue, setInputValue] = useState('')
  const { partners, isLoading, searchPartners } = usePartners()

  // Buscar cuando cambia el input y tiene al menos 2 caracteres
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.length >= 2) {
        searchPartners(inputValue)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [inputValue, searchPartners])

  const handleSelect = (_: any, value: PosPartner | null) => {
    if (value) {
      onSelect(value)
      onClose()
      setInputValue('')
    }
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: '4px' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <User size={20} color="#005483" />
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#005483' }}>
          Seleccionar Cliente
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          Busque un cliente por nombre, CIF o email para asociarlo a esta venta.
        </Typography>

        <Autocomplete
          openOnFocus
          options={partners}
          getOptionLabel={(option) => option.displayName}
          filterOptions={(x) => x} // La búsqueda es del lado del servidor
          loading={isLoading}
          onInputChange={(_, value, reason) => {
            if (reason === 'input') setInputValue(value)
          }}
          onChange={handleSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar Cliente"
              variant="filled"
              placeholder="Escriba nombre o CIF..."
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <Box sx={{ ml: 1, mr: 0.5, display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <Search size={18} />
                  </Box>
                ),
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              sx={{
                '& .MuiFilledInput-root': {
                  borderRadius: '4px',
                  backgroundColor: 'rgba(0, 84, 131, 0.04)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 84, 131, 0.08)',
                  },
                }
              }}
            />
          )}
          noOptionsText={inputValue.length < 2 ? "Escriba al menos 2 caracteres..." : "No se encontraron clientes"}
          renderOption={(props, option) => {
            const { key, ...rest } = props as any;
            return (
              <li key={key} {...rest}>
                <Box sx={{ py: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {option.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.vatNumber || 'Sin identificación'} • {option.email || 'Sin email'}
                  </Typography>
                </Box>
              </li>
            );
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary', fontWeight: 600 }}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
