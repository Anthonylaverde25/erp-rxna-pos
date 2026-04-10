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
