# 🚀 Como Criar Seu Repositório no GitHub

## Opção 1: Criar Repositório Novo (Recomendado)

### No site github.com:

```
1. Acesse: https://github.com/new
   (ou clique no botão "+" no canto superior direito → "New repository")

2. Preencha:
   Repository name: portfoliotech
   Description: Meu portfólio de desenvolvedor
   
3. Escolha:
   ☑️ Public (público - qualquer um pode ver)
   
4. MARQUE:
   ☑️ Add a README file
   ☑️ Add .gitignore → escolha "Node"
   
5. Clique no botão verde: "Create repository"
```

---

## Opção 2: Usar Repositório Existente

Se você já tem um repositório (ex: `portfoliotech` ou outro nome), pode usar ele!

---

## Depois de Criar o Repositório

### Enviar seus arquivos locais:

No terminal/prompt do seu computador (na pasta do projeto):

```bash
# Inicializar git (se ainda não tiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Primeira versão do portfólio"

# Conectar com o GitHub (substitua SEU_USUARIO pelo seu nome)
git remote add origin https://github.com/danubiolagoa/portfoliotech.git

# Enviar para o GitHub
git push -u origin main
```

**Ou se estiver na branch "master":**
```bash
git push -u origin master
```

---

## ✅ Verificar se deu certo:

1. Acesse: `https://github.com/danubiolagoa/portfoliotech`
2. Você deve ver todos os arquivos do seu portfólio lá

---

## 🎯 Próximo Passo (Configurar o Token):

Depois que o repositório estiver criado e os arquivos enviados:

1. No site do GitHub, vá no seu repositório
2. Clique em: **Settings** → **Secrets and variables** → **Actions**
3. Clique: **New repository secret**
4. Name: `GITHUB_TOKEN`
5. Value: cole o token que você criou
6. Clique: **Add secret**

---

## ❓ Dúvidas Comuns:

**Q: Qual nome devo dar ao repositório?**  
A: Sugiro `portfoliotech` ou `portfolio` - algo fácil de lembrar

**Q: Precisa ser público?**  
A: Sim, para o GitHub Pages funcionar (se quiser hospedar de graça)

**Q: E se eu já tenho um repositório?**  
A: Pode usar o mesmo! Só precisa adicionar o token nas secrets dele

---

## 🆘 Se der erro no `git push`:

**Erro: "failed to push some refs"**
```bash
# Tente primeiro:
git pull origin main --allow-unrelated-histories

# Depois:
git push origin main
```

**Erro: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/danubiolagoa/portfoliotech.git
git push -u origin main
```

---

## 🎉 Depois de criar o repositório:

Me avise que eu te ajudo a:
1. ✅ Configurar o token
2. ✅ Executar o workflow
3. ✅ Ver o gráfico de commits funcionando!

Qualquer dúvida no caminho, é só perguntar!
