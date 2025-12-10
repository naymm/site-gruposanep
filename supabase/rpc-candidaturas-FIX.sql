-- ============================================
-- CORREÇÃO: Criar função RPC e atualizar schema cache
-- ============================================
-- Execute este script se receber erro "Could not find the function"

-- ============================================
-- PASSO 1: Remover função antiga (se existir)
-- ============================================
DROP FUNCTION IF EXISTS public.criar_candidatura(
  text, text, text, date, text, text, text, text, text, text, text, text, text, text, text, text, text, text, text
);

DROP FUNCTION IF EXISTS public.criar_candidatura CASCADE;

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
  IF p_primeiro_nome IS NULL OR trim(p_primeiro_nome) = '' THEN
    RAISE EXCEPTION 'primeiro_nome é obrigatório';
  END IF;
  
  IF p_ultimo_nome IS NULL OR trim(p_ultimo_nome) = '' THEN
    RAISE EXCEPTION 'ultimo_nome é obrigatório';
  END IF;
  
  IF p_email IS NULL OR trim(p_email) = '' THEN
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
    trim(p_primeiro_nome),
    trim(p_ultimo_nome),
    trim(p_nacionalidade),
    p_data_nascimento,
    trim(p_residencia),
    trim(p_contacto),
    CASE WHEN p_contacto_alternativo IS NOT NULL THEN trim(p_contacto_alternativo) ELSE NULL END,
    lower(trim(p_email)),
    trim(p_area_educacao),
    trim(p_grau_academico),
    trim(p_instituicao),
    trim(p_situacao_profissional),
    trim(p_grau_experiencia),
    trim(p_area_atividade),
    trim(p_nome_empresa),
    trim(p_funcao_cargo),
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
-- PASSO 3: Dar permissão EXECUTE
-- ============================================
GRANT EXECUTE ON FUNCTION public.criar_candidatura TO anon;
GRANT EXECUTE ON FUNCTION public.criar_candidatura TO authenticated;

-- ============================================
-- PASSO 4: Comentário
-- ============================================
COMMENT ON FUNCTION public.criar_candidatura IS 
'Função segura para criar candidaturas. Usa SECURITY DEFINER para bypassar RLS.';

-- ============================================
-- PASSO 5: Forçar atualização do schema cache
-- ============================================
-- Notificar PostgREST para recarregar o schema
-- (Isso pode não funcionar em todos os casos, mas ajuda)
NOTIFY pgrst, 'reload schema';

-- IMPORTANTE: Após executar este script:
-- 1. Aguarde 1-2 minutos para o cache atualizar
-- 2. OU reinicie o projeto no Supabase Dashboard:
--    Settings → General → Restart project

-- ============================================
-- VERIFICAÇÃO
-- ============================================
-- Execute estas queries para verificar:

-- 1. Verificar se a função existe:
SELECT 
    routine_name,
    routine_type,
    security_type,
    data_type as return_type
FROM information_schema.routines
WHERE routine_schema = 'public' 
AND routine_name = 'criar_candidatura';

-- 2. Verificar parâmetros da função:
SELECT 
    parameter_name,
    data_type,
    parameter_default
FROM information_schema.parameters
WHERE specific_schema = 'public'
AND specific_name = (
    SELECT specific_name 
    FROM information_schema.routines 
    WHERE routine_name = 'criar_candidatura'
    LIMIT 1
)
ORDER BY ordinal_position;

-- 3. Verificar permissões:
SELECT 
    grantee,
    privilege_type
FROM information_schema.routine_privileges
WHERE routine_schema = 'public'
AND routine_name = 'criar_candidatura';

-- ============================================
-- TESTE RÁPIDO
-- ============================================
-- Teste a função diretamente:
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

