-- ============================================
-- CORREÇÃO DEFINITIVA: RLS para Candidaturas
-- ============================================
-- Este script resolve o erro: "new row violates row-level security policy"
-- Execute no SQL Editor do Supabase

-- ============================================
-- PASSO 1: Remover TODAS as políticas existentes
-- ============================================
-- Primeiro, vamos remover todas as políticas manualmente
DROP POLICY IF EXISTS "Qualquer pessoa pode criar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem ver candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Permitir inserção pública de candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Apenas autenticados podem ver candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Apenas autenticados podem atualizar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Apenas autenticados podem deletar candidaturas" ON candidaturas;

-- Remover qualquer outra política que possa existir
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'candidaturas') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON candidaturas';
    END LOOP;
END $$;

-- ============================================
-- PASSO 2: Verificar e habilitar RLS
-- ============================================
-- Garantir que a tabela existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'candidaturas') THEN
        RAISE EXCEPTION 'Tabela candidaturas não existe! Execute primeiro o script candidaturas-schema.sql';
    END IF;
END $$;

-- Habilitar RLS
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PASSO 3: Criar políticas corretas
-- ============================================

-- Política 1: INSERT para TODOS (público) - MAIS IMPORTANTE!
-- Esta política permite que qualquer pessoa (incluindo anônimos) crie candidaturas
CREATE POLICY "candidaturas_insert_public"
  ON candidaturas
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Política 2: SELECT apenas para autenticados
CREATE POLICY "candidaturas_select_authenticated"
  ON candidaturas
  FOR SELECT
  TO authenticated
  USING (true);

-- Política 3: UPDATE apenas para autenticados
CREATE POLICY "candidaturas_update_authenticated"
  ON candidaturas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política 4: DELETE apenas para autenticados
CREATE POLICY "candidaturas_delete_authenticated"
  ON candidaturas
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- VERIFICAÇÃO FINAL
-- ============================================
-- Execute esta query para verificar:
SELECT 
    policyname as "Nome da Política",
    cmd as "Comando",
    roles::text as "Roles",
    qual as "Condição USING",
    with_check as "Condição WITH CHECK"
FROM pg_policies 
WHERE tablename = 'candidaturas'
ORDER BY cmd;

-- Você DEVE ver 4 políticas:
-- 1. candidaturas_insert_public - INSERT - {public} - WITH CHECK: true
-- 2. candidaturas_select_authenticated - SELECT - {authenticated} - USING: true
-- 3. candidaturas_update_authenticated - UPDATE - {authenticated} - USING: true, WITH CHECK: true
-- 4. candidaturas_delete_authenticated - DELETE - {authenticated} - USING: true

-- ============================================
-- TESTE RÁPIDO (OPCIONAL)
-- ============================================
-- Se quiser testar se a política funciona, execute:
-- INSERT INTO candidaturas (
--     primeiro_nome, ultimo_nome, nacionalidade, data_nascimento,
--     residencia, contacto, email, area_educacao, grau_academico,
--     instituicao, situacao_profissional, grau_experiencia,
--     area_atividade, nome_empresa, funcao_cargo, status
-- ) VALUES (
--     'Teste', 'Teste', 'Angolana', '1990-01-01',
--     'Luanda', '+244 999 999 999', 'teste@teste.com', 'Engenharia', 'licenciatura',
--     'Universidade', 'empregado', 'junior',
--     'Tecnologia', 'Empresa Teste', 'Desenvolvedor', 'pendente'
-- );
-- 
-- Se funcionar, você verá uma linha inserida. Depois pode deletar:
-- DELETE FROM candidaturas WHERE email = 'teste@teste.com';

