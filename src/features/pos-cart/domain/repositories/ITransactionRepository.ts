import type { PosDocumentEntity } from '@/domain/entities/documents/PosDocumentEntity';

export interface ITransactionRepository {
  checkout(data: CheckoutPayload): Promise<PosDocumentEntity>;
  convert(documentId: number, partnerId: number, seriesId: number): Promise<PosDocumentEntity>;
}

export interface CheckoutPayload {
  items: CheckoutItem[];
  payment_method_id: number;
  partner_id?: number;
  notes?: string;
  number_series_id?: number;
  document_type_code?: string;
}

export interface CheckoutItem {
  item_id: number;
  quantity: number;
  unit_price: number;
  discount_percent: number;
}
