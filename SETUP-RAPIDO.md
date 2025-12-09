# ⚡ Setup Rápido - Notícias com Supabase

## 🚀 Passos Rápidos

### 1. Criar Projeto no Supabase
- Acesse [supabase.com](https://supabase.com)
- Crie um novo projeto
- Aguarde a criação (2-3 minutos)

### 2. Executar Schema SQL
- No Supabase Dashboard → **SQL Editor**
- Copie o conteúdo de `supabase/schema.sql`
- Cole e execute (Run)

### 3. Configurar Variáveis
Crie `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

**Onde encontrar:**
- Supabase Dashboard → Settings → API

### 4. Instalar e Rodar
```bash
npm install
npm run dev
```

## ✅ Pronto!

Acesse:
- **Notícias**: `http://localhost:8080/noticias`
- **Admin**: `http://localhost:8080/admin/noticias`

## 📚 Documentação Completa

Veja `README-SUPABASE.md` para detalhes completos.

