# 🔧 Troubleshooting: Erro "Could not find the function"

## ❌ Erro Encontrado

```
Could not find the function public.criar_candidatura(...) in the schema cache
```

## 🔍 Causas Possíveis

1. **Função não foi criada** - Script SQL não foi executado
2. **Schema cache desatualizado** - PostgREST precisa recarregar
3. **Ordem dos parâmetros diferente** - Parâmetros não batem
4. **Tipos de dados diferentes** - Tipos não correspondem

## ✅ Solução Passo a Passo

### Passo 1: Verificar se a função existe

Execute no SQL Editor:

```sql
SELECT 
    routine_name,
    routine_type,
    security_type
FROM information_schema.routines
WHERE routine_schema = 'public' 
AND routine_name = 'criar_candidatura';
```

**Se não retornar nada**: A função não foi criada. Execute o script SQL.

**Se retornar algo**: A função existe, mas o cache precisa ser atualizado.

### Passo 2: Executar Script de Correção

1. Acesse **Supabase Dashboard** → **SQL Editor**
2. Execute: `supabase/rpc-candidaturas-FIX.sql`
3. Este script:
   - Remove função antiga (se existir)
   - Cria função nova
   - Força atualização do schema cache

### Passo 3: Verificar Parâmetros

Execute para ver os parâmetros esperados:

```sql
SELECT 
    parameter_name,
    data_type,
    parameter_default
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

### Passo 4: Recarregar Schema Cache

Após executar o script, o cache deve ser atualizado automaticamente. Se não funcionar:

1. **Opção 1**: Aguarde 1-2 minutos (cache atualiza automaticamente)
2. **Opção 2**: Reinicie o projeto no Supabase Dashboard
   - Settings → General → Restart project

### Passo 5: Testar a Função

Teste diretamente no SQL Editor:

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

**Se funcionar**: A função está OK, o problema é no cache do frontend.

**Se não funcionar**: Verifique os erros retornados.

## 🔄 Solução Alternativa: Usar RLS Direto

Se a função RPC continuar dando problemas, você pode usar a solução RLS direto:

1. Execute: `supabase/rls-candidaturas-SEGURO.sql`
2. Reverta o código para usar INSERT direto (já está no histórico)

## 📋 Checklist de Verificação

- [ ] Função existe no banco? (verificar com SELECT)
- [ ] Permissões EXECUTE configuradas? (verificar com SELECT)
- [ ] Script SQL executado sem erros?
- [ ] Schema cache atualizado? (aguardar 1-2 min ou reiniciar projeto)
- [ ] Parâmetros no código batem com a função?
- [ ] Teste direto no SQL funciona?

## 🆘 Se Nada Funcionar

1. **Verifique logs do Supabase**: Dashboard → Logs → API
2. **Verifique console do navegador**: F12 → Console
3. **Teste com curl** (substitua URL e KEY):

```bash
curl -X POST 'https://seu-projeto.supabase.co/rest/v1/rpc/criar_candidatura' \
  -H "apikey: sua-chave-anon" \
  -H "Content-Type: application/json" \
  -d '{
    "p_primeiro_nome": "João",
    "p_ultimo_nome": "Silva",
    "p_nacionalidade": "Angolana",
    "p_data_nascimento": "1990-01-01",
    "p_residencia": "Luanda",
    "p_contacto": "+244 999 999 999",
    "p_email": "joao@teste.com",
    "p_area_educacao": "Engenharia",
    "p_grau_academico": "licenciatura",
    "p_instituicao": "Universidade",
    "p_situacao_profissional": "empregado",
    "p_grau_experiencia": "junior",
    "p_area_atividade": "Tecnologia",
    "p_nome_empresa": "Empresa Teste",
    "p_funcao_cargo": "Desenvolvedor"
  }'
```

Se o curl funcionar, o problema é no código TypeScript.

