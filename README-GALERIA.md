# 📸 Galeria de Imagens - Guia Completo

Este guia explica como usar a funcionalidade de galeria de imagens nas notícias.

## 🎯 Funcionalidades

### ✅ Galeria de Imagens
- **Múltiplas imagens** por notícia (além da imagem principal)
- **Upload em lote** de imagens
- **Legendas** opcionais para cada imagem
- **Ordenação** automática das imagens
- **Lightbox** para visualização ampliada
- **Navegação** entre imagens no lightbox

## 🚀 Configuração

### 1. Executar Schema SQL

Execute o script `supabase/galeria-imagens.sql` no SQL Editor do Supabase:

1. Acesse o **Supabase Dashboard**
2. Vá em **SQL Editor**
3. Abra o arquivo `supabase/galeria-imagens.sql`
4. Copie todo o conteúdo
5. Cole no SQL Editor
6. Clique em **Run**

Isso criará:
- ✅ Tabela `imagens_noticias`
- ✅ Índices para performance
- ✅ Políticas RLS
- ✅ Triggers para `updated_at`

## 📁 Estrutura

```
src/
├── components/
│   ├── admin/
│   │   └── GaleriaImagens.tsx      # Componente de gestão (admin)
│   └── noticias/
│       └── GaleriaNoticia.tsx      # Componente de exibição (público)
├── lib/
│   └── supabase/
│       └── services/
│           └── galeria.ts         # Service para CRUD de imagens
└── types/
    └── noticias.ts                 # Tipos TypeScript
```

## 🎨 Como Usar

### No Painel Admin

1. **Criar/Editar Notícia**:
   - Preencha os campos da notícia
   - Role até a seção **"Galeria de Imagens"**
   - Clique em **"Fazer Upload de Imagens"** ou **"Adicionar URL"**
   - Adicione quantas imagens quiser
   - Adicione legendas (opcional)
   - Salve a notícia

2. **Gerenciar Imagens**:
   - **Remover**: Passe o mouse sobre a imagem e clique no X
   - **Adicionar Legenda**: Digite no campo abaixo de cada imagem
   - **Adicionar Mais**: Use o botão de upload novamente

### No Site Público

A galeria aparece automaticamente na página da notícia (`/noticias/:slug`):
- Grid responsivo de imagens
- Clique em qualquer imagem para abrir o lightbox
- Navegação com setas ou teclado
- Legenda exibida no lightbox

## 🔧 API e Funções

### Service de Galeria

```typescript
import { 
  getImagensByNoticiaId,
  adicionarImagem,
  adicionarImagens,
  atualizarImagem,
  deletarImagem,
  reordenarImagens
} from '@/lib/supabase/services/galeria';
```

### Exemplos de Uso

```typescript
// Buscar imagens de uma notícia
const imagens = await getImagensByNoticiaId(noticiaId);

// Adicionar uma imagem
await adicionarImagem(noticiaId, url, 'Legenda opcional', 0);

// Adicionar múltiplas imagens
await adicionarImagens(noticiaId, [
  { url: 'url1.jpg', legenda: 'Legenda 1' },
  { url: 'url2.jpg', legenda: 'Legenda 2' },
]);

// Deletar imagem
await deletarImagem(imagemId);
```

## 📊 Estrutura do Banco

### Tabela: `imagens_noticias`

```sql
- id: UUID (PK)
- noticia_id: UUID (FK -> noticias)
- url: TEXT (URL da imagem)
- ordem: INTEGER (ordem de exibição)
- legenda: TEXT (opcional)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

## 🎨 Componentes

### `GaleriaImagens` (Admin)
- Upload múltiplo de imagens
- Preview das imagens
- Edição de legendas
- Remoção de imagens
- Suporte a upload e URL

### `GaleriaNoticia` (Público)
- Grid responsivo
- Lightbox com navegação
- Exibição de legendas
- Controles de navegação
- Indicador de posição

## 🔒 Segurança

- **Leitura pública**: Apenas imagens de notícias publicadas
- **Escrita**: Apenas usuários autenticados
- **RLS**: Políticas configuradas automaticamente

## 📝 Notas

- **Ordem**: As imagens são ordenadas por `ordem` e depois por `created_at`
- **Limite**: Não há limite técnico, mas recomenda-se até 20 imagens por notícia
- **Tamanho**: Máximo 5MB por imagem (configurável)
- **Formatos**: PNG, JPG, GIF, WebP

## 🐛 Troubleshooting

### Imagens não aparecem

1. Verifique se a notícia está publicada
2. Verifique se as políticas RLS estão corretas
3. Verifique se a URL da imagem é válida

### Upload falha

1. Verifique o tamanho da imagem (max 5MB)
2. Verifique se o bucket `noticias` existe
3. Verifique as políticas de storage

### Lightbox não abre

1. Verifique o console do navegador
2. Verifique se há erros de JavaScript
3. Verifique se as imagens foram carregadas

## 🎯 Próximos Passos

1. **Drag & Drop**: Reordenar imagens arrastando
2. **Crop**: Editar/cortar imagens antes do upload
3. **Filtros**: Aplicar filtros nas imagens
4. **Vídeos**: Suporte a vídeos na galeria




