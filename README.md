# 📚 Web-Lib — Sistema de Gerenciamento de Biblioteca

O **Web-Lib** é uma aplicação Full-Stack robusta desenvolvida para automatizar e gerenciar as rotas e operações do dia a dia de uma biblioteca, englobando o controle de acervo, empréstimos, gerenciamento de perfis de acesso e notificações automatizadas.

O projeto foi construído seguindo as melhores práticas de Engenharia de Software, utilizando uma arquitetura desacoplada (Separation of Concerns) com um backend em API RESTful e um frontend SPA (Single Page Application).

---

## 🛠️ Tecnologias Utilizadas

### **Backend**

- **Node.js** com **TypeScript** (Garantindo tipagem estática e segurança em tempo de desenvolvimento).
- **Express** (Framework rápido e minimalista para roteamento HTTP).
- **Prisma ORM** (Modelagem de dados e integração eficiente com o banco de dados).
- **MySQL** (Banco de dados relacional para persistência de dados).
- **JSON Web Tokens (JWT) & Bcrypt** (Autenticação segura de usuários e criptografia de senhas).
- **Nodemailer** (Disparo de e-mails assíncronos integrados ao ambiente de testes **Mailtrap**).

### **Frontend**

- **React** (Biblioteca para construção de interfaces componentizadas) com **Vite** (Ambiente de build ultrarrápido).
- **TypeScript** (Tipagem integrada de ponta a ponta com a API).
- **Material UI (MUI)** (Biblioteca de componentes visuais modernos com foco em usabilidade).
- **Axios** (Cliente HTTP para consumo assíncrono das rotas do backend).
- **React Router Dom** (Gerenciamento de rotas e navegação SPA no navegador).

---

## 🚀 Principais Funcionalidades

- **Autenticação e Controle de Acesso (RBAC):** Sistema com diferentes níveis de privilégios onde rotas sensíveis são protegidas de acordo com a função do usuário (Cliente, Funcionário ou Administrador).
- **Fluxo de Verificação de E-mail:** Registro de novos clientes dispara um e-mail de confirmação dinâmico com um link contendo um token JWT de expiração curta (1 hora).
- **Tratamento de Erros Semânticos:** Interceptação automatizada de falhas de concorrência e restrições únicas do banco de dados (como duplicidade de CPF ou e-mail), retornando códigos HTTP semânticos (ex: `409 Conflict`).
- **Relações Complexas no Banco:** Controle de exemplares e empréstimos utilizando restrições de chaves e deleções em cascata.
- **Catálogo de Livros Responsivo:** Exibição do acervo em tempo real consumindo a API por meio de cartões fluidos que se adaptam a computadores, tablets e smartphones.

---

## 🗂️ Arquitetura das Rotas do Sistema

A API está organizada sob os seguintes caminhos principais de endpoints:

| Rota               | Tipo         | Middleware de Proteção | Descrição                                        |
| :----------------- | :----------- | :--------------------- | :----------------------------------------------- |
| `/login`           | `POST`       | Público                | Autentica o usuário e gera o token JWT Bearer.   |
| `/livro`           | `GET`        | Público                | Lista todos os livros do acervo para o catálogo. |
| `/usuario`         | `GET`        | Autenticado            | Controle geral de contas base.                   |
| `/cliente`         | `GET`        | Autenticado            | Gerenciamento de dados específicos do leitor.    |
| `/funcionario`     | `GET/POST`   | Funcionário / Admin    | Gestão de equipe interna da biblioteca.          |
| `/funcionario/:id` | `PUT/DELETE` | Apenas Administrador   | Modificação ou desligamento de funcionários.     |
| `/emprestimo`      | `GET`        | Autenticado            | Criação e encerramento de empréstimos de livros. |
| `/configuracao`    | `GET`        | Apenas Administrador   | Ajustes globais do sistema de biblioteca.        |

---

## Arquitetura de Dados (Diagrama ER)

```mermaid
erDiagram
USUARIOS {
    int id PK "AUTO_INCREMENT"
    string nome "VARCHAR(50)"
    string email UK "VARCHAR(100)"
    string senha "VARCHAR(255)"
    enum cargo "'ADMIN', 'FUNCIONARIO', 'CLIENTE'"
    timestamp criado_em "DEFAULT NOW()"
}

CLIENTES {
    int id PK "AUTO_INCREMENT"
    int usuario_id FK,UK "INT"
    string cpf UK "VARCHAR(14)"
    string telefone "VARCHAR(20)"
    boolean email_verificado "DEFAULT false"
}

FUNCIONARIOS {
    int id PK "AUTO_INCREMENT"
    int usuario_id FK,UK "INT"
    string matricula UK "VARCHAR(20)"
    string cargo_interno "VARCHAR(50)"
}

LIVROS {
    int id PK "AUTO_INCREMENT"
    string titulo "VARCHAR(255)"
    string autor "VARCHAR(255)"
    string isbn UK "VARCHAR(20)"
    string editora "VARCHAR(100)"
    int ano_publicacao "INT"
    timestamp criado_em "DEFAULT NOW()"
}

EXEMPLARES {
    int id PK "AUTO_INCREMENT"
    int livro_id FK "INT"
    string codigo_exemplar UK "VARCHAR(50)"
    enum status "'DISPONIVEL', 'EMPRESTADO', 'MANUTENCAO', 'PERDIDO'"
}

EMPRESTIMOS {
    int id PK "AUTO_INCREMENT"
    int cliente_id FK "INT"
    int exemplar_id FK "INT"
    int funcionario_id FK "INT"
    timestamp data_emprestimo "DEFAULT NOW()"
    timestamp data_devolucao_prevista "TIMESTAMP"
    timestamp data_devolucao_real "TIMESTAMP"
    enum status "'ATIVO', 'DEVOLVIDO', 'ATRASADO'"
}

CONFIGURACOES {
    int id PK "AUTO_INCREMENT"
    string chave UK "VARCHAR(100)"
    string valor "VARCHAR(255)"
}

    USUARIOS ||--o| CLIENTES : "extende"
    USUARIOS ||--o| FUNCIONARIOS : "extende"
    LIVROS ||--|{ EXEMPLARES : "possui"
    CLIENTES ||--o{ EMPRESTIMOS : "solicita"
    EXEMPLARES ||--o{ EMPRESTIMOS : "objeto de"
    FUNCIONARIOS ||--o{ EMPRESTIMOS : "registra"

```

## 💻 Como Rodar o Projeto Localmente

### **Pré-requisitos**

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (v18 ou superior)
- **MySQL Server** ativo

### **Configurando o Backend**

1. Navegue até a pasta do backend:
   ```bash
   cd Backend
   ```
2. Navegue até a pasta do backend:
   ```bash
   cd Backend
   ```
3. Instale todas as dependências:

   ```bash
   npm install

   ```

4. Crie um arquivo chamado `.env` na raiz da pasta `Backend` seguindo o modelo abaixo:

   ```env
   DATABASE_URL="mysql://usuario:senha@localhost:3306/web_lib"
   JWT_SECRET="sua_chave_secreta_jwt"

   EMAIL_HOST="sandbox.smtp.mailtrap.io"
   EMAIL_PORT="2525"
   EMAIL_USER="seu_usuario_do_mailtrap"
   EMAIL_PASS="sua_senha_do_mailtrap"

   ```

5. Execute as Migrations do Prisma para estruturar as tabelas no seu MySQL:

   ```bash
   npx prisma migrate dev

   ```

6. _(Opcional)_ Execute o script de Seed para povoar o banco com livros de teste:

   ```bash
   npx prisma db seed

   ```

7. Inicie o servidor do backend em modo de desenvolvimento:

   ```bash
   npm run dev

   ```

_O servidor iniciará por padrão na porta `3000`._

### **Configurando o Frontend**

**AINDA EM DESENVOLVIMENTO!!!**

## 👤 Autor

Desenvolvido por **Rian Alves Leal** Estudante de Ciência da Computação no IFNMG — Campus Montes Claros.

- **LinkedIn:** [rian-leal-659974374](https://www.linkedin.com/in/rian-leal-659974374/)
- **GitHub:** [RAL25](https://github.com/RAL25)
