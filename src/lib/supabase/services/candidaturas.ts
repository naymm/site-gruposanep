/**
 * Service para gerenciar candidaturas espontâneas no Supabase
 */

import { supabase } from '../client';

export interface Candidatura {
  id: string;
  primeiro_nome: string;
  ultimo_nome: string;
  nacionalidade: string;
  data_nascimento: string;
  residencia: string;
  contacto: string;
  contacto_alternativo?: string | null;
  email: string;
  area_educacao: string;
  grau_academico: string;
  instituicao: string;
  situacao_profissional: string;
  grau_experiencia: string;
  area_atividade: string;
  nome_empresa: string;
  funcao_cargo: string;
  curriculum_vitae_url?: string | null;
  bilhete_identidade_url?: string | null;
  certificados_url?: string | null;
  status: 'pendente' | 'em_analise' | 'aprovada' | 'rejeitada';
  observacoes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateCandidaturaInput {
  primeiro_nome: string;
  ultimo_nome: string;
  nacionalidade: string;
  data_nascimento: string;
  residencia: string;
  contacto: string;
  contacto_alternativo?: string;
  email: string;
  area_educacao: string;
  grau_academico: string;
  instituicao: string;
  situacao_profissional: string;
  grau_experiencia: string;
  area_atividade: string;
  nome_empresa: string;
  funcao_cargo: string;
  curriculum_vitae_url?: string;
  bilhete_identidade_url?: string;
  certificados_url?: string;
}

export interface CandidaturasQueryParams {
  status?: string;
  email?: string;
  search?: string;
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

/**
 * Criar nova candidatura usando RPC (mais seguro)
 * Usa função RPC com SECURITY DEFINER para bypassar RLS
 * A tabela permanece totalmente fechada para usuários anônimos
 */
export async function createCandidatura(
  input: CreateCandidaturaInput
): Promise<Candidatura> {
  // Chamar função RPC em vez de INSERT direto
  const { data: candidaturaId, error: rpcError } = await supabase.rpc(
    'criar_candidatura',
    {
      p_primeiro_nome: input.primeiro_nome,
      p_ultimo_nome: input.ultimo_nome,
      p_nacionalidade: input.nacionalidade,
      p_data_nascimento: input.data_nascimento,
      p_residencia: input.residencia,
      p_contacto: input.contacto,
      p_contacto_alternativo: input.contacto_alternativo || null,
      p_email: input.email,
      p_area_educacao: input.area_educacao,
      p_grau_academico: input.grau_academico,
      p_instituicao: input.instituicao,
      p_situacao_profissional: input.situacao_profissional,
      p_grau_experiencia: input.grau_experiencia,
      p_area_atividade: input.area_atividade,
      p_nome_empresa: input.nome_empresa,
      p_funcao_cargo: input.funcao_cargo,
      p_curriculum_vitae_url: input.curriculum_vitae_url || null,
      p_bilhete_identidade_url: input.bilhete_identidade_url || null,
      p_certificados_url: input.certificados_url || null,
    }
  );

  if (rpcError) {
    console.error('Erro ao criar candidatura via RPC:', rpcError);
    throw new Error(`Erro ao criar candidatura: ${rpcError.message}`);
  }

  // A função RPC retorna o ID da candidatura criada
  // Como usuário anônimo não pode fazer SELECT (RLS bloqueado),
  // retornamos os dados que temos (a candidatura foi criada com sucesso)
  if (candidaturaId) {
    return {
      id: candidaturaId,
      primeiro_nome: input.primeiro_nome,
      ultimo_nome: input.ultimo_nome,
      nacionalidade: input.nacionalidade,
      data_nascimento: input.data_nascimento,
      residencia: input.residencia,
      contacto: input.contacto,
      contacto_alternativo: input.contacto_alternativo || null,
      email: input.email,
      area_educacao: input.area_educacao,
      grau_academico: input.grau_academico,
      instituicao: input.instituicao,
      situacao_profissional: input.situacao_profissional,
      grau_experiencia: input.grau_experiencia,
      area_atividade: input.area_atividade,
      nome_empresa: input.nome_empresa,
      funcao_cargo: input.funcao_cargo,
      curriculum_vitae_url: input.curriculum_vitae_url || null,
      bilhete_identidade_url: input.bilhete_identidade_url || null,
      certificados_url: input.certificados_url || null,
      status: 'pendente',
      observacoes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Candidatura;
  }

  throw new Error('Erro ao criar candidatura: ID não retornado');
}

/**
 * Buscar todas as candidaturas (requer autenticação)
 */
export async function getAllCandidaturas(
  params: CandidaturasQueryParams = {}
): Promise<{ data: Candidatura[]; count: number }> {
  const {
    status,
    email,
    search,
    limit = 50,
    offset = 0,
    orderBy = 'created_at',
    orderDirection = 'desc',
  } = params;

  let query = supabase
    .from('candidaturas')
    .select('*', { count: 'exact' });

  // Filtros
  if (status) {
    query = query.eq('status', status);
  }

  if (email) {
    query = query.eq('email', email);
  }

  if (search) {
    query = query.or(
      `primeiro_nome.ilike.%${search}%,ultimo_nome.ilike.%${search}%,email.ilike.%${search}%`
    );
  }

  // Ordenação
  query = query.order(orderBy, { ascending: orderDirection === 'asc' });

  // Paginação
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Erro ao buscar candidaturas:', error);
    throw new Error(`Erro ao buscar candidaturas: ${error.message}`);
  }

  return {
    data: (data as Candidatura[]) || [],
    count: count || 0,
  };
}

/**
 * Buscar candidatura por ID (requer autenticação)
 */
export async function getCandidaturaById(id: string): Promise<Candidatura | null> {
  const { data, error } = await supabase
    .from('candidaturas')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Erro ao buscar candidatura:', error);
    throw new Error(`Erro ao buscar candidatura: ${error.message}`);
  }

  return data as Candidatura;
}

/**
 * Atualizar status da candidatura (requer autenticação)
 */
export async function updateCandidaturaStatus(
  id: string,
  status: Candidatura['status'],
  observacoes?: string
): Promise<Candidatura> {
  const { data, error } = await supabase
    .from('candidaturas')
    .update({
      status,
      observacoes,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar candidatura:', error);
    throw new Error(`Erro ao atualizar candidatura: ${error.message}`);
  }

  return data as Candidatura;
}

/**
 * Deletar candidatura (requer autenticação)
 */
export async function deleteCandidatura(id: string): Promise<void> {
  const { error } = await supabase.from('candidaturas').delete().eq('id', id);

  if (error) {
    console.error('Erro ao deletar candidatura:', error);
    throw new Error(`Erro ao deletar candidatura: ${error.message}`);
  }
}

