# Auréa Clinic

Landing page premium para clínica de estética, criada para demonstração comercial.

## Estrutura

- `index.html` — estrutura e conteúdo da página
- `styles.css` — identidade visual, layout responsivo e animações
- `script.js` — menu mobile, scroll reveal, comparador Antes/Depois, carousel e contadores
- `preview-server.cjs` — servidor local opcional para testar o site com Node.js

## Como publicar manualmente no GitHub

1. Crie um repositório novo no GitHub, de preferência vazio.
2. No repositório, clique em **Add file → Upload files**.
3. Arraste os arquivos `index.html`, `styles.css`, `script.js`, `preview-server.cjs`, `README.md` e `.gitignore`.
4. Clique em **Commit changes**.

O site é estático e não precisa de build, banco de dados ou variáveis de ambiente.

## Como testar localmente

Com Node.js instalado, execute:

```bash
node preview-server.cjs
```

Depois abra <http://127.0.0.1:5173>.

## Publicar na Vercel a partir do GitHub

Na Vercel, escolha **Add New → Project**, importe o repositório e mantenha as configurações padrão:

- Framework Preset: **Other**
- Build Command: deixar vazio
- Output Directory: `.`
- Install Command: deixar vazio

Clique em **Deploy**. O arquivo `index.html` será servido como página inicial.

## Observações

Os dados de contato, endereço, Instagram, profissional responsável e número do WhatsApp são demonstrativos e devem ser substituídos pelos dados reais da clínica antes de uma publicação comercial.

As imagens usadas no mockup são carregadas por URLs externas. Para uma versão definitiva, substitua-as por imagens próprias/licenciadas e atualize as URLs em `index.html` e `styles.css`.
