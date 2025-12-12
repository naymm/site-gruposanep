-- ============================================
-- SOLUÇÃO SEGURA: Função RPC com SECURITY DEFINER
-- ============================================
-- Esta abordagem é MAIS SEGURA que abrir RLS na tabela
-- A tabela permanece totalmente fechada
-- Apenas esta função pode fazer INSERT

-- ============================================
-- PASSO 1: Garantir que RLS está fechado na tabela
-- ============================================
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;

-- Remover qualquer política de INSERT público (se existir)
DROP POLICY IF EXISTS "candidaturas_public_insert" ON candidaturas;
DROP POLICY IF EXISTS "Qualquer pessoa pode criar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Permitir inserção pública de candidaturas" ON candidaturas;

-- Criar política que BLOQUEIA tudo para público
-- (Apenas autenticados podem fazer operações diretas)
CREATE POLICY "candidaturas_authenticated_all"
  ON candidaturas
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- PASSO 2: Criar função RPC com SECURITY DEFINER
-- ============================================
CREATE OR REPLACE FUNCTION public.criar_candidatura(
  p_primeiro_nome text,
  p_ultimo_nome text,
  p_nacionalidade text,
  p_data_nascimento date,
  p_residencia text,
  p_contacto text,
  p_contacto_alternativo text DEFAULT NULL,
  p_email text,
  p_area_educacao text,
  p_grau_academico text,
  p_instituicao text,
  p_situacao_profissional text,
  p_grau_experiencia text,
  p_area_atividade text,
  p_nome_empresa text,
  p_funcao_cargo text,
  p_curriculum_vitae_url text DEFAULT NULL,
  p_bilhete_identidade_url text DEFAULT NULL,
  p_certificados_url text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  -- Validações de segurança
  IF p_primeiro_nome IS NULL OR p_primeiro_nome = '' THEN
    RAISE EXCEPTION 'primeiro_nome é obrigatório';
  END IF;
  
  IF p_ultimo_nome IS NULL OR p_ultimo_nome = '' THEN
    RAISE EXCEPTION 'ultimo_nome é obrigatório';
  END IF;
  
  IF p_email IS NULL OR p_email = '' THEN
    RAISE EXCEPTION 'email é obrigatório';
  END IF;
  
  -- Validar formato de email básico
  IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'email inválido';
  END IF;
  
  -- Inserir candidatura
  INSERT INTO public.candidaturas (
    primeiro_nome,
    ultimo_nome,
    nacionalidade,
    data_nascimento,
    residencia,
    contacto,
    contacto_alternativo,
    email,
    area_educacao,
    grau_academico,
    instituicao,
    situacao_profissional,
    grau_experiencia,
    area_atividade,
    nome_empresa,
    funcao_cargo,
    curriculum_vitae_url,
    bilhete_identidade_url,
    certificados_url,
    status
  ) VALUES (
    p_primeiro_nome,
    p_ultimo_nome,
    p_nacionalidade,
    p_data_nascimento,
    p_residencia,
    p_contacto,
    p_contacto_alternativo,
    p_email,
    p_area_educacao,
    p_grau_academico,
    p_instituicao,
    p_situacao_profissional,
    p_grau_experiencia,
    p_area_atividade,
    p_nome_empresa,
    p_funcao_cargo,
    p_curriculum_vitae_url,
    p_bilhete_identidade_url,
    p_certificados_url,
    'pendente'  -- Sempre inicia como pendente
  )
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$;

-- ============================================
-- PASSO 3: Dar permissão EXECUTE apenas para anon
-- ============================================
-- Isso permite que usuários anônimos executem a função
-- mas NÃO acessam a tabela diretamente
GRANT EXECUTE ON FUNCTION public.criar_candidatura TO anon;
GRANT EXECUTE ON FUNCTION public.criar_candidatura TO authenticated;

-- ============================================
-- PASSO 4: Comentários e documentação
-- ============================================
COMMENT ON FUNCTION public.criar_candidatura IS 
'Função segura para criar candidaturas. Usa SECURITY DEFINER para bypassar RLS. 
Apenas esta função pode criar candidaturas para usuários anônimos.';

-- ============================================
-- VERIFICAÇÃO
-- ============================================
-- Verificar se a função foi criada:
-- SELECT routine_name, routine_type, security_type
-- FROM information_schema.routines
-- WHERE routine_schema = 'public' 
-- AND routine_name = 'criar_candidatura';

-- Verificar permissões:
-- SELECT grantee, privilege_type
-- FROM information_schema.routine_privileges
-- WHERE routine_schema = 'public'
-- AND routine_name = 'criar_candidatura';

-- ============================================
-- TESTE (Opcional)
-- ============================================
-- Testar a função:
/*
SELECT public.criar_candidatura(
  'João'::text,
  'Silva'::text,
  'Angolana'::text,
  '1990-01-01'::date,
  'Luanda'::text,
  '+244 999 999 999'::text,
  NULL::text,
  'joao@teste.com'::text,
  'Engenharia'::text,
  'licenciatura'::text,
  'Universidade'::text,
  'empregado'::text,
  'junior'::text,
  'Tecnologia'::text,
  'Empresa Teste'::text,
  'Desenvolvedor'::text,
  NULL::text,
  NULL::text,
  NULL::text
);
*/



