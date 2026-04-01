import { Container } from 'inversify';
import { TYPES } from '../types';
import type { ICatalogRepository } from '@/features/pos-catalog/domain/repositories/ICatalogRepository';
import { HttpCatalogRepository } from '@/features/pos-catalog/infrastructure/repositories/HttpCatalogRepository';
import { posAxios } from '@/infrastructure/http/posAxios';

export const registerCatalogModule = (container: Container) => {
  // Registramos la instancia de axios como un valor constante
  container.bind(TYPES.HttpClient).toConstantValue(posAxios);
  
  // Registramos el repositorio
  container.bind<ICatalogRepository>(TYPES.ICatalogRepository).to(HttpCatalogRepository);
};
