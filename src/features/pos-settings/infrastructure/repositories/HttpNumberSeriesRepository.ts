import { injectable, inject } from 'inversify';
import type { AxiosInstance } from 'axios';
import { TYPES } from '@/di/types';
import type { INumberSeriesRepository } from '../../domain/repositories/INumberSeriesRepository';
import type { NumberSeries } from '../../domain/entities/NumberSeries';

@injectable()
export class HttpNumberSeriesRepository implements INumberSeriesRepository {
  constructor(
    @inject(TYPES.HttpClient) private httpClient: AxiosInstance
  ) {}

  async getAll(documentTypeCode?: string): Promise<NumberSeries[]> {
    // Note: The backend returns an object with a 'number_series' key due to 'public static $wrap = "number_series"' in NumberSeriesCollection
    const response = await this.httpClient.get<{ number_series: any[] }>('/number-series', {
      params: documentTypeCode ? { document_type_code: documentTypeCode } : undefined
    });
    
    // Fallback if not wrapped or empty
    const data = response.data.number_series || (response.data as any).data || [];

    return data.map((item: any) => ({
      id: item.id,
      companyId: item.company_id,
      documentTypeId: item.document_type_id,
      serie: item.serie,
      year: item.year,
      currentNumber: item.current_number,
      terms: item.terms,
      documentType: item.document_type ? {
        id: item.document_type.id,
        name: item.document_type.name,
        code: item.document_type.code,
        description: item.document_type.description,
        module: item.document_type.module,
      } : undefined
    }));
  }
}
