# Configuração do GitHub Stats

Para mostrar seu gráfico real de contribuições do GitHub no portfólio, siga estes passos:

## 1. Criar Personal Access Token

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token (classic)"**
3. Dê um nome ao token (ex: "Portfolio Stats")
4. Selecione a permissão: **✓ read:user**
5. Clique em **"Generate token"**
6. **COPIE O TOKEN** (você só verá ele uma vez!)

## 2. Adicionar Token ao Repositório

1. No seu repositório do portfólio, vá em **Settings**
2. No menu lateral, clique em **Secrets and variables** → **Actions**
3. Clique em **"New repository secret"**
4. Nome: `GITHUB_TOKEN`
5. Valor: cole o token que você copiou
6. Clique em **"Add secret"**

## 3. Executar o Workflow

O workflow irá rodar automaticamente:
- Todo dia à meia-noite (UTC)
- A cada push na branch main
- Você também pode executar manualmente em **Actions** → **Update GitHub Stats** → **Run workflow**

## 4. Verificar

Após executar o workflow:
1. Ele irá criar/atualizar o arquivo `github-stats.json`
2. Faça pull das alterações no seu computador
3. O gráfico de commits irá aparecer automaticamente no seu portfólio

## Segurança

✅ **O token NUNCA fica exposto no código**  
✅ Fica seguro nas "Secrets" do GitHub  
✅ Só o workflow do GitHub Actions pode acessá-lo  
✅ O arquivo `github-stats.json` só contém dados públicos do gráfico

## Problemas?

Se o workflow falhar:
1. Verifique se o token foi criado corretamente
2. Confirme que a secret `GITHUB_TOKEN` foi adicionada ao repositório
3. Veja os logs em **Actions** → **Update GitHub Stats** para identificar o erro

## Dados do Gráfico

O gráfico mostra:
- **Total de contribuições** nos últimos 12 meses
- **Atividade diária** (commits, PRs, issues, code reviews)
- **Intensidade** (quanto mais verde, mais atividade)

Os dados são atualizados automaticamente todo dia!
