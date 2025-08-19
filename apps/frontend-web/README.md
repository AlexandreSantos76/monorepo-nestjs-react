# ⚛️ Iniciando um Monorepo com NestJS e React (Vite)

![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![pnpm](https://img.shields.io/badge/-pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Nx](https://img.shields.io/badge/-Nx-143055?style=for-the-badge&logo=nx&logoColor=white)
![Drizzle](https://img.shields.io/badge/-Drizzle-000000?style=for-the-badge&logo=drizzle&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

Este projeto é uma **arquitetura monorepo** moderna, utilizando **pnpm** para gerenciamento de workspaces e otimizada com **Nx** para builds, testes e cache inteligentes. Ele foi desenhado para promover a reutilização de código e a modularização de projetos.

O **backend**, construído com **NestJS**, segue as melhores práticas para uma arquitetura robusta e escalável, utilizando princípios de **Clean Code** e **SOLID**. O **frontend**, desenvolvido com **React/Vite**, é configurado para oferecer uma experiência de desenvolvimento ágil e eficiente.

Para o banco de dados, utilizamos o **Drizzle**, um ORM minimalista e performático, que se integra perfeitamente com **PostgreSQL**.

---

## 🚀 Como Começar

Siga os passos abaixo para clonar o repositório e colocar o projeto em funcionamento.

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/seu-monorepo.git](https://github.com/seu-usuario/seu-monorepo.git)
    cd seu-monorepo
    ```

2.  **Instale as dependências:**

    Na raiz do projeto, instale todas as dependências do monorepo de forma eficiente.

    ```bash
    pnpm install
    ```

3.  **Configure o `.env`:**

    Crie um arquivo `.env` na raiz do seu projeto e adicione a variável de ambiente necessária para a conexão com o banco de dados.

    ```
    # Exemplo de .env
    DATABASE_URL="postgresql://user:password@host:port/database"
    ```

4.  **Inicie os projetos:**

    Para rodar o frontend e o backend simultaneamente, você pode usar os comandos do Nx.

    ```bash
    # Para rodar o frontend React
    nx serve frontend-web

    # Em outro terminal, para rodar o backend NestJS
    nx serve backend-api
    ```

---

## 🛠️ Scripts e Comandos Essenciais

Todos os comandos devem ser executados a partir da **raiz** do monorepo, utilizando os poderosos filtros do pnpm (`pnpm --filter`) ou os comandos simplificados do Nx.

- **`pnpm run build`**: Compila todos os projetos da aplicação.
- **`pnpm run lint`**: Executa o linter para garantir a qualidade e padronização do código.
- **`pnpm run test`**: Roda todos os testes unitários e de integração.

---

## ⚙️ Gerenciamento do Banco de Dados com Drizzle

O Drizzle-kit é uma ferramenta leve e poderosa para gerenciar o esquema do banco de dados e as migrations. O fluxo de trabalho é bastante direto:

### 1. Gerar Migrations

Após realizar alterações no esquema do seu banco de dados (arquivos em `src/database/schema`), use este comando para gerar uma nova migration.

````bash
pnpm --filter=backend-api db:migrate

### 2. Aplicar Migrations

Este comando aplica as migrations pendentes no banco de dados, garantindo que a estrutura do DB esteja sempre atualizada com o seu código.

```bash
# Aplicar as migrations pendentes
pnpm --filter=backend-api db:push
````
