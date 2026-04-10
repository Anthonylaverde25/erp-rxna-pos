import { PosDocumentValidator } from '../../validations/PosDocumentValidator';

// ─── PosDocumentEntity — Domain Entity ───────────────────────────────────────
// Esta es la versión liviana (Read-Only) adaptada específicamente para el ecosistema POS.
// Se enfoca en los campos críticos para la facturación rápida y los tickets.

export interface DocumentLineEntity {
  id: number;
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  lineTotal: number;
}

export class PosDocumentEntity {
  constructor(
    public readonly id: number,
    public readonly companyId: number,
    public readonly documentTypeCode: string,
    public readonly numberSerie: string,
    public readonly issueDate: string,
    public readonly status: string,
    public readonly subtotal: number,
    public readonly taxTotal: number,
    public readonly total: number,
    public readonly lines: DocumentLineEntity[],
  ) {
    // 🛡️ Ejecutar validaciones centralizadas antes de la asignación técnica
    PosDocumentValidator.validate({
      companyId: this.companyId,
      documentTypeCode: this.documentTypeCode,
      lines: this.lines,
    });
  }




  /**
   * Helper para determinar si el documento es oficialmente un Ticket
   */
  public isTicket(): boolean {
    return this.documentTypeCode === 'TKT';
  }

  /**
   * Helper para determinar si el documento es una Factura
   */
  public isInvoice(): boolean {
    return this.documentTypeCode === 'INV';
  }
}
