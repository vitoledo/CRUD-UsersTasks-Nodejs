# Projeto de Teste: CRUD de Usuários e Tarefas

Este projeto é um exercício prático para desenvolver uma API básica com **Node.js**, utilizando **Express** e **JavaScript**. O objetivo é criar um CRUD (Create, Read, Update, Delete) para gerenciar usuários e tarefas.

Se você souber **TypeScript**, pode usá-lo como diferencial.

---

## 🎯 Objetivo

Criar uma API REST que permita:

1. Cadastrar, listar, atualizar e deletar **usuários**
2. Cadastrar, listar, atualizar e deletar **tarefas**
3. Associar tarefas a usuários
4. Validar todos os dados recebidos
5. Implementar regras de negócio básicas

---

## ⚙️ Tecnologias esperadas

Você pode escolher entre:

### Obrigatórios:
- Node.js
- Express ou Fastify
- JavaScript
- Biblioteca de validação: Zod ou validação manual

### Opcionais:
- TypeScript (diferencial)
- ORM: Prisma ou Knex
- Banco: SQLite, PostgreSQL, armazenamento em memória, [mockapi](https://mockapi.io/)
- Autodocumentação com Swagger

---

## 🧱 Estrutura esperada dos dados

### 🧑 Usuário

| Campo          | Tipo      | Regras                               |
|----------------|-----------|--------------------------------------|
| `id`           | string    | (gerado automaticamente)             |
| `name`         | string    | obrigatório                          |
| `email`        | string    | obrigatório e deve ser válido        |
| `status`       | string    | "ativo" ou "inativo" (default: ativo)|
| `createdAt`    | datetime  | gerado automaticamente               |
| `updatedAt`    | datetime  | atualizado em cada modificação       |

---

### ✅ Tarefa

| Campo          | Tipo      | Regras                                             |
|----------------|-----------|----------------------------------------------------|
| `id`           | string    | gerado automaticamente                             |
| `name`         | string    | obrigatório                                        |
| `description`  | string    | opcional                                           |
| `status`       | string    | "PENDING", "EM ANDAMENTO", "FINALIZADO"            |
| `userId`       | string    | obrigatório, deve ser um `id` de um usuário válido |
| `createdAt`    | datetime  | gerado automaticamente                             |
| `updatedAt`    | datetime  | atualizado em cada modificação                     |

---

## 📚 Rotas esperadas

### Usuários

| Método | Rota             | Descrição                   |
|--------|------------------|-----------------------------|
| GET    | `/users`         | Listar todos os usuários    |
| GET    | `/users/:id`     | Buscar um usuário por ID    |
| POST   | `/users`         | Criar novo usuário          |
| PUT    | `/users/:id`     | Atualizar um usuário        |
| DELETE | `/users/:id`     | Deletar um usuário          |

---

### Tarefas

| Método | Rota             | Descrição                             |
|--------|------------------|---------------------------------------|
| GET    | `/tasks`         | Listar todas as tarefas               |
| GET    | `/tasks/:id`     | Buscar uma tarefa por ID              |
| GET    | `/tasks/:userId` | Listar todas as tarefas de um usuário |
| POST   | `/tasks`         | Criar nova tarefa (relacionada a user)|
| PUT    | `/tasks/:id`     | Atualizar uma tarefa                  |
| DELETE | `/tasks/:id`     | Deletar uma tarefa                    |

---

## 📋 Regras de negócio (Obrigatórias)

1. Um usuário **precisa estar ativo** para criar tarefas.
2. Não pode existir dois usuários com o **mesmo email**.
3. Ao deletar um usuário, suas tarefas **devem ser deletadas também**.
4. As datas de criação/atualização devem ser geradas automaticamente.
5. O status das tarefas deve aceitar **apenas os três valores definidos**.

---

## ✅ O que será avaliado

- Organização do código (divisão em arquivos, modularidade)
- Uso correto do Express
- Validação dos dados (ponto importante)
- Regras de negócio aplicadas corretamente
- Funcionamento completo das rotas (testável via Postman ou Insomnia)
- Documentação simples (README com instruções para rodar o projeto)

---

# Como utilizar o projeto

## Pré-requisitos

- Node.js (versão >= 18)
- npm ou yarn

## Instalando dependências

No terminal, dentro da pasta do projeto, rode:

```bash
npm install
```

## Rodando a Aplicação

No terminal, dentro da pasta do projeto, rode:

```bash
npm start
```