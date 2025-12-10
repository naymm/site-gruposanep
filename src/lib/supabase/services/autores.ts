/**
 * Service para gerenciar autores no Supabase
 */

import { supabase } from '../client';
import type { Autor } from '@/types/noticias';

/**
 * Buscar todos os autores ativos
 */
export async function getAllAutores(): Promise<Autor[]> {
  const { data, error } = await supabase
    .from('autores')
    .select('*')
    .eq('ativo', true)
    .order('nome', { ascending: true });

  if (error) {
    console.error('Erro ao buscar autores:', error);
    throw new Error(`Erro ao buscar autores: ${error.message}`);
  }

  return (data as Autor[]) || [];
}

/**
 * Buscar autor por ID
 */
export async function getAutorById(id: string): Promise<Autor | null> {
  const { data, error } = await supabase
    .from('autores')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Erro ao buscar autor:', error);
    throw new Error(`Erro ao buscar autor: ${error.message}`);
  }

  return data as Autor;
}





