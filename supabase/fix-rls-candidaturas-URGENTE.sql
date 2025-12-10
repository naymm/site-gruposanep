-- ============================================
-- CORREÇÃO URGENTE: RLS para Candidaturas
-- ============================================
-- Execute este script IMEDIATAMENTE no SQL Editor do Supabase
-- para resolver o erro: "new row violates row-level security policy"

-- PASSO 1: Remover TODAS as políticas existentes da tabela candidaturas
-- Removendo todas as políticas possíveis para garantir limpeza completa
DROP POLICY IF EXISTS "Qualquer pessoa pode criar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem ver candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Permitir inserção pública de candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Apenas autenticados podem ver candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Apenas autenticados podem atualizar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Apenas autenticados podem deletar candidaturas" ON candidaturas;

-- Remover qualquer outra política que possa existir (método alternativo)
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'candidaturas') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON candidaturas';
    END LOOP;
END $$;

-- PASSO 2: Garantir que a tabela existe e RLS está habilitado
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;

-- PASSO 3: Criar política de INSERT para TODOS (público)
-- Esta é a política mais importante - permite que qualquer pessoa crie candidaturas
CREATE POLICY "Permitir inserção pública de candidaturas"
  ON candidaturas
  FOR INSERT
  TO public
  WITH CHECK (true);

-- PASSO 4: Criar política de SELECT apenas para autenticados
CREATE POLICY "Apenas autenticados podem ver candidaturas"
  ON candidaturas
  FOR SELECT
  TO authenticated
  USING (true);

-- PASSO 5: Criar política de UPDATE apenas para autenticados
CREATE POLICY "Apenas autenticados podem atualizar candidaturas"
  ON candidaturas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- PASSO 6: Criar política de DELETE apenas para autenticados
CREATE POLICY "Apenas autenticados podem deletar candidaturas"
  ON candidaturas
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- VERIFICAÇÃO
-- ============================================
-- Execute esta query para verificar se as políticas foram criadas:
-- SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'candidaturas';

-- Você deve ver:
-- 1. "Permitir inserção pública de candidaturas" - INSERT - {public}
-- 2. "Apenas autenticados podem ver candidaturas" - SELECT - {authenticated}
-- 3. "Apenas autenticados podem atualizar candidaturas" - UPDATE - {authenticated}
-- 4. "Apenas autenticados podem deletar candidaturas" - DELETE - {authenticated}

