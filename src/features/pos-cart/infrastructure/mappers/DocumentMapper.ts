import { PosDocumentEntity } from '../../../../domain/entities/documents/PosDocumentEntity';
import type { DocumentLineEntity } from '../../../../domain/entities/documents/PosDocumentEntity';

/**
 * Mapeador de la capa de Infraestructura.
 * Transforma el JSON crudo (DTO de la API) en la Entidad Read-Only del Dominio del POS.
 */
export class DocumentMapper {
  static toDomain(data: any): PosDocumentEntity {
    // Mapeo seguro de las líneas
    const lines: DocumentLineEntity[] = Array.isArray(data.lines)
      ? data.lines.map((line: any) => ({
          id: line.id,
          productId: line.product_id,
          name: line.name || 'Producto General',
          quantity: Number(line.quantity) || 0,
          unitPrice: Number(line.unit_price) || 0,
          discountPercent: Number(line.discount_percent) || 0,
          lineTotal: Number(line.line_total) || 0,
        }))
      : [];

    return new PosDocumentEntity(
      data.id,
      data.company_id,
      data.document_type_code,
      data.number_serie || 'NO-REF',
      data.issue_date || new Date().toISOString().split('T')[0],
      data.status || 'DRAFT',
      Number(data.subtotal) || 0,
      Number(data.tax_total) || 0,
      Number(data.total) || 0,
      lines,
      data.partner_snapshot || data.partner ? {
        name: data.partner_snapshot?.name || data.partner?.name,
        vat_number: data.partner_snapshot?.vat_number || data.partner?.vat_number,
        cif: data.partner_snapshot?.cif || data.partner?.cif,
        email: data.partner_snapshot?.email || data.partner?.email
      } : undefined
    );
  }
}
