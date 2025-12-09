-- ============================================
-- Tabela para Galeria de Imagens das Notícias
-- ============================================

-- Criar tabela de imagens da galeria
CREATE TABLE IF NOT EXISTS imagens_noticias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  noticia_id UUID NOT NULL REFERENCES noticias(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  ordem INTEGER DEFAULT 0,
  legenda TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_imagens_noticia_id ON imagens_noticias(noticia_id);
CREATE INDEX IF NOT EXISTS idx_imagens_ordem ON imagens_noticias(noticia_id, ordem);

-- Função para atualizar updated_at
CREATE TRIGGER update_imagens_noticias_updated_at
  BEFORE UPDATE ON imagens_noticias
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE imagens_noticias ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública (apenas imagens de notícias publicadas)
CREATE POLICY "Imagens de notícias publicadas são públicas"
  ON imagens_noticias FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM noticias
      WHERE noticias.id = imagens_noticias.noticia_id
        AND noticias.publicada = true
        AND noticias.data_publicacao <= NOW()
    )
  );

-- Política para usuários autenticados verem todas as imagens
CREATE POLICY "Usuários autenticados podem ver todas as imagens"
  ON imagens_noticias FOR SELECT
  TO authenticated
  USING (true);

-- Política para usuários autenticados criarem imagens
CREATE POLICY "Usuários autenticados podem criar imagens"
  ON imagens_noticias FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política para usuários autenticados atualizarem imagens
CREATE POLICY "Usuários autenticados podem atualizar imagens"
  ON imagens_noticias FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para usuários autenticados deletarem imagens
CREATE POLICY "Usuários autenticados podem deletar imagens"
  ON imagens_noticias FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- COMENTÁRIOS
-- ============================================

COMMENT ON TABLE imagens_noticias IS 'Galeria de imagens adicionais para cada notícia';
COMMENT ON COLUMN imagens_noticias.ordem IS 'Ordem de exibição das imagens na galeria';
COMMENT ON COLUMN imagens_noticias.legenda IS 'Legenda opcional para a imagem';

