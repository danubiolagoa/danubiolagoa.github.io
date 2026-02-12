# 📍 Guia Visual: Onde Colocar o Token do GitHub

## ⚠️ IMPORTANTE: O token NUNCA vai em um arquivo!

O token deve ser adicionado na **interface web do GitHub**, não em nenhum arquivo do seu computador.

---

## 🎯 Passo a Passo com Imagens (mentalmente)

### PASSO 1: Criar o Token (no site do GitHub)
```
1. Acesse: https://github.com/settings/tokens
2. Clique no botão verde: "Generate new token (classic)"
3. Em "Note", escreva: Portfolio Stats
4. Em "Expiration", escolha: No expiration (ou 90 dias)
5. MARQUE a caixinha: ☑️ read:user
6. Clique no botão verde: "Generate token"
7. COPIE o token (é uma string longa tipo: ghp_xxxxxxxxxxxx)
   ⚠️ IMPORTANTE: Você só verá esse token UMA VEZ!
```

---

### PASSO 2: Adicionar o Token ao Repositório (no site do GitHub)

Agora você precisa colar esse token no seu repositório do portfólio:

```
1. Acesse seu repositório no GitHub:
   https://github.com/danubiolagoa/portfoliotech
   
2. Clique na aba: "Settings" (última aba, tem um ícone de engrenagem)

3. No menu lateral esquerdo:
   - Clique em "Secrets and variables" (vai expandir)
   - Clique em "Actions"
   
4. Você verá um botão verde: "New repository secret"
   - Clique nele
   
5. Preencha:
   - Name: GITHUB_TOKEN
   - Value: cole aqui o token que você copiou no passo 1
   
6. Clique no botão verde: "Add secret"
```

---

### PASSO 3: Executar o Workflow (no site do GitHub)

```
1. No seu repositório, clique na aba: "Actions"

2. Você verá um workflow chamado: "Update GitHub Stats"
   - Clique nele
   
3. Clique no botão cinza: "Run workflow" (lado direito)
   - Depois confirme clicando no botão verde: "Run workflow"
   
4. Aguarde 1-2 minutos
   - Ele vai criar o arquivo github-stats.json automaticamente
```

---

### PASSO 4: Atualizar seu Computador

```
Depois que o workflow terminar (ficar verde com um ✓):

1. No seu computador, abra o terminal na pasta do projeto
2. Execute: git pull
3. Pronto! O arquivo github-stats.json foi baixado
```

---

## ❌ Onde NÃO colocar o token:

- ❌ NÃO coloque no arquivo script.js
- ❌ NÃO coloque no arquivo index.html
- ❌ NÃO coloque no arquivo styles.css
- ❌ NÃO coloque em NENHUM arquivo!

## ✅ Onde SIM colocar o token:

- ✅ Nas "Secrets" do repositório no site do GitHub
- ✅ Vai em: Seu Repo → Settings → Secrets and variables → Actions → New secret

---

## 🔄 Resumo Visual:

```
┌─────────────────────────────────────┐
│   SEU COMPUTADOR (arquivos locais)  │
│   ❌ NÃO coloca o token aqui!       │
└─────────────────────────────────────┘
                   ↑
                   │ git push
                   ↓
┌─────────────────────────────────────┐
│   GITHUB.COM (site)                 │
│   ✅ Coloca o token aqui:           │
│   Settings → Secrets → Actions      │
└─────────────────────────────────────┘
                   ↑
                   │ workflow roda
                   ↓
┌─────────────────────────────────────┐
│   GITHUB.COM (mesmo site)           │
│   Cria arquivo github-stats.json    │
└─────────────────────────────────────┘
                   ↑
                   │ git pull
                   ↓
┌─────────────────────────────────────┐
│   SEU COMPUTADOR                    │
│   Arquivo baixado automaticamente   │
└─────────────────────────────────────┘
```

---

## 🆘 Se ainda estiver confuso:

Me diga em qual passo você está travado que eu ajudo! Você já:
- [ ] Criou o token no passo 1?
- [ ] Adicionou o secret no passo 2?
- [ ] Executou o workflow no passo 3?

Qual desses está te dificultando?
