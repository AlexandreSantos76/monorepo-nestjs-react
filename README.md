# Monorepo init project NESTJS/VITE-REACT

Este é um projeto monorepo que utiliza **pnpm** para gerenciamento de workspaces, com um backend em **NestJS** e um frontend em **React/Vite**. O projeto é otimizado com **Nx** para builds, testes e cache inteligentes, e utiliza **Drizzle** para o ORM do banco de dados.

## 🚀 Como Iniciar

Siga os passos abaixo para clonar o repositório e colocar o projeto em funcionamento.

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/seu-monorepo.git](https://github.com/seu-usuario/seu-monorepo.git)
    cd seu-monorepo
    ```

2.  **Instale as dependências:**
    Na raiz do projeto, instale todas as dependências do monorepo.

    ```bash
    pnpm install
    ```

3.  **Configure o `.env`:**
    Crie um arquivo `.env` na raiz do seu projeto e adicione as variáveis de ambiente necessárias. A mais importante é a URL de conexão com o banco de dados.

    ```
    # Exemplo de .env
    DATABASE_URL="postgresql://user:password@host:port/database"
    ```

4.  **Inicie os projetos:**
    Para rodar os dois projetos simultaneamente, você pode usar os comandos do Nx:

    ```bash
    # Para rodar o frontend React (frontend-web)
    nx run frontend-web:dev

    # Em outro terminal, para rodar o backend NestJS (backend-api)
    nx run backend-api:dev
    ```

## 🛠️ Scripts e Comandos Importantes

Todos os comandos devem ser executados a partir da **raiz** do monorepo, usando o filtro do pnpm (`pnpm --filter`) ou os comandos do Nx (`nx run`).

- **`pnpm run build`**: Compila todos os projetos.
- **`pnpm run lint`**: Executa o linter em todos os projetos.
- **`pnpm run test`**: Roda todos os testes.

## ⚙️ Gerenciamento de Banco de Dados com Drizzle-kit

Utilizamos o Drizzle-kit para gerenciar o esquema do banco de dados e as migrations. O fluxo de trabalho é dividido em dois comandos principais.

### Introspecção (gerar o Schema a partir do Banco)

Este comando é usado para criar o esquema do banco de dados (`schema.ts`) a partir de um banco de dados existente.

**IMPORTANTE:** O Drizzle-kit salva todos os arquivos gerados por este comando na pasta de migrations (`src/database/migrations`). Você deve **mover manualmente** os arquivos de `schema.ts` e `relations.ts` para a pasta correta, `src/database/schema`.

```bash
# Executar a introspecção no projeto backend
pnpm --filter=backend-api db:introspect

Após rodar este comando, mova os arquivos:

src/database/migrations/schema.ts -> src/database/schema/schema.ts

src/database/migrations/relations.ts -> src/database/schema/relations.ts

Migrations (gerar migrations a partir do Schema)
Após realizar mudanças no arquivo de esquema, use este comando para gerar uma nova migration.

Bash

# Gerar uma nova migration
pnpm --filter=backend-api db:migrate
Aplicar Migrations
Para aplicar as migrations no banco de dados.

Bash

# Aplicar as migrations pendentes
pnpm --filter=backend-api db:push
```
