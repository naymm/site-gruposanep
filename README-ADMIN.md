# 🔐 Painel Administrativo - Guia Completo

Este guia explica como configurar e usar o painel administrativo completo para gestão de notícias.

## 📋 Funcionalidades

### ✅ CRUD Completo
- **Criar** notícias com upload de imagens
- **Listar** todas as notícias com busca e filtros
- **Editar** notícias existentes
- **Deletar** notícias com confirmação

### ✅ Funcionalidades Avançadas
- Upload de imagens para Supabase Storage
- Geração automática de slug
- Busca por título, resumo ou slug
- Filtros por categoria e status
- Ordenação por data, visualizações ou criação
- Autenticação com Supabase Auth
- Proteção de rotas administrativas

## 🚀 Configuração

### 1. Configurar Autenticação no Supabase

1. No Supabase Dashboard, vá em **Authentication** → **Users**
2. Clique em **Add User** → **Create new user**
3. Preencha:
   - **Email**: seu email admin
   - **Password**: sua senha
   - **Auto Confirm User**: ✅ (marcar)

### 2. Configurar Storage

1. Execute o script `supabase/storage-setup.sql` no SQL Editor
2. Ou configure manualmente:
   - Vá em **Storage** no Dashboard
   - Clique em **New bucket**
   - Nome: `noticias`
   - Público: ✅ (marcar)
   - Policies: Configure conforme o script SQL

### 3. Variáveis de Ambiente

Certifique-se de que seu `.env` contém:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

## 📁 Estrutura do Painel

```
src/
├── pages/
│   └── admin/
│       ├── Login.tsx              # Página de login
│       ├── NoticiasAdmin.tsx      # Listagem com busca/filtros
│       ├── NoticiaNova.tsx         # Criar notícia
│       └── NoticiaEditar.tsx       # Editar notícia
├── components/
│   ├── admin/
│   │   ├── NoticiaForm.tsx        # Formulário reutilizável
│   │   └── ImageUpload.tsx        # Componente de upload
│   └── auth/
│       └── ProtectedRoute.tsx    # Proteção de rotas
└── lib/
    └── supabase/
        ├── auth.ts                # Serviço de autenticação
        └── storage.ts             # Serviço de storage
```

## 🎯 Como Usar

### Acessar o Painel

1. Acesse `/admin/login`
2. Faça login com suas credenciais
3. Você será redirecionado para `/admin/noticias`

### Criar Notícia

1. Clique em **Nova Notícia**
2. Preencha os campos:
   - **Título**: Será usado para gerar o slug automaticamente
   - **Resumo**: Breve descrição
   - **Conteúdo**: Conteúdo completo (HTML permitido)
   - **Imagem**: Faça upload ou cole uma URL
   - **Categoria**: Selecione uma categoria
   - **Autor**: Selecione um autor
   - **Data de Publicação**: Escolha a data
   - **Destaque**: Marque se for notícia em destaque
   - **Publicada**: Marque para publicar imediatamente
3. Clique em **Criar Notícia**

### Editar Notícia

1. Na listagem, clique no ícone de **Editar** (lápis)
2. Modifique os campos desejados
3. Clique em **Atualizar Notícia**

### Deletar Notícia

1. Na listagem, clique no ícone de **Deletar** (lixeira)
2. Confirme a exclusão no modal
3. A notícia será deletada permanentemente

### Buscar e Filtrar

Na página de listagem, você pode:

- **Buscar**: Digite no campo de busca (busca em título, resumo e slug)
- **Filtrar por Categoria**: Selecione uma categoria
- **Filtrar por Status**: Publicadas ou Rascunhos
- **Ordenar**: Por data, visualizações ou criação

## 🔒 Segurança

### Autenticação

- Todas as rotas `/admin/*` requerem autenticação
- Usuários não autenticados são redirecionados para `/admin/login`
- A sessão é mantida no navegador

### Storage

- Apenas usuários autenticados podem fazer upload
- Imagens são públicas para leitura
- Políticas RLS protegem o storage

### Banco de Dados

- Políticas RLS protegem as tabelas
- Apenas usuários autenticados podem criar/editar/deletar
- Leitura pública apenas para notícias publicadas

## 📸 Upload de Imagens

### Opção 1: Upload para Supabase Storage

1. Clique na área de upload
2. Selecione uma imagem (PNG, JPG, GIF até 5MB)
3. A imagem será enviada automaticamente
4. A URL será preenchida automaticamente

### Opção 2: URL Manual

1. Cole uma URL de imagem no campo "Ou cole uma URL"
2. A URL será validada automaticamente

## 🎨 Interface

### Feedback Visual

- **Loading**: Spinners durante carregamento
- **Toasts**: Notificações de sucesso/erro
- **Validação**: Mensagens de erro em tempo real
- **Confirmação**: Modal para ações destrutivas

### Responsividade

- Interface adaptável para desktop e mobile
- Tabela responsiva com scroll horizontal
- Formulários otimizados para diferentes telas

## 🐛 Troubleshooting

### Erro: "User not authenticated"

**Solução**: Faça login novamente em `/admin/login`

### Erro: "Bucket not found"

**Solução**: Execute `supabase/storage-setup.sql` ou crie o bucket manualmente

### Erro: "Upload failed"

**Solução**: 
1. Verifique se o bucket existe
2. Verifique as políticas de storage
3. Verifique o tamanho da imagem (max 5MB)

### Imagens não aparecem

**Solução**:
1. Verifique se o bucket é público
2. Verifique a URL da imagem
3. Verifique as políticas de storage

## 📚 Próximos Passos

1. **Editor Rich Text**: Adicionar editor WYSIWYG
2. **Preview**: Visualizar notícia antes de publicar
3. **Bulk Actions**: Ações em massa (publicar/deletar várias)
4. **Estatísticas**: Dashboard com métricas
5. **Histórico**: Versões anteriores das notícias

## 🔗 Links Úteis

- [Documentação Supabase Auth](https://supabase.com/docs/guides/auth)
- [Documentação Supabase Storage](https://supabase.com/docs/guides/storage)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)





