import { PosPartner } from '@/domain/entities/partners/PartnerEntity';

export interface IPartnerRepository {
  /**
   * Busca partners activos en la empresa actual.
   * @param query Texto de búsqueda (nombre, NIF, comercial).
   * @param type Filtro opcional por rol (ej: 'customer').
   */
  search(query: string, type?: string): Promise<PosPartner[]>;

  /**
   * Obtiene un partner por su ID.
   */
  getById(id: number): Promise<PosPartner | null>;
}
