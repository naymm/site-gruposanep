-- ============================================
-- CORREÇÃO: Políticas RLS para Notícias
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- para permitir que usuários autenticados possam
-- criar, editar e deletar notícias

-- Remover políticas antigas (se existirem)
DROP POLICY IF EXISTS "Notícias publicadas são públicas para leitura" ON noticias;
DROP POLICY IF EXISTS "Usuários autenticados podem ver todas as notícias" ON noticias;
DROP POLICY IF EXISTS "Usuários autenticados podem criar notícias" ON noticias;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar notícias" ON noticias;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar notícias" ON noticias;

-- Política para leitura pública (notícias publicadas)
CREATE POLICY "Notícias publicadas são públicas para leitura"
  ON noticias FOR SELECT
  TO public
  USING (
    publicada = true 
    AND data_publicacao <= NOW()
  );

-- Política para usuários autenticados verem todas as notícias (incluindo rascunhos)
CREATE POLICY "Usuários autenticados podem ver todas as notícias"
  ON noticias FOR SELECT
  TO authenticated
  USING (true);

-- Política para usuários autenticados criarem notícias
CREATE POLICY "Usuários autenticados podem criar notícias"
  ON noticias FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política para usuários autenticados atualizarem notícias
CREATE POLICY "Usuários autenticados podem atualizar notícias"
  ON noticias FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para usuários autenticados deletarem notícias
CREATE POLICY "Usuários autenticados podem deletar notícias"
  ON noticias FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- Verificar se as políticas foram criadas
-- ============================================
-- Execute esta query para verificar:
-- SELECT * FROM pg_policies WHERE tablename = 'noticias';

