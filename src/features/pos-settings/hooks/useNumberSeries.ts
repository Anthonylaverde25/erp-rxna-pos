import { useQuery } from '@tanstack/react-query';
import { container } from '@/di/container';
import { TYPES } from '@/di/types';
import type { INumberSeriesRepository } from '../domain/repositories/INumberSeriesRepository';

export function useNumberSeries(documentTypeCode?: string) {
  const repository = container.get<INumberSeriesRepository>(TYPES.INumberSeriesRepository);

  return useQuery({
    queryKey: ['number-series', documentTypeCode],
    queryFn: () => repository.getAll(documentTypeCode),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
