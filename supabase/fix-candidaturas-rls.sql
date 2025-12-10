-- ============================================
-- CORREÇÃO: Políticas RLS para Candidaturas
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- para permitir que qualquer pessoa possa criar candidaturas

-- Remover políticas antigas (se existirem)
DROP POLICY IF EXISTS "Qualquer pessoa pode criar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem ver candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar candidaturas" ON candidaturas;

-- Política: Qualquer pessoa pode criar candidaturas (inserção pública)
-- Usando 'public' em vez de 'anon, authenticated' para garantir que funcione
CREATE POLICY "Qualquer pessoa pode criar candidaturas"
  ON candidaturas FOR INSERT
  TO public
  WITH CHECK (true);

-- Política: Apenas usuários autenticados podem ver candidaturas
CREATE POLICY "Usuários autenticados podem ver candidaturas"
  ON candidaturas FOR SELECT
  TO authenticated
  USING (true);

-- Política: Apenas usuários autenticados podem atualizar candidaturas
CREATE POLICY "Usuários autenticados podem atualizar candidaturas"
  ON candidaturas FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política: Apenas usuários autenticados podem deletar candidaturas
CREATE POLICY "Usuários autenticados podem deletar candidaturas"
  ON candidaturas FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- Verificar se as políticas foram criadas
-- ============================================
-- Execute esta query para verificar:
-- SELECT * FROM pg_policies WHERE tablename = 'candidaturas';

