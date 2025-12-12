# 🔒 Solução RPC com SECURITY DEFINER (Mais Segura)

## 🎯 Por que esta solução é melhor?

### ✅ Vantagens da Função RPC:

1. **🔒 RLS Totalmente Fechado**: A tabela pode ter RLS bloqueando tudo para público
2. **🛡️ Controle Total**: Apenas a função específica pode fazer INSERT
3. **✅ Validações**: Podemos adicionar validações na função
4. **🔐 Segurança**: SECURITY DEFINER executa com privilégios elevados, mas de forma controlada
5. **📝 Auditoria**: Mais fácil rastrear quem criou o quê

### ❌ Desvantagens de abrir RLS na tabela:

1. Qualquer INSERT direto pode ser feito
2. Menos controle sobre validações
3. Mais difícil de auditar

## 🚀 Implementação

### Passo 1: Executar Script SQL

1. Acesse **Supabase Dashboard** → **SQL Editor**
2. Execute: `supabase/rpc-candidaturas-SEGURO.sql`
3. Isso criará:
   - Função RPC `criar_candidatura`
   - Permissões para `anon` e `authenticated`
   - RLS fechado na tabela

### Passo 2: Código Atualizado

O código já foi atualizado para usar RPC:

```typescript
// src/lib/supabase/services/candidaturas.ts
export async function createCandidatura(input: CreateCandidaturaInput) {
  const { data: candidaturaId, error } = await supabase.rpc(
    'criar_candidatura',
    {
      p_primeiro_nome: input.primeiro_nome,
      p_ultimo_nome: input.ultimo_nome,
      // ... outros parâmetros
    }
  );
  
  // ...
}
```

### Passo 3: Testar

1. Recarregue a página (Ctrl+F5)
2. Acesse `/pessoas/carreiras`
3. Preencha e envie o formulário
4. **Deve funcionar!** ✅

## 🔐 Segurança

### Como funciona:

1. **Tabela com RLS fechado**: Público não pode fazer INSERT direto
2. **Função RPC com SECURITY DEFINER**: Executa com privilégios do criador da função
3. **Permissão EXECUTE**: Apenas `anon` pode executar a função
4. **Validações na função**: Email, campos obrigatórios, etc.

### Validações implementadas:

- ✅ Campos obrigatórios não podem ser NULL
- ✅ Validação de formato de email
- ✅ Status sempre inicia como 'pendente'
- ✅ Todos os campos são validados antes do INSERT

## 📊 Comparação de Abordagens

| Aspecto | RLS Aberto | RPC com SECURITY DEFINER |
|---------|------------|--------------------------|
| Segurança | ⚠️ Média | ✅ Alta |
| Controle | ⚠️ Limitado | ✅ Total |
| Validações | ⚠️ No frontend | ✅ No backend |
| Auditoria | ⚠️ Difícil | ✅ Fácil |
| Manutenção | ✅ Simples | ⚠️ Mais complexa |

## 🧪 Teste da Função

Para testar diretamente no SQL:

```sql
SELECT public.criar_candidatura(
  'João'::text,
  'Silva'::text,
  'Angolana'::text,
  '1990-01-01'::date,
  'Luanda'::text,
  '+244 999 999 999'::text,
  NULL::text,
  'joao@teste.com'::text,
  'Engenharia'::text,
  'licenciatura'::text,
  'Universidade'::text,
  'empregado'::text,
  'junior'::text,
  'Tecnologia'::text,
  'Empresa Teste'::text,
  'Desenvolvedor'::text,
  NULL::text,
  NULL::text,
  NULL::text
);
```

## 🔍 Verificações

### Verificar função criada:

```sql
SELECT 
  routine_name,
  routine_type,
  security_type
FROM information_schema.routines
WHERE routine_schema = 'public' 
AND routine_name = 'criar_candidatura';
```

### Verificar permissões:

```sql
SELECT 
  grantee,
  privilege_type
FROM information_schema.routine_privileges
WHERE routine_schema = 'public'
AND routine_name = 'criar_candidatura';
```

**Deve mostrar:**
- `anon` - EXECUTE ✅
- `authenticated` - EXECUTE ✅

### Verificar RLS na tabela:

```sql
SELECT 
  policyname,
  cmd,
  roles::text
FROM pg_policies
WHERE tablename = 'candidaturas';
```

**Deve mostrar apenas:**
- `candidaturas_authenticated_all` - ALL - `{authenticated}` ✅

## 📝 Código Final

### Service (já atualizado):

```typescript
export async function createCandidatura(input: CreateCandidaturaInput) {
  const { data: candidaturaId, error } = await supabase.rpc(
    'criar_candidatura',
    {
      p_primeiro_nome: input.primeiro_nome,
      p_ultimo_nome: input.ultimo_nome,
      p_nacionalidade: input.nacionalidade,
      p_data_nascimento: input.data_nascimento,
      p_residencia: input.residencia,
      p_contacto: input.contacto,
      p_contacto_alternativo: input.contacto_alternativo || null,
      p_email: input.email,
      p_area_educacao: input.area_educacao,
      p_grau_academico: input.grau_academico,
      p_instituicao: input.instituicao,
      p_situacao_profissional: input.situacao_profissional,
      p_grau_experiencia: input.grau_experiencia,
      p_area_atividade: input.area_atividade,
      p_nome_empresa: input.nome_empresa,
      p_funcao_cargo: input.funcao_cargo,
      p_curriculum_vitae_url: input.curriculum_vitae_url || null,
      p_bilhete_identidade_url: input.bilhete_identidade_url || null,
      p_certificados_url: input.certificados_url || null,
    }
  );

  if (error) {
    throw new Error(`Erro ao criar candidatura: ${error.message}`);
  }

  // Retornar dados básicos (SELECT pode ser bloqueado por RLS)
  return {
    id: candidaturaId,
    ...input,
    status: 'pendente',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as Candidatura;
}
```

### Chamada no formulário (não muda):

```typescript
await createCandidatura({
  primeiro_nome: formData.primeiroNome,
  ultimo_nome: formData.ultimoNome,
  // ... outros campos
});
```

## ✅ Checklist

- [ ] Script SQL `rpc-candidaturas-SEGURO.sql` executado
- [ ] Função `criar_candidatura` criada
- [ ] Permissões EXECUTE configuradas
- [ ] RLS na tabela fechado para público
- [ ] Código atualizado para usar RPC
- [ ] Formulário testado e funcionando

## 🎉 Resultado Final

- 🔒 **RLS continua fechado** na tabela
- 🟢 **Só a função RPC** aceita INSERT dos anônimos
- ✔️ **Mais seguro** que abrir a tabela
- ✅ **Validações** no backend
- 📝 **Auditoria** facilitada



