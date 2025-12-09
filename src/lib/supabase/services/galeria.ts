/**
 * Service para gerenciar galeria de imagens das notícias
 */

import { supabase } from '../client';
import type { ImagemGaleria } from '@/types/noticias';

/**
 * Buscar todas as imagens de uma notícia
 */
export async function getImagensByNoticiaId(
  noticiaId: string
): Promise<ImagemGaleria[]> {
  const { data, error } = await supabase
    .from('imagens_noticias')
    .select('*')
    .eq('noticia_id', noticiaId)
    .order('ordem', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Erro ao buscar imagens:', error);
    throw new Error(`Erro ao buscar imagens: ${error.message}`);
  }

  return (data as ImagemGaleria[]) || [];
}

/**
 * Adicionar imagem à galeria
 */
export async function adicionarImagem(
  noticiaId: string,
  url: string,
  legenda?: string,
  ordem?: number
): Promise<ImagemGaleria> {
  // Verificar se o usuário está autenticado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Você precisa estar autenticado para adicionar imagens');
  }

  // Se não especificada, buscar a última ordem
  if (ordem === undefined) {
    const { data: lastImage } = await supabase
      .from('imagens_noticias')
      .select('ordem')
      .eq('noticia_id', noticiaId)
      .order('ordem', { ascending: false })
      .limit(1)
      .single();

    ordem = lastImage ? lastImage.ordem + 1 : 0;
  }

  const { data, error } = await supabase
    .from('imagens_noticias')
    .insert({
      noticia_id: noticiaId,
      url,
      legenda: legenda || null,
      ordem,
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao adicionar imagem:', error);
    throw new Error(`Erro ao adicionar imagem: ${error.message}`);
  }

  return data as ImagemGaleria;
}

/**
 * Adicionar múltiplas imagens à galeria
 */
export async function adicionarImagens(
  noticiaId: string,
  imagens: Array<{ url: string; legenda?: string; ordem?: number }>
): Promise<ImagemGaleria[]> {
  // Verificar se o usuário está autenticado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Você precisa estar autenticado para adicionar imagens');
  }

  // Buscar última ordem
  const { data: lastImage } = await supabase
    .from('imagens_noticias')
    .select('ordem')
    .eq('noticia_id', noticiaId)
    .order('ordem', { ascending: false })
    .limit(1)
    .single();

  let ordemInicial = lastImage ? lastImage.ordem + 1 : 0;

  const imagensParaInserir = imagens.map((img, index) => ({
    noticia_id: noticiaId,
    url: img.url,
    legenda: img.legenda || null,
    ordem: img.ordem !== undefined ? img.ordem : ordemInicial + index,
  }));

  const { data, error } = await supabase
    .from('imagens_noticias')
    .insert(imagensParaInserir)
    .select();

  if (error) {
    console.error('Erro ao adicionar imagens:', error);
    throw new Error(`Erro ao adicionar imagens: ${error.message}`);
  }

  return (data as ImagemGaleria[]) || [];
}

/**
 * Atualizar imagem da galeria
 */
export async function atualizarImagem(
  imagemId: string,
  updates: Partial<Pick<ImagemGaleria, 'url' | 'legenda' | 'ordem'>>
): Promise<ImagemGaleria> {
  // Verificar se o usuário está autenticado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Você precisa estar autenticado para atualizar imagens');
  }

  const { data, error } = await supabase
    .from('imagens_noticias')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', imagemId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar imagem:', error);
    throw new Error(`Erro ao atualizar imagem: ${error.message}`);
  }

  return data as ImagemGaleria;
}

/**
 * Deletar imagem da galeria
 */
export async function deletarImagem(imagemId: string): Promise<void> {
  // Verificar se o usuário está autenticado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Você precisa estar autenticado para deletar imagens');
  }

  const { error } = await supabase
    .from('imagens_noticias')
    .delete()
    .eq('id', imagemId);

  if (error) {
    console.error('Erro ao deletar imagem:', error);
    throw new Error(`Erro ao deletar imagem: ${error.message}`);
  }
}

/**
 * Reordenar imagens da galeria
 */
export async function reordenarImagens(
  noticiaId: string,
  imagensIds: string[]
): Promise<void> {
  // Verificar se o usuário está autenticado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Você precisa estar autenticado para reordenar imagens');
  }

  // Atualizar ordem de cada imagem
  const updates = imagensIds.map((id, index) =>
    supabase
      .from('imagens_noticias')
      .update({ ordem: index })
      .eq('id', id)
  );

  await Promise.all(updates);
}

