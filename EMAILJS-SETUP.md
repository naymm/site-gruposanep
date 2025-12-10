# Configuração do EmailJS

Este guia explica como configurar o EmailJS para o formulário de contato.

## 📋 Pré-requisitos

1. Conta no [EmailJS](https://www.emailjs.com/) (gratuita)
2. Um serviço de email configurado (Gmail, Outlook, etc.)

## 🚀 Passo a Passo

### 1. Criar Conta no EmailJS

1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Faça login no dashboard

### 2. Configurar Serviço de Email

1. No dashboard, vá em **Email Services**
2. Clique em **Add New Service**
3. Escolha seu provedor de email (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta
5. Anote o **Service ID** gerado

### 3. Criar Template de Email

1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. Use o template padrão ou crie um personalizado
4. Configure as variáveis do template:
   - `{{from_name}}` - Nome do remetente
   - `{{from_email}}` - Email do remetente
   - `{{phone}}` - Telefone
   - `{{subject}}` - Assunto
   - `{{message}}` - Mensagem
   - `{{to_email}}` - Email de destino

**Exemplo de Template:**
```
De: {{from_name}} ({{from_email}})
Telefone: {{phone}}
Assunto: {{subject}}

Mensagem:
{{message}}
```

5. Anote o **Template ID** gerado

### 4. Obter Public Key

1. Vá em **Account** > **General**
2. Copie a **Public Key**

### 5. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto (se não existir)
2. Adicione as seguintes variáveis:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=seu_template_id_aqui
VITE_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
```

3. Substitua os valores pelos IDs obtidos no EmailJS

### 6. Reiniciar o Servidor

Após adicionar as variáveis de ambiente, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 📝 Estrutura do Template

O formulário envia os seguintes parâmetros:

- `from_name`: Nome completo do remetente
- `from_email`: Email do remetente
- `phone`: Telefone (opcional)
- `subject`: Assunto selecionado
- `message`: Mensagem do usuário
- `to_email`: Email de destino (geral@gruposanep.co.ao)

## 🔒 Segurança

- A **Public Key** é segura para uso no frontend
- O EmailJS tem limite de 200 emails/mês no plano gratuito
- Para produção, considere usar um plano pago

## 🐛 Troubleshooting

### Erro: "O serviço de email não está configurado"

- Verifique se o arquivo `.env` existe na raiz do projeto
- Verifique se as variáveis começam com `VITE_`
- Reinicie o servidor após adicionar as variáveis

### Erro ao enviar email

- Verifique se o Service ID está correto
- Verifique se o Template ID está correto
- Verifique se a Public Key está correta
- Verifique se o template tem todas as variáveis necessárias

### Email não chega

- Verifique a pasta de spam
- Verifique se o serviço de email está configurado corretamente
- Verifique os logs no dashboard do EmailJS

## 📚 Recursos

- [Documentação do EmailJS](https://www.emailjs.com/docs/)
- [Exemplos de Templates](https://www.emailjs.com/docs/examples/reactjs/)


