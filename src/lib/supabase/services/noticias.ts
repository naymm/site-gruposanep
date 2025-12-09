/**
 * Service para gerenciar notícias no Supabase
 */

import { supabase } from '../client';
import type {
  Noticia,
  NoticiaWithRelations,
  CreateNoticiaInput,
  UpdateNoticiaInput,
  NoticiasQueryParams,
  NoticiasResponse,
} from '@/types/noticias';

/**
 * Buscar todas as notícias com filtros e paginação
 */
export async function getAllNoticias(
  params: NoticiasQueryParams = {}
): Promise<NoticiasResponse> {
  const {
    categoria,
    autor,
    destaque,
    publicada = true,
    search,
    limit = 10,
    offset = 0,
    orderBy = 'data_publicacao',
    orderDirection = 'desc',
  } = params;

  let query = supabase
    .from('noticias')
    .select(
      `
      *,
      categoria:categorias(*),
      autor:autores(*)
    `,
      { count: 'exact' }
    );

  // Filtros
  if (publicada !== undefined) {
    query = query.eq('publicada', publicada);
  }

  if (destaque !== undefined) {
    query = query.eq('destaque', destaque);
  }

  if (categoria) {
    // Se categoria é um slug, precisamos buscar o ID primeiro
    // Por enquanto, assumimos que categoria pode ser ID ou slug
    // Você pode melhorar isso buscando a categoria primeiro se necessário
    query = query.eq('categoria_id', categoria);
  }

  if (autor) {
    query = query.eq('autor_id', autor);
  }

  // Busca por texto (título ou resumo)
  if (search) {
    query = query.or(`titulo.ilike.%${search}%,resumo.ilike.%${search}%`);
  }

  // Apenas notícias publicadas com data <= hoje
  query = query.lte('data_publicacao', new Date().toISOString());

  // Ordenação
  query = query.order(orderBy, { ascending: orderDirection === 'asc' });

  // Paginação
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Erro ao buscar notícias:', error);
    throw new Error(`Erro ao buscar notícias: ${error.message}`);
  }

  return {
    data: (data as NoticiaWithRelations[]) || [],
    count: count || 0,
    hasMore: (count || 0) > offset + limit,
  };
}

/**
 * Buscar notícia por slug
 */
export async function getNoticiaBySlug(
  slug: string
): Promise<NoticiaWithRelations | null> {
  const { data, error } = await supabase
    .from('noticias')
    .select(
      `
      *,
      categoria:categorias(*),
      autor:autores(*)
    `
    )
    .eq('slug', slug)
    .eq('publicada', true)
    .lte('data_publicacao', new Date().toISOString())
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Notícia não encontrada
      return null;
    }
    console.error('Erro ao buscar notícia:', error);
    throw new Error(`Erro ao buscar notícia: ${error.message}`);
  }

  return data as NoticiaWithRelations;
}

/**
 * Buscar notícias em destaque
 */
export async function getNoticiasDestaque(
  limit: number = 3
): Promise<NoticiaWithRelations[]> {
  const { data, error } = await supabase
    .from('noticias')
    .select(
      `
      *,
      categoria:categorias(*),
      autor:autores(*)
    `
    )
    .eq('destaque', true)
    .eq('publicada', true)
    .lte('data_publicacao', new Date().toISOString())
    .order('data_publicacao', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erro ao buscar notícias em destaque:', error);
    throw new Error(`Erro ao buscar notícias em destaque: ${error.message}`);
  }

  return (data as NoticiaWithRelations[]) || [];
}

/**
 * Buscar notícias recentes
 */
export async function getNoticiasRecentes(
  limit: number = 6
): Promise<NoticiaWithRelations[]> {
  const { data, error } = await supabase
    .from('noticias')
    .select(
      `
      *,
      categoria:categorias(*),
      autor:autores(*)
    `
    )
    .eq('publicada', true)
    .lte('data_publicacao', new Date().toISOString())
    .order('data_publicacao', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erro ao buscar notícias recentes:', error);
    throw new Error(`Erro ao buscar notícias recentes: ${error.message}`);
  }

  return (data as NoticiaWithRelations[]) || [];
}

/**
 * Incrementar visualizações de uma notícia
 */
export async function incrementarVisualizacoes(
  noticiaId: string
): Promise<void> {
  const { error } = await supabase.rpc('incrementar_visualizacoes', {
    noticia_id: noticiaId,
  });

  if (error) {
    // Se a função RPC não existir, fazer update manual
    const { data: noticia } = await supabase
      .from('noticias')
      .select('visualizacoes')
      .eq('id', noticiaId)
      .single();

    if (noticia) {
      await supabase
        .from('noticias')
        .update({ visualizacoes: (noticia.visualizacoes || 0) + 1 })
        .eq('id', noticiaId);
    }
  }
}

/**
 * Criar nova notícia (requer autenticação)
 */
export async function createNoticia(
  input: CreateNoticiaInput
): Promise<Noticia> {
  const { data, error } = await supabase
    .from('noticias')
    .insert({
      ...input,
      destaque: input.destaque ?? false,
      publicada: input.publicada ?? false,
      visualizacoes: 0,
      data_publicacao: input.data_publicacao || new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar notícia:', error);
    throw new Error(`Erro ao criar notícia: ${error.message}`);
  }

  return data as Noticia;
}

/**
 * Atualizar notícia (requer autenticação)
 */
export async function updateNoticia(
  input: UpdateNoticiaInput
): Promise<Noticia> {
  const { id, ...updateData } = input;

  const { data, error } = await supabase
    .from('noticias')
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar notícia:', error);
    throw new Error(`Erro ao atualizar notícia: ${error.message}`);
  }

  return data as Noticia;
}

/**
 * Deletar notícia (requer autenticação)
 */
export async function deleteNoticia(id: string): Promise<void> {
  const { error } = await supabase.from('noticias').delete().eq('id', id);

  if (error) {
    console.error('Erro ao deletar notícia:', error);
    throw new Error(`Erro ao deletar notícia: ${error.message}`);
  }
}

