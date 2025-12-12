/**
 * Hooks para gerenciar candidaturas
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllCandidaturas,
  getCandidaturaById,
  updateCandidaturaStatus,
  deleteCandidatura,
  type CandidaturasQueryParams,
  type Candidatura,
} from '@/lib/supabase/services/candidaturas';

/**
 * Hook para buscar todas as candidaturas
 */
export function useCandidaturas(params: CandidaturasQueryParams = {}) {
  return useQuery({
    queryKey: ['candidaturas', params],
    queryFn: () => getAllCandidaturas(params),
  });
}

/**
 * Hook para buscar uma candidatura por ID
 */
export function useCandidatura(id: string) {
  return useQuery({
    queryKey: ['candidatura', id],
    queryFn: () => getCandidaturaById(id),
    enabled: !!id,
  });
}

/**
 * Hook para atualizar status da candidatura
 */
export function useUpdateCandidaturaStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      observacoes,
    }: {
      id: string;
      status: Candidatura['status'];
      observacoes?: string;
    }) => updateCandidaturaStatus(id, status, observacoes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidaturas'] });
    },
  });
}

/**
 * Hook para deletar candidatura
 */
export function useDeleteCandidatura() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCandidatura(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidaturas'] });
    },
  });
}



