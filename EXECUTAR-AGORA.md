# ⚡ EXECUTAR AGORA - Solução RLS Candidaturas

## ✅ Análise Completa - Seu Código está CORRETO!

### 1. Cliente Supabase ✅
- Usando `VITE_SUPABASE_ANON_KEY` (correto para frontend)
- Configuração adequada

### 2. Service de Candidaturas ✅
- Função `createCandidatura` implementada corretamente
- Usa o cliente anônimo corretamente
- Define `status: 'pendente'` automaticamente

### 3. Formulário ✅
- Chama `createCandidatura` corretamente
- Faz upload de arquivos antes de criar candidatura
- Tratamento de erros adequado

## 🔧 SOLUÇÃO: Executar Script SQL

O problema está **APENAS nas políticas RLS**. Execute este script:

### Passo 1: Acessar Supabase
1. Vá para: https://supabase.com/dashboard
2. Selecione seu projeto
3. Clique em **SQL Editor** → **New query**

### Passo 2: Executar Script
1. Abra: `supabase/rls-candidaturas-SEGURO.sql`
2. **COPIE TODO O CONTEÚDO**
3. **COLE** no SQL Editor
4. Clique em **RUN** (ou Ctrl+Enter)

### Passo 3: Verificar
Execute esta query:

```sql
SELECT policyname, cmd, roles::text 
FROM pg_policies 
WHERE tablename = 'candidaturas';
```

**Deve mostrar 4 políticas:**
- `candidaturas_public_insert` - INSERT - `{public}` ✅
- `candidaturas_authenticated_select` - SELECT - `{authenticated}` ✅
- `candidaturas_authenticated_update` - UPDATE - `{authenticated}` ✅
- `candidaturas_authenticated_delete` - DELETE - `{authenticated}` ✅

### Passo 4: Testar
1. Recarregue a página (Ctrl+F5)
2. Acesse `/pessoas/carreiras`
3. Preencha e envie o formulário
4. **Deve funcionar!** ✅

## 🔐 Segurança Garantida

As políticas criadas garantem:

- ✅ **INSERT público**: Formulário funciona
- ❌ **SELECT bloqueado**: Público não vê candidaturas
- ❌ **UPDATE bloqueado**: Público não atualiza
- ❌ **DELETE bloqueado**: Público não deleta
- ✅ **Admin autenticado**: Pode fazer tudo

## 📝 Código Final (Já está correto - não precisa mudar)

```typescript
// src/lib/supabase/services/candidaturas.ts
export async function createCandidatura(input: CreateCandidaturaInput) {
  const { data, error } = await supabase
    .from('candidaturas')
    .insert({
      ...input,
      status: 'pendente',  // ✅ Sempre pendente
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao criar candidatura: ${error.message}`);
  }

  return data as Candidatura;
}
```

**Chamada no formulário (já está assim):**
```typescript
await createCandidatura({
  primeiro_nome: formData.primeiroNome,
  ultimo_nome: formData.ultimoNome,
  // ... outros campos
});
```

## 🚫 NÃO use Service Role Key!

**NUNCA** use `service_role` key no frontend! Isso seria um risco de segurança crítico.

**Solução correta**: `anon` key + políticas RLS ✅

## ✅ Pronto!

Após executar o script SQL, tudo deve funcionar. Seu código já está correto!

