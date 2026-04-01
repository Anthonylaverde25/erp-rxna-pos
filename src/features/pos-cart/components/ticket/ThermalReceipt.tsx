import React, { forwardRef } from 'react'
import type { CartItem } from '@/types/pos.types'

export interface ReceiptData {
  cart: CartItem[]
  subtotal: number
  tax: number
  total: number
  tenderedAmount: number
  change: number
  methodId: number
  methodName: string
  date: Date
  ticketNumber: string
}

export interface ThermalReceiptProps {
  data: ReceiptData
  companyName?: string
  companyNif?: string
  companyAddress?: string
  companyPhone?: string
}

export const ThermalReceipt = forwardRef<HTMLDivElement, ThermalReceiptProps>(
  ({ data, companyName = 'MI EMPRESA ERP', companyNif = 'A-12345678', companyAddress = 'Calle Principal 123', companyPhone = '+34 900 123 456' }, ref) => {
    
    const fmt = (n: number) =>
      new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)

    return (
      <div 
        ref={ref} 
        // Estilos base para visualización y para media print
        // w-[80mm] es el ancho estandar de un ticket térmico ancho.
        className="w-[80mm] max-w-full bg-white text-black p-4 font-mono text-sm leading-tight mx-auto print:m-0 print:p-0 print:w-full print:shadow-none"
        style={{ color: 'black', background: 'white' }}
      >
        <style>
          {`
            @media print {
              @page {
                margin: 0;
                size: 80mm auto; /* Ajuste para impresora térmica */
              }
              body {
                margin: 0 !important;
                padding: 0 !important;
                background: white;
              }
            }
          `}
        </style>

        {/* ── Header Empresa ── */}
        <div className="text-center mb-4">
          <div className="font-bold text-lg uppercase">{companyName}</div>
          <div>{companyAddress}</div>
          <div>TELF: {companyPhone}</div>
          <div>NIF: {companyNif}</div>
        </div>

        {/* ── Info Ticket ── */}
        <div className="border-t border-dashed border-black pt-2 pb-2 mb-2">
          <div className="text-center font-bold mb-1 uppercase">Factura Simplificada</div>
          <div className="flex justify-between">
            <span>Ticket:</span>
            <span>{data.ticketNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Fecha:</span>
            <span>
              {data.date.toLocaleDateString('es-ES')} {data.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Cajero:</span>
            <span>CAJA 1</span>
          </div>
        </div>

        {/* ── Tabla Items ── */}
        <div className="border-t border-b border-dashed border-black py-2 mb-2">
          <div className="flex font-bold text-xs">
            <div className="w-8 text-left">CANT</div>
            <div className="flex-1 text-left">DESCRIPCION</div>
            <div className="w-[50px] text-right">IMPORTE</div>
          </div>
          <div className="mt-1">
            {data.cart.map((item) => (
              <div key={item.id} className="flex text-xs mb-1">
                <div className="w-8 text-left">{item.quantity}</div>
                <div className="flex-1 text-left truncate uppercase">
                  {item.name}
                </div>
                <div className="w-[50px] text-right">
                  {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Totales ── */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>BASE IMPONIBLE</span>
            <span>{fmt(data.subtotal)}</span>
          </div>
          <div className="flex justify-between text-xs mb-1">
            <span>IMPUESTOS (IVA)</span>
            <span>{fmt(data.tax)}</span>
          </div>
          
          <div className="flex justify-between text-base font-bold my-2 pt-1 border-t border-black">
            <span>TOTAL</span>
            <span>{fmt(data.total)}</span>
          </div>

          <div className="flex justify-between text-xs mt-2">
            <span>MÉTODO PAGO:</span>
            <span className="uppercase">{data.methodName}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>ENTREGADO:</span>
            <span>{data.methodId === 1 ? fmt(data.tenderedAmount) : fmt(data.total)}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>CAMBIO:</span>
            <span>{data.methodId === 1 ? fmt(data.change) : '0,00 €'}</span>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="text-center text-xs mt-6 border-t border-dashed border-black pt-4">
          <div>Ref: {data.ticketNumber}</div>
          <div className="mt-2 font-bold uppercase">*** GRACIAS POR SU VISITA ***</div>
        </div>
      </div>
    )
  }
)

ThermalReceipt.displayName = 'ThermalReceipt'
