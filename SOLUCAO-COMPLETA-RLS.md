# 🔒 Solução Completa: RLS para Candidaturas

## 📋 Análise do Código Atual

### ✅ Cliente Supabase (CORRETO)
```typescript
// src/lib/supabase/client.ts
export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseAnonKey,  // ✅ Usando chave anon (correto para frontend)
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
```

**Status**: ✅ **CORRETO** - Está usando `VITE_SUPABASE_ANON_KEY` que é a chave pública segura para frontend.

### ✅ Service de Candidaturas (CORRETO)
```typescript
// src/lib/supabase/services/candidaturas.ts
export async function createCandidatura(input: CreateCandidaturaInput) {
  const { data, error } = await supabase
    .from('candidaturas')
    .insert({
      ...input,
      status: 'pendente',  // ✅ Sempre define status como pendente
    })
    .select()
    .single();
  // ...
}
```

**Status**: ✅ **CORRETO** - O código está implementado corretamente.

### ❌ Problema Identificado

O problema **NÃO está no código**, mas sim nas **políticas RLS do Supabase**. As políticas atuais não permitem que usuários anônimos façam INSERT.

## 🔧 Solução: Políticas RLS Seguras

### Passo 1: Executar Script SQL

1. Acesse **Supabase Dashboard** → **SQL Editor**
2. Execute o arquivo: `supabase/rls-candidaturas-SEGURO.sql`
3. O script criará políticas que:
   - ✅ Permitem INSERT público (formulário funciona)
   - ❌ Bloqueiam SELECT/UPDATE/DELETE para público
   - ✅ Permitem tudo para autenticados (admin)

### Passo 2: Verificar Políticas

Execute esta query para verificar:

```sql
SELECT 
    policyname,
    cmd,
    roles::text
FROM pg_policies 
WHERE tablename = 'candidaturas'
ORDER BY cmd;
```

**Resultado esperado:**
```
candidaturas_public_insert          | INSERT | {public}
candidaturas_authenticated_select   | SELECT | {authenticated}
candidaturas_authenticated_update   | UPDATE | {authenticated}
candidaturas_authenticated_delete   | DELETE | {authenticated}
```

### Passo 3: Testar

1. Recarregue a página (Ctrl+F5)
2. Acesse `/pessoas/carreiras`
3. Preencha o formulário
4. Envie a candidatura
5. **Deve funcionar!** ✅

## 🔐 Segurança das Políticas

### ✅ O que está protegido:

1. **INSERT Público**: 
   - Permite criar candidaturas
   - Valida que campos obrigatórios estão preenchidos
   - Força `status = 'pendente'` (não pode criar com outro status)

2. **SELECT Bloqueado para Público**:
   - Usuários anônimos NÃO podem ver candidaturas
   - Apenas admins autenticados podem ver

3. **UPDATE Bloqueado para Público**:
   - Usuários anônimos NÃO podem atualizar candidaturas
   - Apenas admins autenticados podem atualizar

4. **DELETE Bloqueado para Público**:
   - Usuários anônimos NÃO podem deletar candidaturas
   - Apenas admins autenticados podem deletar

## 📝 Código Final (Já está correto)

O código que você tem já está correto. Não precisa mudar nada:

```typescript
// src/lib/supabase/services/candidaturas.ts
export async function createCandidatura(
  input: CreateCandidaturaInput
): Promise<Candidatura> {
  const { data, error } = await supabase
    .from('candidaturas')
    .insert({
      ...input,
      status: 'pendente',  // ✅ Sempre pendente
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar candidatura:', error);
    throw new Error(`Erro ao criar candidatura: ${error.message}`);
  }

  return data as Candidatura;
}
```

**Chamada no formulário:**
```typescript
// src/pages/pessoas/Carreiras.tsx
await createCandidatura({
  primeiro_nome: formData.primeiroNome,
  ultimo_nome: formData.ultimoNome,
  // ... outros campos
  curriculum_vitae_url: curriculumVitaeUrl,
  bilhete_identidade_url: bilheteIdentidadeUrl,
  certificados_url: certificadosUrl,
});
```

## 🧪 Teste Local

Após executar o script SQL, teste localmente:

1. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

2. **Acesse:** `http://localhost:8080/pessoas/carreiras`

3. **Preencha o formulário** com dados de teste

4. **Envie a candidatura**

5. **Verifique no Supabase:**
   - Dashboard → Table Editor → `candidaturas`
   - Deve ver a nova candidatura criada

## 🚫 Por que NÃO usar Service Role Key?

**NÃO use `service_role` key no frontend!** Isso seria um **risco de segurança grave** porque:

- ❌ A service_role key bypassa todas as políticas RLS
- ❌ Qualquer pessoa pode ver a chave no código JavaScript
- ❌ Permite acesso total ao banco de dados
- ❌ Violação de segurança crítica

**Solução correta**: Usar `anon` key + políticas RLS bem configuradas ✅

## ✅ Checklist Final

- [ ] Script SQL `rls-candidaturas-SEGURO.sql` executado
- [ ] Políticas verificadas (4 políticas criadas)
- [ ] Variáveis de ambiente configuradas (`.env`)
- [ ] Página recarregada (hard refresh)
- [ ] Formulário testado e funcionando
- [ ] Candidatura aparece no Supabase

## 📚 Arquivos Criados

1. `supabase/rls-candidaturas-SEGURO.sql` - Script SQL com políticas seguras
2. `SOLUCAO-COMPLETA-RLS.md` - Esta documentação

## 🆘 Se ainda não funcionar

1. Verifique se o script SQL foi executado sem erros
2. Verifique se as políticas foram criadas:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'candidaturas';
   ```
3. Verifique variáveis de ambiente no `.env`
4. Verifique console do navegador para outros erros
5. Verifique logs do Supabase (Dashboard → Logs)

