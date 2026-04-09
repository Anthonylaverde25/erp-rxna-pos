import type { SxProps, Theme } from '@mui/material';

export const receiptStyles = {
  paper: {
    width: '380px',
    bgcolor: 'white',
    color: '#000',
    p: 4,
    fontFamily: "'Courier New', Courier, monospace",
    borderRadius: '0',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #f0f0f0 5px, #f0f0f0 10px)',
    },
    '@media print': {
      boxShadow: 'none',
      p: 1,
      width: '100%',
    }
  } as SxProps<Theme>,
  
  divider: {
    borderStyle: 'dashed',
    my: 1.5,
    borderColor: '#000'
  } as SxProps<Theme>,
  
  headerTitle: {
    fontWeight: 900,
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    mb: 0.5
  } as SxProps<Theme>,
  
  textSmall: {
    fontSize: '0.75rem',
    fontWeight: 700
  } as SxProps<Theme>,
  
  textExtraSmall: {
    fontSize: '0.7rem'
  } as SxProps<Theme>,
  
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem'
  } as SxProps<Theme>,
  
  grandTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 1,
    '& .MuiTypography-root': {
      fontWeight: 900,
      fontSize: '1.1rem'
    }
  } as SxProps<Theme>
};
