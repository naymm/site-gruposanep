# ⚡ EXECUTAR AGORA - Corrigir Erro RPC

## ❌ Erro Atual

```
Could not find the function public.criar_candidatura(...) in the schema cache
```

## ✅ SOLUÇÃO IMEDIATA

### Passo 1: Executar Script SQL

1. Acesse **Supabase Dashboard** → **SQL Editor**
2. Execute: `supabase/rpc-candidaturas-FIX.sql`
3. Este script:
   - Remove função antiga (se existir)
   - Cria função nova corretamente
   - Configura permissões
   - Tenta atualizar schema cache

### Passo 2: Aguardar ou Reiniciar

**Opção A - Aguardar (Recomendado):**
- Aguarde 1-2 minutos após executar o script
- O schema cache atualiza automaticamente

**Opção B - Reiniciar Projeto:**
1. Supabase Dashboard → Settings → General
2. Clique em **Restart project**
3. Aguarde 2-3 minutos

### Passo 3: Verificar se Funcionou

Execute no SQL Editor:

```sql
SELECT routine_name, routine_type, security_type
FROM information_schema.routines
WHERE routine_schema = 'public' 
AND routine_name = 'criar_candidatura';
```

**Deve retornar:**
- `routine_name`: `criar_candidatura`
- `routine_type`: `FUNCTION`
- `security_type`: `DEFINER`

### Passo 4: Testar

1. Recarregue a página (Ctrl+F5)
2. Acesse `/pessoas/carreiras`
3. Preencha e envie o formulário
4. **Deve funcionar!** ✅

## 🔍 Se AINDA não funcionar

### Verificar Parâmetros

Execute para ver os parâmetros esperados:

```sql
SELECT 
    parameter_name,
    data_type,
    ordinal_position
FROM information_schema.parameters
WHERE specific_schema = 'public'
AND specific_name = (
    SELECT specific_name 
    FROM information_schema.routines 
    WHERE routine_name = 'criar_candidatura'
    LIMIT 1
)
ORDER BY ordinal_position;
```

Compare com os parâmetros no código TypeScript.

### Verificar Permissões

```sql
SELECT grantee, privilege_type
FROM information_schema.routine_privileges
WHERE routine_schema = 'public'
AND routine_name = 'criar_candidatura';
```

**Deve mostrar:**
- `anon` - EXECUTE ✅
- `authenticated` - EXECUTE ✅

## 🆘 Solução Alternativa

Se a função RPC continuar dando problemas, use RLS direto:

1. Execute: `supabase/rls-candidaturas-SEGURO.sql`
2. Reverta o código para INSERT direto (já está no histórico do git)

## 📋 Checklist

- [ ] Script `rpc-candidaturas-FIX.sql` executado
- [ ] Função existe? (verificar com SELECT)
- [ ] Permissões configuradas? (verificar com SELECT)
- [ ] Aguardou 1-2 min ou reiniciou projeto?
- [ ] Página recarregada (hard refresh)?
- [ ] Formulário testado?



