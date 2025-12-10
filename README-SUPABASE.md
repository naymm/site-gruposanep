# 📚 Guia de Configuração - Notícias com Supabase

Este guia explica como configurar e usar o módulo de notícias dinâmicas com Supabase.

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase
3. Node.js e npm instalados

## 🚀 Configuração Inicial

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Clique em "New Project"
4. Preencha os dados do projeto
5. Aguarde a criação do projeto (pode levar alguns minutos)

### 2. Configurar Banco de Dados

1. No painel do Supabase, vá em **SQL Editor**
2. Abra o arquivo `supabase/schema.sql` deste projeto
3. Copie todo o conteúdo do arquivo
4. Cole no SQL Editor do Supabase
5. Clique em **Run** para executar o script

Isso criará:
- ✅ Tabelas (`categorias`, `autores`, `noticias`)
- ✅ Índices para performance
- ✅ Funções (incrementar visualizações, atualizar timestamps)
- ✅ Row Level Security (RLS) para segurança
- ✅ Dados iniciais (categorias e autores padrão)

### 3. Configurar Variáveis de Ambiente

1. No painel do Supabase, vá em **Settings** → **API**
2. Copie:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon/public key** (chave pública)

3. Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

4. **Importante**: Adicione `.env` ao `.gitignore` para não commitar as credenciais

### 4. Instalar Dependências

```bash
npm install
```

As dependências do Supabase já foram instaladas:
- `@supabase/supabase-js`

## 📁 Estrutura do Projeto

```
src/
├── lib/
│   └── supabase/
│       ├── client.ts              # Cliente Supabase configurado
│       ├── database.types.ts      # Tipos TypeScript
│       ├── services/
│       │   ├── noticias.ts        # Service de notícias
│       │   ├── categorias.ts      # Service de categorias
│       │   └── autores.ts        # Service de autores
│       └── index.ts               # Exportações centralizadas
├── types/
│   └── noticias.ts                # Tipos TypeScript para notícias
├── hooks/
│   ├── useNoticias.ts            # Hooks para notícias
│   ├── useCategorias.ts           # Hooks para categorias
│   └── useAutores.ts             # Hooks para autores
├── pages/
│   ├── Noticias.tsx              # Listagem de notícias
│   ├── NoticiaSingle.tsx         # Detalhe de notícia
│   └── admin/
│       ├── NoticiasAdmin.tsx     # Admin: Listagem
│       ├── NoticiaNova.tsx       # Admin: Criar
│       └── NoticiaEditar.tsx     # Admin: Editar
└── components/
    ├── home/
    │   └── NewsSection.tsx        # Seção de notícias na homepage
    └── admin/
        └── NoticiaForm.tsx        # Formulário reutilizável
```

## 🎯 Funcionalidades

### Frontend Público

- ✅ **Listagem de Notícias** (`/noticias`)
  - Filtro por categoria
  - Busca por texto
  - Paginação
  - Notícia em destaque

- ✅ **Detalhe de Notícia** (`/noticias/:slug`)
  - Visualização completa
  - Contador de visualizações
  - Notícias relacionadas
  - Compartilhamento

- ✅ **Homepage**
  - Últimas notícias na seção de novidades

### Área Administrativa

- ✅ **Gerenciar Notícias** (`/admin/noticias`)
  - Listar todas as notícias
  - Ver status (publicada/rascunho)
  - Ver visualizações
  - Deletar notícias

- ✅ **Criar Notícia** (`/admin/noticias/nova`)
  - Formulário completo
  - Validação com Zod
  - Geração automática de slug
  - Preview de imagem

- ✅ **Editar Notícia** (`/admin/noticias/editar/:id`)
  - Editar todos os campos
  - Atualizar status
  - Salvar alterações

## 🔧 Uso dos Hooks

### Buscar Notícias

```typescript
import { useNoticias } from '@/hooks/useNoticias';

function MeuComponente() {
  const { data, isLoading, error } = useNoticias({
    categoria: 'premios',
    limit: 10,
    publicada: true,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar</div>;

  return (
    <div>
      {data?.data.map(noticia => (
        <div key={noticia.id}>{noticia.titulo}</div>
      ))}
    </div>
  );
}
```

### Buscar Notícia por Slug

```typescript
import { useNoticiaBySlug } from '@/hooks/useNoticias';

function NoticiaPage() {
  const { data: noticia } = useNoticiaBySlug('minha-noticia');
  // ...
}
```

### Criar Notícia (Admin)

```typescript
import { useCreateNoticia } from '@/hooks/useNoticias';

function CriarNoticia() {
  const createNoticia = useCreateNoticia();

  const handleSubmit = async (data) => {
    await createNoticia.mutateAsync(data);
  };
}
```

## 🔒 Segurança (RLS)

O schema SQL já configura Row Level Security:

- ✅ **Leitura pública**: Qualquer um pode ler notícias publicadas
- ✅ **Escrita protegida**: Apenas usuários autenticados podem criar/editar

**Nota**: Para habilitar autenticação completa, você precisará:
1. Configurar autenticação no Supabase
2. Ajustar as políticas RLS
3. Adicionar autenticação no frontend

## 📊 Performance

O schema inclui índices otimizados para:
- ✅ Busca por slug
- ✅ Filtro por categoria
- ✅ Ordenação por data
- ✅ Busca full-text (título, resumo, conteúdo)
- ✅ Filtro por status (publicada/destaque)

## 🐛 Troubleshooting

### Erro: "Missing Supabase environment variables"

**Solução**: Verifique se o arquivo `.env` existe e contém:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Erro: "relation does not exist"

**Solução**: Execute o script SQL (`supabase/schema.sql`) no Supabase

### Notícias não aparecem

**Solução**: 
1. Verifique se as notícias estão marcadas como `publicada = true`
2. Verifique se `data_publicacao <= NOW()`
3. Verifique as políticas RLS no Supabase

### Erro de CORS

**Solução**: No Supabase, vá em **Settings** → **API** e adicione seu domínio nas configurações de CORS

## 📝 Próximos Passos

1. **Autenticação**: Implementar login para área admin
2. **Upload de Imagens**: Integrar com Supabase Storage
3. **Editor Rich Text**: Adicionar editor WYSIWYG
4. **SEO**: Adicionar meta tags dinâmicas
5. **Newsletter**: Integrar com serviço de email

## 📚 Recursos

- [Documentação Supabase](https://supabase.com/docs)
- [React Query](https://tanstack.com/query/latest)
- [TypeScript](https://www.typescriptlang.org/)

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs do console do navegador
2. Verifique os logs do Supabase (Dashboard → Logs)
3. Verifique se as variáveis de ambiente estão corretas
4. Verifique se o schema SQL foi executado corretamente




