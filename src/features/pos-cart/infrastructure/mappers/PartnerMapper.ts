import { PosPartner } from '@/domain/entities/partners/PartnerEntity';

export class PartnerMapper {
  static toDomain(raw: any): PosPartner {
    return new PosPartner(
      raw.id,
      raw.name,
      raw.vat_number || raw.cif || null,
      raw.email || null,
      raw.comercial_name || null
    );
  }

  static toCollection(rawList: any[]): PosPartner[] {
    return Array.isArray(rawList) ? rawList.map(item => this.toDomain(item)) : [];
  }
}
