/**
 * Hook customizado para gerenciar categorias com React Query
 */

import { useQuery } from '@tanstack/react-query';
import { getAllCategorias, getCategoriaBySlug } from '@/lib/supabase/services/categorias';

/**
 * Hook para buscar todas as categorias
 */
export function useCategorias() {
  return useQuery({
    queryKey: ['categorias'],
    queryFn: getAllCategorias,
    staleTime: 1000 * 60 * 10, // 10 minutos (categorias mudam pouco)
  });
}

/**
 * Hook para buscar categoria por slug
 */
export function useCategoriaBySlug(slug: string) {
  return useQuery({
    queryKey: ['categoria', slug],
    queryFn: () => getCategoriaBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
  });
}

