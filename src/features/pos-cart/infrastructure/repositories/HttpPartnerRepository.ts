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

  async create(data: {
    name: string;
    vatNumber?: string;
    email?: string;
    phone?: string;
    address?: string;
  }): Promise<PosPartner> {
    const response = await this.httpClient.post('/partners', {
      name: data.name,
      vat_number: data.vatNumber,
      role: 'client',
      roles: ['client'],
      type: 'person',
      contact: (data.email || data.phone) ? [
        {
          email: data.email || null,
          phone: data.phone || null,
          default: true
        }
      ] : [],
      address: data.address ? [
        {
          street: data.address,
          default: true
        }
      ] : []
    });

    const rawData = response.data.partner;
    if (!rawData) {
      throw new Error('Error al registrar el socio comercial en el servidor.');
    }
    return PartnerMapper.toDomain(rawData);
  }
}
