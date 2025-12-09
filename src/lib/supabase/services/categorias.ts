/**
 * Service para gerenciar categorias no Supabase
 */

import { supabase } from '../client';
import type { Categoria } from '@/types/noticias';

/**
 * Buscar todas as categorias ativas
 */
export async function getAllCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .eq('ativo', true)
    .order('ordem', { ascending: true })
    .order('nome', { ascending: true });

  if (error) {
    console.error('Erro ao buscar categorias:', error);
    throw new Error(`Erro ao buscar categorias: ${error.message}`);
  }

  return (data as Categoria[]) || [];
}

/**
 * Buscar categoria por slug
 */
export async function getCategoriaBySlug(slug: string): Promise<Categoria | null> {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .eq('slug', slug)
    .eq('ativo', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Erro ao buscar categoria:', error);
    throw new Error(`Erro ao buscar categoria: ${error.message}`);
  }

  return data as Categoria;
}

/**
 * Buscar categoria por ID
 */
export async function getCategoriaById(id: string): Promise<Categoria | null> {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Erro ao buscar categoria:', error);
    throw new Error(`Erro ao buscar categoria: ${error.message}`);
  }

  return data as Categoria;
}


