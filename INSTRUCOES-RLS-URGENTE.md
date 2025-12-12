# 🚨 CORREÇÃO URGENTE - Erro RLS Candidaturas

## ❌ Erro Atual
```
Error: Erro ao criar candidatura: new row violates row-level security policy for table "candidaturas"
```

## ✅ SOLUÇÃO IMEDIATA (3 Passos)

### Passo 1: Acessar Supabase Dashboard
1. Acesse [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Faça login na sua conta
3. Selecione o seu projeto

### Passo 2: Abrir SQL Editor
1. No menu lateral, clique em **SQL Editor**
2. Clique em **New query**

### Passo 3: Executar Script de Correção
1. Abra o arquivo: `supabase/fix-rls-candidaturas-URGENTE.sql`
2. **COPIE TODO O CONTEÚDO** do arquivo
3. **COLE** no SQL Editor do Supabase
4. Clique em **RUN** (ou pressione Ctrl+Enter)

## 📋 Script Completo (Copia e Cola)

```sql
-- ============================================
-- CORREÇÃO URGENTE: RLS para Candidaturas
-- ============================================

-- PASSO 1: Remover TODAS as políticas existentes
DROP POLICY IF EXISTS "Qualquer pessoa pode criar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem ver candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Permitir inserção pública de candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Apenas autenticados podem ver candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Apenas autenticados podem atualizar candidaturas" ON candidaturas;
DROP POLICY IF EXISTS "Apenas autenticados podem deletar candidaturas" ON candidaturas;

-- PASSO 2: Garantir que RLS está habilitado
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;

-- PASSO 3: Criar política de INSERT para TODOS (público)
CREATE POLICY "Permitir inserção pública de candidaturas"
  ON candidaturas
  FOR INSERT
  TO public
  WITH CHECK (true);

-- PASSO 4: Criar política de SELECT apenas para autenticados
CREATE POLICY "Apenas autenticados podem ver candidaturas"
  ON candidaturas
  FOR SELECT
  TO authenticated
  USING (true);

-- PASSO 5: Criar política de UPDATE apenas para autenticados
CREATE POLICY "Apenas autenticados podem atualizar candidaturas"
  ON candidaturas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- PASSO 6: Criar política de DELETE apenas para autenticados
CREATE POLICY "Apenas autenticados podem deletar candidaturas"
  ON candidaturas
  FOR DELETE
  TO authenticated
  USING (true);
```

## ✅ Verificar se Funcionou

Após executar o script, execute esta query para verificar:

```sql
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'candidaturas';
```

**Você deve ver 4 políticas:**
1. ✅ `Permitir inserção pública de candidaturas` - INSERT - `{public}`
2. ✅ `Apenas autenticados podem ver candidaturas` - SELECT - `{authenticated}`
3. ✅ `Apenas autenticados podem atualizar candidaturas` - UPDATE - `{authenticated}`
4. ✅ `Apenas autenticados podem deletar candidaturas` - DELETE - `{authenticated}`

## 🧪 Testar

1. Volte para o site
2. Acesse `/pessoas/carreiras`
3. Preencha o formulário
4. Clique em "Enviar Candidatura"
5. **Deve funcionar sem erros!** ✅

## 🐛 Se AINDA não funcionar

### Opção 1: Desabilitar RLS Temporariamente (APENAS PARA TESTE)

```sql
-- ⚠️ ATENÇÃO: Isso remove a segurança! Use apenas para testar
ALTER TABLE candidaturas DISABLE ROW LEVEL SECURITY;
```

**IMPORTANTE**: Após testar, reabilite o RLS:

```sql
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;
```

E execute novamente o script de correção.

### Opção 2: Verificar se a Tabela Existe

```sql
SELECT * FROM information_schema.tables 
WHERE table_name = 'candidaturas';
```

Se não retornar nada, você precisa executar primeiro:
- `supabase/candidaturas-schema.sql`

### Opção 3: Verificar Estrutura da Tabela

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'candidaturas';
```

## 📞 Precisa de Ajuda?

Se ainda não funcionar após seguir todos os passos:
1. Verifique os logs do Supabase (Dashboard → Logs)
2. Verifique o console do navegador (F12 → Console)
3. Certifique-se de que as variáveis de ambiente estão configuradas:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`



