// ─── PosDocumentValidator — Domain Validation ────────────────────────────────
// Centraliza las reglas de negocio para la validación de documentos POS.

export interface PosDocumentValidationData {
  companyId: number;
  documentTypeCode: string;
  lines: any[];
}

export class PosDocumentValidator {
  /**
   * Valida la integridad de los datos de un documento POS.
   * Lanza un Error si alguna regla de negocio no se cumple.
   */
  static validate(data: PosDocumentValidationData): void {
    if (data.companyId <= 0) {
      throw new Error('El documento debe tener una empresa activa');
    }

    if (!data.lines || data.lines.length === 0) {
      throw new Error('El documento debe tener al menos una línea');
    }

    const validTypes = ['TKT', 'INV'];
    if (!validTypes.includes(data.documentTypeCode)) {
      throw new Error('El documento debe tener un tipo de documento válido (TKT o INV)');
    }
  }
}
