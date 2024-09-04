# API de Gerenciamento de Usuários e Endereços

Este projeto é uma API para gerenciar usuários e endereços. Ele segue os princípios da Arquitetura Limpa (Clean Architecture) e foi construído utilizando Express com TypeScript. O projeto inclui vários casos de uso para criar, atualizar, deletar e recuperar dados de usuários e endereços, com cobertura completa de testes utilizando o Jest.

## Funcionalidades

- Gerenciamento de usuários e endereços (operações CRUD).
- Hashing e verificação de senhas.
- Uso de repositórios para persistência de dados.
- DTOs e Entidades para estruturar o domínio.
- Enums para padronização de mensagens de erro, sucesso e respostas HTTP.
- Cobertura de testes com Jest, incluindo mocks e fakes.
- Implementação de padrões de projeto como **Factory** e **Mapper**.

## 🚀 Como Rodar a API
### Pré-requisitos
Antes de começar, você precisará ter as seguintes ferramentas instaladas:
- Node.js (versão 14 ou superior)
= Yarn ou npm
- MongoDB (para rodar o banco de dados localmente)
### Passo a passo
```bash
# Clone este repositório
$ git clone https://github.com/clauds-macedo/userhub.git

# Acesse a pasta do projeto
$ cd userhub

# Instale as dependências
$ yarn
# ou
$ npm install

# Copie o arquivo de exemplo de variáveis de ambiente
$ cp .env.example .env

# Inicie o MongoDB (ou abra o Mongo Compass e inicie conexão)
$ mongod

# Execute a aplicação
$ yarn dev
# ou
$ npm run dev

# A aplicação será iniciada na porta definida no .env (padrão: 3333)
# Acesse http://localhost:3333

# Para rodar os testes (opcional)
$ yarn test
# ou
$ npm run test
```

## Padrões de Projeto Utilizados

### Factory
No contexto dessa API, o padrão **Factory** foi para a criação de instâncias de repositórios ou serviços, garantindo que a lógica de inicialização esteja desacoplada da lógica de negócio, tornando o código mais limpo e fácil de manter.

### Mapper
O **Mapper** é utilizado para transformar entidades para o Schema de um banco de dados (nesse caso, o MongoDB) e também para mapear de volta esses dados para entidades de domínio ao salvar ou atualizar informações. Isso garante que a lógica de conversão entre o modelo de dados do MongoDB e as entidades da aplicação seja centralizada, evitando duplicação de código e minimizando erros durante a manipulação de dados, fazendo com que as regras de negócio criadas na camada de domínio se mantenham, criando um desacoplamento do Mongoose.


## Tecnologias Utilizadas

- ⚙️ TypeScript
- 🧪 Jest
- 🧹 ESLint
- 🏛️ Arquitetura Limpa
- 🏭 Factory Pattern
- 🔄 Mapper Pattern

## Estrutura do Projeto

```bash
├── src/
│   ├── domain/
│   │   ├── dtos/               # Data Transfer Objects (DTOs)
│   │   ├── entities/           # Entidades do Domínio (Usuário, Endereço)
│   │   ├── enums/              # Enums para mensagens, códigos HTTP
│   │   ├── repositories/       # Interfaces para persistência de dados
│   │   └── usecases/           # Lógica de negócios (Casos de Uso)
│   ├── infra/
│   │   ├── config/
│   │   │   └── mongoose.ts     # Configuração da conexão com MongoDB
│   │   ├── middlewares/        # Middlewares (autenticação JWT)
│   │   ├── mongoose/
│   │   │   ├── mappers/        # Mappers para conversão de entidades e schemas
│   │   │   ├── models/         # Modelos do MongoDB
│   │   │   └── schemas/        # Schemas do MongoDB
│   │   └── repositories/
│   │       ├── HashRepository.ts  # Implementação do repositório de hash
│   │       ├── AddressRepository.ts  # Implementação do repositório de endereços
│   │       └── UserRepository.ts  # Implementação do repositório de usuários
│   ├── main/
│   │   ├── controllers/
│   │   │   ├── AddressController.ts  # Rotas e lógica para endereços
│   │   │   ├── AuthenticationController.ts  # Autenticação (JWT)
│   │   │   └── UserController.ts  # Rotas e lógica para usuários
│   │   ├── docs/
│   │   │   └── swagger/           # Documentação da API (Swagger)
│   │   └── factories/
│   │       ├── MakeAddressFactory.ts  # Fábrica para instâncias relacionadas a endereços
│   │       ├── MakeHashFactory.ts     # Fábrica para instâncias de hash
│   │       └── MakeUserFactory.ts     # Fábrica para instâncias relacionadas a usuários
│   ├── server/
│   │   ├── routes/
│   │   │   └── index.routes.ts    # Inicialização e configuração das rotas
│   │   └── app.ts                 # Configuração principal da aplicação (express, middlewares, etc.)
│   └── __tests__/                 # Testes unitários e mocks
├── .env                           # Variáveis de ambiente
```

## Diagrama
![userhub (1)](https://github.com/user-attachments/assets/37a56601-0a24-4f30-8488-39174252a30d)

