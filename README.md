# 📚 Web-Lib — Sistema de Gerenciamento de Biblioteca

O **Web-Lib** é uma aplicação Full-Stack desenvolvida para modernizar e automatizar a gestão operacional de bibliotecas. O sistema abrange desde a consulta dinâmica do acervo enriquecida por APIs externas até o controle rigoroso de empréstimos, devoluções, renovações, avaliações com resenhas e painéis analíticos para administração.

---

## 🛠️ Tecnologias Utilizadas

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![ReactJS](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-257bd6?style=for-the-badge&logo=docker&logoColor=white)

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

## 📂 Documentação do Projeto

A documentação detalhada das regras e requisitos do sistema está centralizada na pasta [`/docs`](https://www.google.com/search?q=./docs/):

- 📜 **[Casos de Uso (use_cases.md)](https://www.google.com/search?q=./docs/use_cases.md):** Especificação completa de todos os fluxos de uso por atores (`CLIENTE`, `ADMINISTRADOR` e `PÚBLICO`)[cite: 8].
- 📑 **[Regras de Negócio (business_rules.md)](https://www.google.com/search?q=./docs/business_rules.md):** Diretivas de integridade, cálculo de prazos, controle de renovação e restrições de permissão[cite: 7].

---

## 🚀 Principais Funcionalidades

- **Tabela Única de Usuários e RBAC:** Autenticação unificada via `Usuario` (UUID) com perfil discriminado por roles (`ADMINISTRADOR` e `CLIENTE`) e controle de bloqueios operacionais[cite: 7, 9].
- **Acervo Reduzido & Integração Google Books:** A base local armazena apenas o ISBN e a média de avaliações do livro[cite: 7, 9], consumindo dinamicamente metadados (Título, Autores, Editora, Categoria, Capa) via Google Books API[cite: 7, 8].
- **Controle Físico de Exemplares:** Rastreamento individual do status de cada cópia física (`Disponivel` ou `Emprestado`)[cite: 7, 8, 9].
- **Gestão de Empréstimos e Renovações:** Execução de retiradas limitadas pelos parâmetros globais (`limite_global`, `limite_por_titulo`, `prazo_padrao_dias`) e controle de até 5 adiamentos com trava de atraso[cite: 7, 8, 9].
- **Comunidade e Avaliações:** Sistema de nota (1 a 5 estrelas) e resenhas por leitor, garantindo uma única avaliação por livro/cliente com recálculo automático da média do acervo[cite: 7, 8, 9].
- **Dashboard Administrativo:** Monitoramento de KPIs (totais, atrasos, leitores), alertas operacionais e gráficos analíticos em tempo real[cite: 8].

---

## 🗂️ Arquitetura das Rotas do Backend

| Rota                       | Tipo          | Middleware de Proteção  | Descrição                                                                                 |
| -------------------------- | ------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| `/login`                   | `POST`        | Público                 | Autentica o usuário e gera o JWT Bearer[cite: 6, 7].                                      |
| `/usuario`                 | `POST`        | Público                 | Cadastro público de novas contas de cliente[cite: 8].                                     |
| `/usuario/perfil`          | `GET/PUT`     | Autenticado             | Leitura e atualização dos dados cadastrais do perfil logado[cite: 8].                     |
| `/usuario/gerenciar`       | `GET/DELETE`  | Apenas Administrador    | Gestão de contas, alterações de status (`bloqueado`) e remoção[cite: 7, 8].               |
| `/livro`                   | `GET`         | Público                 | Lista livros combinando ISBN local com metadados do Google Books[cite: 6, 7, 8].          |
| `/livro`                   | `POST/DELETE` | Apenas Administrador    | Inclusão de obra via ISBN e remoção do acervo[cite: 7, 8].                                |
| `/livro/:id/avaliacoes`    | `GET/POST`    | Público / Autenticado   | Lista e cadastra notas/resenhas associadas a uma obra[cite: 7, 8].                        |
| `/avaliacao/:id`           | `DELETE`      | Autor ou Admin          | Exclusão de resenha e reajuste automático da média da obra[cite: 7, 8].                   |
| `/emprestimo/realizar`     | `POST`        | Autenticado (`CLIENTE`) | Valida limites, retira exemplares e gera registro de prazo[cite: 7, 8].                   |
| `/emprestimo/adiar/:id`    | `PUT`         | Autenticado (`CLIENTE`) | Renova o prazo de devolução caso respeite os pré-requisitos de dias e limite[cite: 7, 8]. |
| `/emprestimo/devolver/:id` | `PUT`         | Apenas Administrador    | Finaliza o empréstimo e libera o exemplar para `Disponivel`[cite: 7, 8].                  |
| `/dashboard/*`             | `GET`         | Apenas Administrador    | Fornece métricas agrupadas, alertas de atraso e séries históricas[cite: 8].               |
| `/configuracao`            | `GET/PUT`     | Apenas Administrador    | Visualiza e atualiza os parâmetros globais da biblioteca[cite: 6, 7, 8].                  |

---

## 📊 Arquitetura de Dados (Database ERD)

```mermaid
erDiagram
    USUARIO {
        string id PK "UUID"
        string nome
        string email UK
        string senha_hash
        string cpf UK
        string telefone
        boolean bloqueado "DEFAULT false"
        enum role "ADMINISTRADOR | CLIENTE"
    }

    LIVRO {
        int id PK "AUTO_INCREMENT"
        string isbn UK
        float media_avaliacoes "DEFAULT 0.0"
    }

    AVALIACAO {
        int id PK "AUTO_INCREMENT"
        int nota "1 a 5"
        string comentario "TEXT (Opcional)"
        datetime criado_em
        datetime atualizado_em
        string usuario_id FK "UUID"
        int livro_id FK
    }

    EXEMPLAR_LIVRO {
        int id PK "AUTO_INCREMENT"
        int livroId FK
        enum status "Disponivel | Emprestado"
    }

    EMPRESTIMO {
        int id PK "AUTO_INCREMENT"
        string usuario_id FK "UUID"
        datetime data_saida "DEFAULT NOW()"
    }

    ITEM_EMPRESTIMO {
        int id PK "AUTO_INCREMENT"
        int emprestimoId FK
        int exemplarId FK
        int count_adiar "DEFAULT 5"
        datetime data_prazo
        datetime data_devolucao "OPCIONAL"
    }

    CONFIGURACAO {
        int id PK "DEFAULT 1"
        int limite_global "DEFAULT 5"
        int limite_por_titulo "DEFAULT 2"
        int prazo_padrao_dias "DEFAULT 7"
        int dias_penalidade "DEFAULT 7"
    }

    USUARIO ||--o{ EMPRESTIMO : "realiza"
    USUARIO ||--o{ AVALIACAO : "escreve"
    LIVRO ||--|{ EXEMPLAR_LIVRO : "possui"
    LIVRO ||--o{ AVALIACAO : "recebe"
    EMPRESTIMO ||--|{ ITEM_EMPRESTIMO : "contém"
    EXEMPLAR_LIVRO ||--o{ ITEM_EMPRESTIMO : "vinculado"

```

---

## 💻 Como Executar o Projeto Localmente

### **Pré-requisitos**

- **Node.js** (v18 ou superior)
- **Docker & Docker Compose** (para rodar a instância do MySQL em container) ou MySQL Server local.

### **Configuração do Backend**

1. Navegue até o diretório do backend:

```bash
cd Backend

```

2. Instale as dependências da aplicação:

```bash
npm install

```

3. Crie o arquivo `.env` na raiz do `Backend/` utilizando o modelo abaixo:

```env
DATABASE_URL="mysql://root:rootpassword@localhost:3306/web_lib"
JWT_SECRET="sua_chave_secreta_jwt_aqui"
PORT=3000

```

4. Suba o container do MySQL via Docker Compose:

```bash
docker-compose up -d

```

5. Execute as migrations do Prisma para estruturar o banco de dados:

```bash
npx prisma migrate dev

```

6. Povoa o banco de dados executando os scripts de Seed (Usuários e Livros por ISBN):

```bash
npx prisma db seed

```

7. Inicie o servidor em ambiente de desenvolvimento:

```bash
npm run dev

```

O servidor iniciará na porta `3000`.

---

### **Configuração do Frontend**

1. Navegue até o diretório do frontend:

```bash
cd Frontend

```

2. Instale as dependências:

```bash
npm install

```

3. Inicie o servidor de desenvolvimento do Vite:

```bash
npm run dev

```

A aplicação web estará acessível no endereço exibido no terminal (geralmente `http://localhost:5173`).

---

## 👤 Autor

Desenvolvido por **Rian Alves Leal**

Estudante de Ciência da Computação no IFNMG — Campus Montes Claros.

- **LinkedIn:** [rian-leal-659974374](https://www.google.com/search?q=https://www.linkedin.com/in/rian-leal-659974374/)
- **GitHub:** [RAL25](https://www.google.com/search?q=https://github.com/RAL25)
