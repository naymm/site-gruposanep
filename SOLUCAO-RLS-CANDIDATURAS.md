# 🔧 Solução: Erro RLS para Candidaturas

## ❌ Erro Encontrado

```
Error: Erro ao criar candidatura: new row violates row-level security policy for table "candidaturas"
```

Este erro ocorre porque a política RLS não está permitindo que usuários anônimos criem candidaturas.

## ✅ Solução Rápida

### Opção 1: Executar Script de Correção (Recomendado)

1. Acesse o **Supabase Dashboard**
2. Vá em **SQL Editor**
3. Abra o arquivo `supabase/fix-candidaturas-rls.sql`
4. Copie todo o conteúdo
5. Cole no SQL Editor
6. Clique em **Run**

Isso corrigirá as políticas RLS para:
- ✅ Qualquer pessoa pode criar candidaturas (público)
- ✅ Apenas usuários autenticados podem ver candidaturas
- ✅ Apenas usuários autenticados podem atualizar candidaturas
- ✅ Apenas usuários autenticados podem deletar candidaturas

### Opção 2: Criar Política Manualmente

No SQL Editor do Supabase, execute:

```sql
-- Remover política antiga (se existir)
DROP POLICY IF EXISTS "Qualquer pessoa pode criar candidaturas" ON candidaturas;

-- Criar nova política usando 'public' em vez de 'anon, authenticated'
CREATE POLICY "Qualquer pessoa pode criar candidaturas"
  ON candidaturas FOR INSERT
  TO public
  WITH CHECK (true);
```

## 🔍 Verificar Políticas

Para verificar se as políticas foram criadas corretamente:

```sql
SELECT * FROM pg_policies WHERE tablename = 'candidaturas';
```

Você deve ver 4 políticas:
1. ✅ Qualquer pessoa pode criar candidaturas (INSERT, public)
2. ✅ Usuários autenticados podem ver candidaturas (SELECT, authenticated)
3. ✅ Usuários autenticados podem atualizar candidaturas (UPDATE, authenticated)
4. ✅ Usuários autenticados podem deletar candidaturas (DELETE, authenticated)

## 📝 Nota Importante

A diferença entre `TO anon, authenticated` e `TO public`:

- `TO anon, authenticated`: Pode não funcionar em todas as versões do Supabase
- `TO public`: Funciona para todos os usuários, incluindo anônimos (recomendado)

## 🧪 Testar

Após executar o script:

1. Acesse a página de candidaturas: `/pessoas/carreiras`
2. Preencha o formulário
3. Envie a candidatura
4. Deve funcionar sem erros!

## 🐛 Se ainda não funcionar

1. Verifique se a tabela `candidaturas` existe:
   ```sql
   SELECT * FROM information_schema.tables WHERE table_name = 'candidaturas';
   ```

2. Verifique se o RLS está habilitado:
   ```sql
   SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'candidaturas';
   ```
   Deve retornar `rowsecurity = true`

3. Verifique todas as políticas:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'candidaturas';
   ```

4. Se necessário, desabilite temporariamente o RLS para testar:
   ```sql
   ALTER TABLE candidaturas DISABLE ROW LEVEL SECURITY;
   ```
   ⚠️ **Atenção**: Reabilite o RLS após os testes!



