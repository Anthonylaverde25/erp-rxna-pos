import { injectable, inject } from 'inversify';
import type { ITransactionRepository, CheckoutPayload } from '../../domain/repositories/ITransactionRepository';
import { PosDocumentEntity } from '@/domain/entities/documents/PosDocumentEntity';
import { DocumentMapper } from '../mappers/DocumentMapper';
import type { AxiosInstance } from 'axios';
import { TYPES } from '@/di/types';

@injectable()
export class HttpTransactionRepository implements ITransactionRepository {
  constructor(
    @inject(TYPES.HttpClient) private httpClient: AxiosInstance
  ) {}

  async checkout(data: CheckoutPayload): Promise<PosDocumentEntity> {
    const response = await this.httpClient.post('/pos/checkout', data);
    // Extraemos la información relevante de response.data.data según el estándar JSON Resource de Laravel
    return DocumentMapper.toDomain(response.data.data);
  }

  async convert(documentId: number, partnerId: number, seriesId: number): Promise<PosDocumentEntity> {
    const response = await this.httpClient.post(`/documents/${documentId}/convert`, {
      partner_id: partnerId,
      number_series_id: seriesId,
      status_key: 'issued', // Las facturas del POS suelen nacer ya emitidas
    });
    return DocumentMapper.toDomain(response.data.data);
  }
}
