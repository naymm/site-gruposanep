# 📋 Configuração de Candidaturas Espontâneas

Este guia explica como configurar o sistema de candidaturas espontâneas com Supabase.

## 📋 Pré-requisitos

1. Projeto Supabase já configurado (veja `README-SUPABASE.md`)
2. Variáveis de ambiente do Supabase configuradas no `.env`

## 🚀 Configuração

### 1. Executar Schema SQL

1. No painel do Supabase, vá em **SQL Editor**
2. Execute o arquivo `supabase/candidaturas-schema.sql`
   - Isso criará a tabela `candidaturas` com todos os campos necessários
   - Configurará Row Level Security (RLS) para segurança
   - Criará índices para performance

3. **IMPORTANTE**: Se encontrar erro de RLS ao criar candidaturas, execute também:
   - `supabase/fix-candidaturas-rls.sql` - Corrige as políticas RLS
   - Veja `SOLUCAO-RLS-CANDIDATURAS.md` para mais detalhes

### 2. Configurar Storage

1. No painel do Supabase, vá em **SQL Editor**
2. Execute o arquivo `supabase/storage-candidaturas.sql`
   - Isso criará o bucket `candidaturas` no Storage
   - Configurará políticas de acesso
   - Definirá limites de tamanho e tipos de arquivo aceites

**OU configure manualmente:**

1. Vá em **Storage** no Dashboard
2. Clique em **New bucket**
3. Configure:
   - **Name**: `candidaturas`
   - **Public bucket**: ❌ (desmarcado - bucket privado)
   - **File size limit**: 10MB
   - **Allowed MIME types**: 
     - `application/pdf`
     - `image/jpeg`
     - `image/png`
     - `application/msword`
     - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

4. Configure as políticas de Storage conforme o arquivo SQL

### 3. Verificar Variáveis de Ambiente

Certifique-se de que seu `.env` contém:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

## 📁 Estrutura de Dados

### Tabela: candidaturas

A tabela armazena:

**Dados Pessoais:**
- `primeiro_nome` - Primeiro nome
- `ultimo_nome` - Último nome
- `nacionalidade` - Nacionalidade
- `data_nascimento` - Data de nascimento
- `residencia` - Residência/País
- `contacto` - Contacto principal
- `contacto_alternativo` - Contacto alternativo (opcional)
- `email` - Email

**Educação:**
- `area_educacao` - Área de educação
- `grau_academico` - Grau académico (licenciatura, mestrado, etc.)
- `instituicao` - Instituição
- `situacao_profissional` - Situação profissional atual
- `grau_experiencia` - Grau de experiência

**Empresa Actual:**
- `area_atividade` - Área de atividade
- `nome_empresa` - Nome da empresa
- `funcao_cargo` - Função/Cargo

**Anexos:**
- `curriculum_vitae_url` - URL do CV no Storage
- `bilhete_identidade_url` - URL do BI no Storage
- `certificados_url` - URL dos certificados no Storage (opcional)

**Status:**
- `status` - Status da candidatura: `pendente`, `em_analise`, `aprovada`, `rejeitada`
- `observacoes` - Observações internas

### Storage: candidaturas

O bucket armazena os arquivos em pastas:

- `curriculums/` - Curriculum Vitae
- `bilhetes/` - Bilhetes de Identidade
- `certificados/` - Certificados (opcional)

## 🔒 Segurança

### Row Level Security (RLS)

- **Inserção**: Qualquer pessoa pode criar candidaturas (público)
- **Leitura**: Apenas usuários autenticados podem ver candidaturas
- **Atualização**: Apenas usuários autenticados podem atualizar
- **Exclusão**: Apenas usuários autenticados podem deletar

### Storage Policies

- **Upload**: Qualquer pessoa pode fazer upload (anon permitido)
- **Leitura**: Apenas usuários autenticados podem ler arquivos
- **Exclusão**: Apenas usuários autenticados podem deletar arquivos

## 📊 Funcionalidades

### Para Candidatos

- ✅ Preencher formulário completo de candidatura
- ✅ Upload de Curriculum Vitae (PDF, DOC, DOCX - até 10MB)
- ✅ Upload de Bilhete de Identidade (PDF, JPG, PNG - até 5MB)
- ✅ Upload de Certificados (PDF, JPG, PNG - até 5MB - opcional)
- ✅ Validação de arquivos (tamanho e formato)
- ✅ Feedback visual durante o envio
- ✅ Mensagens de sucesso/erro

### Para Administradores

- ✅ Ver todas as candidaturas (requer autenticação)
- ✅ Filtrar por status, email, busca
- ✅ Atualizar status das candidaturas
- ✅ Adicionar observações
- ✅ Deletar candidaturas

## 🔧 Uso no Código

### Criar Candidatura

```typescript
import { createCandidatura } from '@/lib/supabase/services/candidaturas';

const candidatura = await createCandidatura({
  primeiro_nome: 'João',
  ultimo_nome: 'Silva',
  // ... outros campos
  curriculum_vitae_url: 'https://...',
  // ...
});
```

### Buscar Candidaturas (Admin)

```typescript
import { getAllCandidaturas } from '@/lib/supabase/services/candidaturas';

const { data, count } = await getAllCandidaturas({
  status: 'pendente',
  limit: 20,
  offset: 0,
});
```

### Upload de Arquivo

```typescript
import { uploadFile } from '@/lib/supabase/storage';

const result = await uploadFile(
  'candidaturas',
  'curriculums',
  file,
  'nome-arquivo.pdf'
);
```

## 🐛 Troubleshooting

### Erro: "Missing Supabase environment variables"

- Verifique se o arquivo `.env` existe na raiz do projeto
- Verifique se as variáveis começam com `VITE_`
- Reinicie o servidor após adicionar as variáveis

### Erro ao fazer upload de arquivo

- Verifique se o bucket `candidaturas` existe no Storage
- Verifique se as políticas de Storage estão configuradas
- Verifique o tamanho do arquivo (máximo 10MB para CV, 5MB para outros)
- Verifique o formato do arquivo (PDF, DOC, DOCX, JPG, PNG)

### Erro ao criar candidatura

- **Erro RLS**: Se receber "new row violates row-level security policy":
  - Execute o script `supabase/fix-candidaturas-rls.sql`
  - Veja `SOLUCAO-RLS-CANDIDATURAS.md` para instruções detalhadas
- Verifique se a tabela `candidaturas` existe
- Verifique se as políticas RLS estão configuradas
- Verifique os logs do Supabase para mais detalhes

## 📚 Recursos

- [Documentação do Supabase Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

