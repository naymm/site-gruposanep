-- ============================================
-- POLÍTICAS RLS SEGURAS PARA CANDIDATURAS
-- ============================================
-- Este script cria políticas RLS que:
-- ✅ Permitem INSERT público (formulário público)
-- ✅ Bloqueiam UPDATE/DELETE para público
-- ✅ Permitem SELECT/UPDATE/DELETE apenas para autenticados
-- ✅ Mantêm segurança total

-- ============================================
-- PASSO 1: Limpar políticas existentes
-- ============================================
-- Remover todas as políticas existentes para começar do zero
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'candidaturas'
    ) LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON candidaturas', r.policyname);
    END LOOP;
END $$;

-- ============================================
-- PASSO 2: Verificar estrutura
-- ============================================
-- Garantir que a tabela existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'candidaturas'
    ) THEN
        RAISE EXCEPTION 'Tabela candidaturas não existe! Execute primeiro candidaturas-schema.sql';
    END IF;
END $$;

-- Garantir que RLS está habilitado
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PASSO 3: Criar políticas seguras
-- ============================================

-- POLÍTICA 1: INSERT PÚBLICO (Permite formulário público criar candidaturas)
-- Esta é a única operação permitida para usuários anônimos
CREATE POLICY "candidaturas_public_insert"
  ON candidaturas
  FOR INSERT
  TO public
  WITH CHECK (
    -- Validações de segurança básicas
    primeiro_nome IS NOT NULL AND
    ultimo_nome IS NOT NULL AND
    email IS NOT NULL AND
    -- Garantir que status sempre começa como 'pendente'
    status = 'pendente'
  );

-- POLÍTICA 2: SELECT APENAS AUTENTICADOS (Admin pode ver todas)
-- Usuários anônimos NÃO podem ver candidaturas
CREATE POLICY "candidaturas_authenticated_select"
  ON candidaturas
  FOR SELECT
  TO authenticated
  USING (true);

-- POLÍTICA 3: UPDATE APENAS AUTENTICADOS (Admin pode atualizar)
-- Usuários anônimos NÃO podem atualizar candidaturas
CREATE POLICY "candidaturas_authenticated_update"
  ON candidaturas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- POLÍTICA 4: DELETE APENAS AUTENTICADOS (Admin pode deletar)
-- Usuários anônimos NÃO podem deletar candidaturas
CREATE POLICY "candidaturas_authenticated_delete"
  ON candidaturas
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- VERIFICAÇÃO DAS POLÍTICAS
-- ============================================
-- Execute esta query para verificar se as políticas foram criadas corretamente:
/*
SELECT 
    policyname as "Nome da Política",
    cmd as "Operação",
    roles::text as "Permissões",
    CASE 
        WHEN with_check IS NOT NULL THEN 'WITH CHECK: ' || with_check::text
        ELSE 'Sem WITH CHECK'
    END as "Validação",
    CASE 
        WHEN qual IS NOT NULL THEN 'USING: ' || qual::text
        ELSE 'Sem USING'
    END as "Condição"
FROM pg_policies 
WHERE tablename = 'candidaturas'
ORDER BY 
    CASE cmd
        WHEN 'INSERT' THEN 1
        WHEN 'SELECT' THEN 2
        WHEN 'UPDATE' THEN 3
        WHEN 'DELETE' THEN 4
    END;
*/

-- ============================================
-- TESTE DE SEGURANÇA
-- ============================================
-- Após criar as políticas, teste:

-- 1. Teste INSERT (deve funcionar - simula formulário público)
/*
INSERT INTO candidaturas (
    primeiro_nome, ultimo_nome, nacionalidade, data_nascimento,
    residencia, contacto, email, area_educacao, grau_academico,
    instituicao, situacao_profissional, grau_experiencia,
    area_atividade, nome_empresa, funcao_cargo, status
) VALUES (
    'João', 'Silva', 'Angolana', '1990-01-01',
    'Luanda', '+244 999 999 999', 'joao@teste.com', 'Engenharia', 'licenciatura',
    'Universidade', 'empregado', 'junior',
    'Tecnologia', 'Empresa Teste', 'Desenvolvedor', 'pendente'
);
-- Deve funcionar ✅
*/

-- 2. Teste SELECT (deve falhar para anônimo)
/*
SELECT * FROM candidaturas;
-- Deve falhar com erro RLS para usuário anônimo ✅
*/

-- 3. Teste UPDATE (deve falhar para anônimo)
/*
UPDATE candidaturas SET status = 'aprovada' WHERE email = 'joao@teste.com';
-- Deve falhar com erro RLS para usuário anônimo ✅
*/

-- 4. Teste DELETE (deve falhar para anônimo)
/*
DELETE FROM candidaturas WHERE email = 'joao@teste.com';
-- Deve falhar com erro RLS para usuário anônimo ✅
*/

-- ============================================
-- RESUMO DAS PERMISSÕES
-- ============================================
-- 
-- USUÁRIO ANÔNIMO (Público):
--   ✅ INSERT - Pode criar candidaturas
--   ❌ SELECT - NÃO pode ver candidaturas
--   ❌ UPDATE - NÃO pode atualizar candidaturas
--   ❌ DELETE - NÃO pode deletar candidaturas
--
-- USUÁRIO AUTENTICADO (Admin):
--   ✅ INSERT - Pode criar candidaturas
--   ✅ SELECT - Pode ver todas as candidaturas
--   ✅ UPDATE - Pode atualizar candidaturas
--   ✅ DELETE - Pode deletar candidaturas
--
-- ============================================

