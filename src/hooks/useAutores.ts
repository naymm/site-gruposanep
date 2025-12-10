/**
 * Hook customizado para gerenciar autores com React Query
 */

import { useQuery } from '@tanstack/react-query';
import { getAllAutores } from '@/lib/supabase/services/autores';

/**
 * Hook para buscar todos os autores
 */
export function useAutores() {
  return useQuery({
    queryKey: ['autores'],
    queryFn: getAllAutores,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
}





