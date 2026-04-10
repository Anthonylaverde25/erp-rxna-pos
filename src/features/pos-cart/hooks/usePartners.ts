import { useState, useCallback } from 'react';
import { container } from '@/di/container';
import { TYPES } from '@/di/types';
import type { IPartnerRepository } from '../domain/repositories/IPartnerRepository';
import { PosPartner } from '@/domain/entities/partners/PartnerEntity';

export function usePartners() {
  const repository = container.get<IPartnerRepository>(TYPES.IPartnerRepository);
  const [partners, setPartners] = useState<PosPartner[]>([]);
  const [loading, setLoading] = useState(false);

  const searchPartners = useCallback(async (query: string) => {
    if (query.length < 2) {
      setPartners([]);
      return;
    }
    
    setLoading(true);
    try {
      const results = await repository.search(query, 'customer');
      setPartners(results);
    } catch (error) {
      console.error('Error searching partners:', error);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  }, [repository]);

  return {
    partners,
    loading,
    searchPartners
  };
}
