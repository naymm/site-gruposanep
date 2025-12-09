/**
 * Tipos TypeScript para o módulo de notícias
 */

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
  cor?: string;
  icone?: string;
  ativo: boolean;
  ordem: number;
  created_at: string;
  updated_at: string;
}

export interface Autor {
  id: string;
  nome: string;
  email?: string;
  foto?: string;
  cargo?: string;
  bio?: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ImagemGaleria {
  id: string;
  noticia_id: string;
  url: string;
  ordem: number;
  legenda?: string;
  created_at: string;
  updated_at: string;
}

export interface Noticia {
  id: string;
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  imagem_principal: string;
  destaque: boolean;
  publicada: boolean;
  data_publicacao: string;
  visualizacoes: number;
  categoria_id: string;
  autor_id: string;
  created_at: string;
  updated_at: string;
  // Relacionamentos (populados via JOIN)
  categoria?: Categoria;
  autor?: Autor;
  imagens_galeria?: ImagemGaleria[];
}

export interface NoticiaWithRelations extends Noticia {
  categoria: Categoria;
  autor: Autor;
}

export interface CreateNoticiaInput {
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  imagem_principal: string;
  destaque?: boolean;
  publicada?: boolean;
  data_publicacao?: string;
  categoria_id: string;
  autor_id: string;
}

export interface UpdateNoticiaInput extends Partial<CreateNoticiaInput> {
  id: string;
}

export interface NoticiasQueryParams {
  categoria?: string;
  autor?: string;
  destaque?: boolean;
  publicada?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'data_publicacao' | 'created_at' | 'visualizacoes';
  orderDirection?: 'asc' | 'desc';
}

export interface NoticiasResponse {
  data: NoticiaWithRelations[];
  count: number;
  hasMore: boolean;
}

