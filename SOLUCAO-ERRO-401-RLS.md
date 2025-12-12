# 🚨 SOLUÇÃO: Erro 401 + RLS (Código 42501)

## ❌ Erro no Console

```
HTTP/3 401 (Unauthorized)
Error: new row violates row-level security policy for table "candidaturas"
Código: 42501
```

## 🔍 O que significa?

- **401 Unauthorized**: O Supabase está rejeitando a requisição
- **42501**: Código PostgreSQL para violação de política RLS
- **RLS Policy**: A política de Row Level Security está bloqueando a inserção

## ✅ SOLUÇÃO DEFINITIVA

### Passo 1: Executar Script SQL

1. Acesse **Supabase Dashboard** → **SQL Editor**
2. Abra o arquivo: `supabase/fix-rls-candidaturas-DEFINITIVO.sql`
3. **COPIE TODO O CONTEÚDO**
4. **COLE** no SQL Editor
5. Clique em **RUN**

### Passo 2: Verificar Políticas

Após executar, execute esta query:

```sql
SELECT 
    policyname as "Nome",
    cmd as "Comando",
    roles::text as "Roles"
FROM pg_policies 
WHERE tablename = 'candidaturas';
```

**Você DEVE ver:**
- ✅ `candidaturas_insert_public` - INSERT - `{public}`

### Passo 3: Testar

1. Recarregue a página do site (Ctrl+F5 ou Cmd+Shift+R)
2. Acesse `/pessoas/carreiras`
3. Preencha o formulário
4. Envie a candidatura
5. **Deve funcionar!** ✅

## 🔧 Se AINDA não funcionar

### Verificação 1: Tabela existe?

```sql
SELECT * FROM information_schema.tables 
WHERE table_name = 'candidaturas';
```

Se não retornar nada, execute primeiro:
- `supabase/candidaturas-schema.sql`

### Verificação 2: RLS está habilitado?

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'candidaturas';
```

Deve retornar `rowsecurity = true`

### Verificação 3: Política de INSERT existe?

```sql
SELECT * FROM pg_policies 
WHERE tablename = 'candidaturas' 
AND cmd = 'INSERT';
```

Deve retornar uma política com `roles = '{public}'`

### Verificação 4: Variáveis de Ambiente

Verifique se o arquivo `.env` contém:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

**Onde encontrar:**
- Supabase Dashboard → Settings → API
- **Project URL** → `VITE_SUPABASE_URL`
- **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### Verificação 5: Chave Anon está correta?

A chave anon deve ter permissões para fazer INSERT. Verifique no Supabase:
- Settings → API → anon key
- Deve estar ativa e não revogada

## 🆘 Solução de Emergência (Temporária)

Se nada funcionar e você precisar testar AGORA:

```sql
-- ⚠️ ATENÇÃO: Isso remove a segurança! Use apenas para testar
ALTER TABLE candidaturas DISABLE ROW LEVEL SECURITY;
```

**IMPORTANTE**: Após testar, reabilite:

```sql
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;
```

E execute novamente o script `fix-rls-candidaturas-DEFINITIVO.sql`

## 📋 Checklist Final

Antes de testar, confirme:

- [ ] Script SQL foi executado com sucesso
- [ ] Política de INSERT com `TO public` existe
- [ ] Variáveis de ambiente estão configuradas
- [ ] Chave anon está correta e ativa
- [ ] Página foi recarregada (hard refresh)
- [ ] Console do navegador não mostra outros erros

## 🎯 Diferença entre os Scripts

- `fix-candidaturas-rls.sql` - Versão básica
- `fix-rls-candidaturas-URGENTE.sql` - Versão com limpeza completa
- `fix-rls-candidaturas-DEFINITIVO.sql` - **Versão mais robusta (RECOMENDADA)**

Use sempre a versão **DEFINITIVO** para garantir que tudo funcione!



