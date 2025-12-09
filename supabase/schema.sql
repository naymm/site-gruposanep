-- ============================================
-- Schema de Banco de Dados para Notícias
-- Supabase PostgreSQL
-- ============================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Para busca de texto

-- ============================================
-- TABELA: categorias
-- ============================================
CREATE TABLE IF NOT EXISTS categorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  descricao TEXT,
  cor VARCHAR(7), -- Código hexadecimal da cor
  icone VARCHAR(50), -- Nome do ícone (ex: "newspaper", "award")
  ativo BOOLEAN DEFAULT true,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: autores
-- ============================================
CREATE TABLE IF NOT EXISTS autores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(200) NOT NULL,
  email VARCHAR(255),
  foto TEXT, -- URL da foto
  cargo VARCHAR(200),
  bio TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: noticias
-- ============================================
CREATE TABLE IF NOT EXISTS noticias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  resumo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  imagem_principal TEXT NOT NULL,
  destaque BOOLEAN DEFAULT false,
  publicada BOOLEAN DEFAULT false,
  data_publicacao TIMESTAMPTZ DEFAULT NOW(),
  visualizacoes INTEGER DEFAULT 0,
  categoria_id UUID NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
  autor_id UUID NOT NULL REFERENCES autores(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ÍNDICES para performance
-- ============================================

-- Índices para categorias
CREATE INDEX IF NOT EXISTS idx_categorias_slug ON categorias(slug);
CREATE INDEX IF NOT EXISTS idx_categorias_ativo ON categorias(ativo);

-- Índices para autores
CREATE INDEX IF NOT EXISTS idx_autores_ativo ON autores(ativo);

-- Índices para notícias
CREATE INDEX IF NOT EXISTS idx_noticias_slug ON noticias(slug);
CREATE INDEX IF NOT EXISTS idx_noticias_publicada ON noticias(publicada);
CREATE INDEX IF NOT EXISTS idx_noticias_destaque ON noticias(destaque);
CREATE INDEX IF NOT EXISTS idx_noticias_data_publicacao ON noticias(data_publicacao DESC);
CREATE INDEX IF NOT EXISTS idx_noticias_categoria_id ON noticias(categoria_id);
CREATE INDEX IF NOT EXISTS idx_noticias_autor_id ON noticias(autor_id);
CREATE INDEX IF NOT EXISTS idx_noticias_publicada_data ON noticias(publicada, data_publicacao DESC);

-- Índice GIN para busca full-text
CREATE INDEX IF NOT EXISTS idx_noticias_busca ON noticias USING GIN (
  to_tsvector('portuguese', titulo || ' ' || resumo || ' ' || conteudo)
);

-- ============================================
-- FUNÇÕES
-- ============================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_categorias_updated_at
  BEFORE UPDATE ON categorias
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_autores_updated_at
  BEFORE UPDATE ON autores
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_noticias_updated_at
  BEFORE UPDATE ON noticias
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Função para incrementar visualizações
CREATE OR REPLACE FUNCTION incrementar_visualizacoes(noticia_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE noticias
  SET visualizacoes = visualizacoes + 1
  WHERE id = noticia_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE autores ENABLE ROW LEVEL SECURITY;
ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;

-- Políticas para categorias (leitura pública)
CREATE POLICY "Categorias são públicas para leitura"
  ON categorias FOR SELECT
  USING (ativo = true);

-- Políticas para autores (leitura pública)
CREATE POLICY "Autores são públicos para leitura"
  ON autores FOR SELECT
  USING (ativo = true);

-- Políticas para notícias (leitura pública apenas para publicadas)
CREATE POLICY "Notícias publicadas são públicas para leitura"
  ON noticias FOR SELECT
  USING (
    publicada = true 
    AND data_publicacao <= NOW()
  );

-- Políticas para inserção/atualização (requer autenticação)
-- Permitir que usuários autenticados vejam todas as notícias (incluindo rascunhos)
CREATE POLICY "Usuários autenticados podem ver todas as notícias"
  ON noticias FOR SELECT
  TO authenticated
  USING (true);

-- Permitir que usuários autenticados criem notícias
CREATE POLICY "Usuários autenticados podem criar notícias"
  ON noticias FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Permitir que usuários autenticados atualizem notícias
CREATE POLICY "Usuários autenticados podem atualizar notícias"
  ON noticias FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Permitir que usuários autenticados deletem notícias
CREATE POLICY "Usuários autenticados podem deletar notícias"
  ON noticias FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- DADOS INICIAIS (Seed)
-- ============================================

-- Inserir categorias padrão
INSERT INTO categorias (nome, slug, descricao, cor, icone, ordem) VALUES
  ('Prémios', 'premios', 'Notícias sobre prémios e reconhecimentos', '#FFD700', 'award', 1),
  ('Recrutamento', 'recrutamento', 'Oportunidades de carreira e recrutamento', '#4CAF50', 'briefcase', 2),
  ('Eventos', 'eventos', 'Eventos e celebrações do Grupo', '#9C27B0', 'calendar', 3),
  ('Infraestrutura', 'infraestrutura', 'Novas instalações e infraestruturas', '#2196F3', 'building', 4),
  ('Parcerias', 'parcerias', 'Parcerias estratégicas', '#FF9800', 'handshake', 5),
  ('Responsabilidade Social', 'responsabilidade-social', 'Iniciativas de responsabilidade social', '#E91E63', 'heart', 6),
  ('Bem-Estar', 'bem-estar', 'Programas de bem-estar e saúde', '#00BCD4', 'smile', 7),
  ('Expansão', 'expansao', 'Expansão de negócios', '#795548', 'trending-up', 8),
  ('Sustentabilidade', 'sustentabilidade', 'Iniciativas de sustentabilidade', '#4CAF50', 'leaf', 9)
ON CONFLICT (slug) DO NOTHING;

-- Inserir autor padrão
INSERT INTO autores (nome, email, cargo, ativo) VALUES
  ('Equipa de Comunicação', 'comunicacao@gruposanep.co.ao', 'Equipa de Comunicação', true),
  ('Recursos Humanos', 'rh@gruposanep.co.ao', 'Recursos Humanos', true)
ON CONFLICT DO NOTHING;

-- ============================================
-- COMENTÁRIOS
-- ============================================

COMMENT ON TABLE categorias IS 'Categorias de notícias';
COMMENT ON TABLE autores IS 'Autores das notícias';
COMMENT ON TABLE noticias IS 'Notícias do site';

COMMENT ON COLUMN noticias.destaque IS 'Se a notícia deve aparecer em destaque';
COMMENT ON COLUMN noticias.publicada IS 'Se a notícia está publicada e visível';
COMMENT ON COLUMN noticias.data_publicacao IS 'Data/hora de publicação (pode ser futura)';
COMMENT ON COLUMN noticias.visualizacoes IS 'Contador de visualizações';

