# 🔧 Solução: Erro RLS (Row Level Security)

## ❌ Erro Encontrado

```
new row violates row-level security policy for table "noticias"
```

Este erro ocorre porque as políticas RLS não permitem que usuários autenticados criem notícias.

## ✅ Solução Rápida

### Opção 1: Executar Script de Correção (Recomendado)

1. Acesse o **Supabase Dashboard**
2. Vá em **SQL Editor**
3. Abra o arquivo `supabase/fix-rls-policies.sql`
4. Copie todo o conteúdo
5. Cole no SQL Editor
6. Clique em **Run**

Isso criará todas as políticas necessárias para:
- ✅ Usuários autenticados podem criar notícias
- ✅ Usuários autenticados podem editar notícias
- ✅ Usuários autenticados podem deletar notícias
- ✅ Usuários autenticados podem ver todas as notícias (incluindo rascunhos)
- ✅ Público pode ver apenas notícias publicadas

### Opção 2: Criar Políticas Manualmente

No SQL Editor do Supabase, execute:

```sql
-- Permitir que usuários autenticados criem notícias
CREATE POLICY "Usuários autenticados podem criar notícias"
  ON noticias FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Permitir que usuários autenticados atualizem notícias
CREATE POLICY "Usuários autenticados podem atualizar notícias"
  ON noticias FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Permitir que usuários autenticados deletem notícias
CREATE POLICY "Usuários autenticados podem deletar notícias"
  ON noticias FOR DELETE
  TO authenticated
  USING (true);

-- Permitir que usuários autenticados vejam todas as notícias
CREATE POLICY "Usuários autenticados podem ver todas as notícias"
  ON noticias FOR SELECT
  TO authenticated
  USING (true);
```

## 🔍 Verificar Políticas

Para verificar se as políticas foram criadas:

```sql
SELECT * FROM pg_policies WHERE tablename = 'noticias';
```

Você deve ver 5 políticas:
1. Notícias publicadas são públicas para leitura
2. Usuários autenticados podem ver todas as notícias
3. Usuários autenticados podem criar notícias
4. Usuários autenticados podem atualizar notícias
5. Usuários autenticados podem deletar notícias

## 🧪 Testar

Após executar o script:

1. Faça login no painel admin (`/admin/login`)
2. Tente criar uma nova notícia
3. O erro não deve mais aparecer

## 📝 Notas Importantes

- **Autenticação obrigatória**: Certifique-se de estar logado antes de criar/editar notícias
- **RLS ativo**: O RLS está habilitado na tabela `noticias` para segurança
- **Políticas separadas**: Políticas diferentes para SELECT, INSERT, UPDATE e DELETE

## 🆘 Ainda com Problemas?

Se o erro persistir:

1. **Verifique autenticação**:
   ```typescript
   const { data: { user } } = await supabase.auth.getUser();
   console.log('Usuário:', user);
   ```

2. **Verifique políticas**:
   - Execute a query de verificação acima
   - Certifique-se de que todas as políticas existem

3. **Verifique RLS**:
   ```sql
   SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'noticias';
   ```
   - `rowsecurity` deve ser `true`

4. **Limpe e recrie**:
   - Remova todas as políticas: `DROP POLICY ... ON noticias;`
   - Execute o script `fix-rls-policies.sql` novamente


