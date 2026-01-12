This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Desenvolvimento Local (sem Docker)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Docker Compose

Para rodar o projeto com Docker e PostgreSQL:

1. **Crie um arquivo `.env` na raiz do projeto** com as seguintes variáveis (ou use os valores padrão):

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nextjs_saas
POSTGRES_PORT=5432
NEXTJS_PORT=3000
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/nextjs_saas
```

2. **Execute o Docker Compose**:

```bash
docker compose up
```

Ou para rodar em background:

```bash
docker compose up -d
```

3. **Acesse a aplicação**:
   - Next.js: http://localhost:3000
   - PostgreSQL: localhost:5432

**Comandos úteis do Docker Compose:**

```bash
# Parar os containers
docker compose down

# Parar e remover volumes (apaga dados do banco)
docker compose down -v

# Ver logs
docker compose logs -f

# Rebuild após mudanças
docker compose up --build
```

## Estrutura do Projeto

- `app/` - Diretório principal da aplicação Next.js
- `components/` - Componentes React reutilizáveis
- `lib/` - Utilitários e helpers
- `hooks/` - React hooks customizados

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
