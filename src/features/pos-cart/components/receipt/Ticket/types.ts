export interface ReceiptLine {
  name: string;
  unit_price: number;
  quantity: number;
  discount_percent: number;
  line_total: number;
}

export interface ReceiptData {
  id: number;
  number_serie: string;
  issue_date: string;
  subtotal: number;
  tax_total: number;
  total: number;
  lines: ReceiptLine[];
}

export interface PaymentInfo {
  methodName: string;
  tenderedAmount: number;
  change: number;
}

export interface CompanyInfo {
  name: string;
  cif?: string;
  phone?: string;
  address?: string;
}
