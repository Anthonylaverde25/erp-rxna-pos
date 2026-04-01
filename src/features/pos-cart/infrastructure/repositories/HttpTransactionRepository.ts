import { injectable, inject } from 'inversify';
import type { ITransactionRepository, CheckoutPayload } from '../../domain/repositories/ITransactionRepository';
import type { AxiosInstance } from 'axios';
import { TYPES } from '@/di/types';

@injectable()
export class HttpTransactionRepository implements ITransactionRepository {
  constructor(
    @inject(TYPES.HttpClient) private httpClient: AxiosInstance
  ) {}

  async checkout(data: CheckoutPayload): Promise<any> {
    const response = await this.httpClient.post('/pos/checkout', data);
    return response.data;
  }
}
