export interface ITransactionRepository {
  checkout(data: CheckoutPayload): Promise<any>;
}

export interface CheckoutPayload {
  items: CheckoutItem[];
  payment_method_id: number;
  notes?: string;
}

export interface CheckoutItem {
  item_id: number;
  quantity: number;
  unit_price: number;
  discount_percent: number;
}
