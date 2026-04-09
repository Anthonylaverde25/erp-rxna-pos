export interface DocumentType {
  id: number;
  name: string;
  code: string;
  description: string | null;
  module: string;
}

export interface NumberSeries {
  id: number;
  companyId: number;
  documentTypeId: number;
  serie: string;
  year: number;
  currentNumber: number;
  terms: string | null;
  documentType?: DocumentType;
}
