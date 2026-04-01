import { Container } from 'inversify';
import { TYPES } from '../types';
import type { ITransactionRepository } from '@/features/pos-cart/domain/repositories/ITransactionRepository';
import { HttpTransactionRepository } from '@/features/pos-cart/infrastructure/repositories/HttpTransactionRepository';

export const registerCartModule = (container: Container) => {
  container.bind<ITransactionRepository>(TYPES.ITransactionRepository).to(HttpTransactionRepository);
};
