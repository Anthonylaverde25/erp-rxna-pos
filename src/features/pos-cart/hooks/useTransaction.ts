import { useState, useCallback, useMemo } from 'react';
import { container } from '@/di/container';
import { TYPES } from '@/di/types';
import type { ITransactionRepository } from '../domain/repositories/ITransactionRepository';
import type { PosDocumentEntity } from '@/domain/entities/documents/PosDocumentEntity';

export function useTransaction() {
  const repository = useMemo(() => container.get<ITransactionRepository>(TYPES.ITransactionRepository), []);
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState<PosDocumentEntity | null>(null);

  const getTransactionById = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const result = await repository.getById(id);
      setDocument(result);
      return result;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [repository]);

  return {
    document,
    loading,
    getTransactionById
  };
}
