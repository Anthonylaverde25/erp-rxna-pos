/**
 * Formato de moneda para el recibo (estándar es-ES)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Formato de hora corta
 */
export const formatTime = (date: Date = new Date()): string => {
  return date.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};
