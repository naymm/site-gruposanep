/**
 * Hook customizado para gerenciar notícias com React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllNoticias,
  getNoticiaBySlug,
  getNoticiasDestaque,
  getNoticiasRecentes,
  incrementarVisualizacoes,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} from '@/lib/supabase/services/noticias';
import type {
  NoticiasQueryParams,
  CreateNoticiaInput,
  UpdateNoticiaInput,
} from '@/types/noticias';

/**
 * Hook para buscar todas as notícias
 */
export function useNoticias(params: NoticiasQueryParams = {}) {
  return useQuery({
    queryKey: ['noticias', params],
    queryFn: () => getAllNoticias(params),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

/**
 * Hook para buscar notícia por slug
 */
export function useNoticiaBySlug(slug: string) {
  return useQuery({
    queryKey: ['noticia', slug],
    queryFn: () => getNoticiaBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook para buscar notícias em destaque
 */
export function useNoticiasDestaque(limit: number = 3) {
  return useQuery({
    queryKey: ['noticias-destaque', limit],
    queryFn: () => getNoticiasDestaque(limit),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook para buscar notícias recentes
 */
export function useNoticiasRecentes(limit: number = 6) {
  return useQuery({
    queryKey: ['noticias-recentes', limit],
    queryFn: () => getNoticiasRecentes(limit),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook para incrementar visualizações
 */
export function useIncrementarVisualizacoes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: incrementarVisualizacoes,
    onSuccess: (_, noticiaId) => {
      // Invalidar cache da notícia específica
      queryClient.invalidateQueries({ queryKey: ['noticia'] });
    },
  });
}

/**
 * Hook para criar notícia (admin)
 */
export function useCreateNoticia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNoticia,
    onSuccess: () => {
      // Invalidar todas as queries de notícias
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
      queryClient.invalidateQueries({ queryKey: ['noticias-destaque'] });
      queryClient.invalidateQueries({ queryKey: ['noticias-recentes'] });
    },
  });
}

/**
 * Hook para atualizar notícia (admin)
 */
export function useUpdateNoticia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNoticia,
    onSuccess: (data) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
      queryClient.invalidateQueries({ queryKey: ['noticia', data.slug] });
      queryClient.invalidateQueries({ queryKey: ['noticias-destaque'] });
      queryClient.invalidateQueries({ queryKey: ['noticias-recentes'] });
    },
  });
}

/**
 * Hook para deletar notícia (admin)
 */
export function useDeleteNoticia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNoticia,
    onSuccess: () => {
      // Invalidar todas as queries
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
      queryClient.invalidateQueries({ queryKey: ['noticia'] });
      queryClient.invalidateQueries({ queryKey: ['noticias-destaque'] });
      queryClient.invalidateQueries({ queryKey: ['noticias-recentes'] });
    },
  });
}

