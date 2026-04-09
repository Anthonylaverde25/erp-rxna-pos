import type { NumberSeries } from '../entities/NumberSeries';

export interface INumberSeriesRepository {
  getAll(documentTypeCode?: string): Promise<NumberSeries[]>;
}
