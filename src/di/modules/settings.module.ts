import { Container } from 'inversify';
import { TYPES } from '../types';
import type { INumberSeriesRepository } from '@/features/pos-settings/domain/repositories/INumberSeriesRepository';
import { HttpNumberSeriesRepository } from '@/features/pos-settings/infrastructure/repositories/HttpNumberSeriesRepository';

export const registerSettingsModule = (container: Container) => {
  container.bind<INumberSeriesRepository>(TYPES.INumberSeriesRepository).to(HttpNumberSeriesRepository);
};
