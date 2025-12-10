-- ============================================
-- Schema para Candidaturas Espontâneas
-- Supabase PostgreSQL
-- ============================================

-- ============================================
-- TABELA: candidaturas
-- ============================================
CREATE TABLE IF NOT EXISTS candidaturas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Dados Pessoais
  primeiro_nome VARCHAR(100) NOT NULL,
  ultimo_nome VARCHAR(100) NOT NULL,
  nacionalidade VARCHAR(100) NOT NULL,
  data_nascimento DATE NOT NULL,
  residencia VARCHAR(200) NOT NULL,
  contacto VARCHAR(50) NOT NULL,
  contacto_alternativo VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  
  -- Educação
  area_educacao VARCHAR(200) NOT NULL,
  grau_academico VARCHAR(50) NOT NULL,
  instituicao VARCHAR(200) NOT NULL,
  situacao_profissional VARCHAR(50) NOT NULL,
  grau_experiencia VARCHAR(50) NOT NULL,
  
  -- Empresa Actual
  area_atividade VARCHAR(200) NOT NULL,
  nome_empresa VARCHAR(200) NOT NULL,
  funcao_cargo VARCHAR(200) NOT NULL,
  
  -- Anexos (URLs dos arquivos no Storage)
  curriculum_vitae_url TEXT,
  bilhete_identidade_url TEXT,
  certificados_url TEXT,
  
  -- Status da candidatura
  status VARCHAR(50) DEFAULT 'pendente', -- pendente, em_analise, aprovada, rejeitada
  observacoes TEXT,
  
  -- Metadados
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ÍNDICES para performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_candidaturas_email ON candidaturas(email);
CREATE INDEX IF NOT EXISTS idx_candidaturas_status ON candidaturas(status);
CREATE INDEX IF NOT EXISTS idx_candidaturas_created_at ON candidaturas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_candidaturas_grau_experiencia ON candidaturas(grau_experiencia);

-- ============================================
-- TRIGGER para updated_at
-- ============================================
CREATE TRIGGER update_candidaturas_updated_at
  BEFORE UPDATE ON candidaturas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer pessoa pode criar candidaturas (inserção pública)
-- Usando 'public' para garantir que funcione para usuários anônimos
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
-- COMENTÁRIOS
-- ============================================
COMMENT ON TABLE candidaturas IS 'Candidaturas espontâneas de emprego';
COMMENT ON COLUMN candidaturas.status IS 'Status: pendente, em_analise, aprovada, rejeitada';
COMMENT ON COLUMN candidaturas.curriculum_vitae_url IS 'URL do arquivo no Supabase Storage';
COMMENT ON COLUMN candidaturas.bilhete_identidade_url IS 'URL do arquivo no Supabase Storage';
COMMENT ON COLUMN candidaturas.certificados_url IS 'URL do arquivo no Supabase Storage';

