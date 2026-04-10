import { injectable, inject } from 'inversify';
import type { AxiosInstance } from 'axios';
import { TYPES } from '@/di/types';
import type { IPartnerRepository } from '../../domain/repositories/IPartnerRepository';
import { PosPartner } from '@/domain/entities/partners/PartnerEntity';
import { PartnerMapper } from '../mappers/PartnerMapper';

@injectable()
export class HttpPartnerRepository implements IPartnerRepository {
  constructor(
    @inject(TYPES.HttpClient) private httpClient: AxiosInstance
  ) {}

  async search(query: string, type: string = 'customer'): Promise<PosPartner[]> {
    const response = await this.httpClient.get('/partners', {
      params: { q: query, type }
    });
    
    // La API devuelve una colección envuelta en 'partners' directamente
    const rawData = response.data.partners || [];
    return PartnerMapper.toCollection(rawData);
  }

  async getById(id: number): Promise<PosPartner | null> {
    const response = await this.httpClient.get(`/partners/${id}`);
    const rawData = response.data.partner;
    return rawData ? PartnerMapper.toDomain(rawData) : null;
  }
}
