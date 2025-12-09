-- ============================================
-- Configuração do Supabase Storage
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- para criar o bucket de imagens de notícias

-- Criar bucket para imagens de notícias
INSERT INTO storage.buckets (id, name, public)
VALUES ('noticias', 'noticias', true)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir upload de imagens (apenas autenticados)
CREATE POLICY "Usuários autenticados podem fazer upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'noticias');

-- Política para permitir leitura pública
CREATE POLICY "Imagens são públicas para leitura"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'noticias');

-- Política para permitir atualização (apenas autenticados)
CREATE POLICY "Usuários autenticados podem atualizar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'noticias');

-- Política para permitir exclusão (apenas autenticados)
CREATE POLICY "Usuários autenticados podem deletar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'noticias');

-- ============================================
-- NOTAS:
-- ============================================
-- 1. O bucket será criado como público para leitura
-- 2. Apenas usuários autenticados podem fazer upload
-- 3. Você pode ajustar as políticas conforme necessário
-- 4. Para criar usuários admin, use o Authentication no Supabase Dashboard

