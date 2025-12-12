-- ============================================
-- Configuração de Storage para Candidaturas
-- Supabase Storage
-- ============================================

-- Criar bucket para candidaturas (se não existir)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'candidaturas',
  'candidaturas',
  false, -- Bucket privado (apenas autenticados podem acessar)
  10485760, -- 10MB limite
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- POLÍTICAS DE STORAGE
-- ============================================

-- Política: Qualquer pessoa pode fazer upload (anon pode inserir)
CREATE POLICY "Qualquer pessoa pode fazer upload de candidaturas"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'candidaturas' AND
    (storage.foldername(name))[1] = 'curriculums' OR
    (storage.foldername(name))[1] = 'bilhetes' OR
    (storage.foldername(name))[1] = 'certificados'
  );

-- Política: Apenas autenticados podem ler arquivos
CREATE POLICY "Usuários autenticados podem ler arquivos de candidaturas"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'candidaturas');

-- Política: Apenas autenticados podem deletar arquivos
CREATE POLICY "Usuários autenticados podem deletar arquivos de candidaturas"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'candidaturas');

-- Política: Apenas autenticados podem atualizar arquivos
CREATE POLICY "Usuários autenticados podem atualizar arquivos de candidaturas"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'candidaturas');



