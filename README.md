
# 💸 Digital Wallet API

API backend para simulação de uma **carteira digital**, permitindo operações de **depósito, saque, transferência entre usuários**, autenticação, controle de saldo e **geração de extrato financeiro**, seguindo **boas práticas de arquitetura, DDD e padrões de projeto**.

Este projeto foi desenvolvido com foco em **qualidade de código, escalabilidade e regras de negócio bem definidas**, simulando um cenário real de sistema financeiro.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- Drizzle ORM
- Docker & Docker Compose
- JWT (Autenticação)
- DTOs e validações
- Clean Architecture
- Domain-Driven Design (DDD)

---

## 🧱 Arquitetura

O projeto segue os princípios da **Clean Architecture**, separando claramente as responsabilidades em camadas.

```
src/
├── accounts
│   ├── core
│   │   ├── domain
│   │   │   ├── entity
│   │   │   ├── value-object
│   │   │   ├── enums
│   │   │   └── ports
│   │   └── services
│   ├── application
│   │   └── useCases
│   └── infra
│       ├── database
│       ├── repositories
│       └── http
│           ├── controllers
│           └── dtos
└── shared
```

---

## 🧠 Domain-Driven Design (DDD)

O domínio foi modelado com foco em **comportamento**, não apenas em dados.

### Entidades principais
- UserClient
- Transaction

### Value Objects
- Money

### Regras de negócio
- Usuário não pode transferir para si mesmo
- Transferências validam saldo antes da execução
- Transações são registradas para extrato
- Tipos de usuários possuem regras distintas

---

## 🧩 Padrões de Projeto

### Strategy Pattern
Utilizado para aplicar regras diferentes de transferência conforme o tipo de usuário (comum ou logista).

### Factory / Resolver
Responsável por decidir qual estratégia aplicar dinamicamente.

### Repository Pattern
Casos de uso dependem apenas de interfaces.

### Either Pattern
Controle explícito de sucesso e erro.

---

## 🔐 Autenticação

- JWT
- Guards do NestJS
- Decorators customizados
- Validação de dados via DTOs

---

## 📄 Extrato Financeiro

O extrato retorna:
- Saldo atual do usuário
- Lista de transações (depósito, saque, transferências)

Cada transação contém:
- Tipo
- Valor
- Data
- Usuário relacionado

---

## 🐳 Docker

Execução com Docker:

```bash
docker-compose up -d
```

---

## 🔁 Consistência

- Validação antes das operações
- Persistência segura
- Estrutura preparada para rollback

---

## 🎯 Objetivo

Projeto focado em:
- Boas práticas
- Código limpo
- Escalabilidade
- Portfólio profissional

---

## 👨‍💻 Autor

**Ewerton Hecsley**  
Backend Developer | Node.js | NestJS | DDD | Clean Architecture
