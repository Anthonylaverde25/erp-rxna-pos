// ─── PartnerEntity — Domain Entity ──────────────────────────────────────────
// Entidad simplificada para manejar clientes en el POS.
// ────────────────────────────────────────────────────────────────────────────

export interface PartnerEntity {
  id: number;
  name: string;
  comercialName?: string;
  vatNumber?: string; // NIF/CIF
  email?: string;
}

/**
 * Representa un socio comercial (Cliente) en el ecosistema del POS.
 */
export class PosPartner {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly vatNumber: string | null = null,
    public readonly email: string | null = null,
    public readonly comercialName: string | null = null,
  ) {}

  /**
   * Nombre amigable para mostrar en autocompletados
   */
  get displayName(): string {
    const identification = this.vatNumber ? ` (${this.vatNumber})` : '';
    return `${this.name}${identification}`;
  }
}
