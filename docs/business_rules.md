# Catálogo de Regras de Negócio (Business Rules) - Web-Lib

Este documento consolida formalmente todas as diretivas, restrições de integridade, lógicas de validação e regras operacionais do sistema **Web-Lib**, extraídas da arquitetura de modelos do Prisma, controladores do Express, middlewares de segurança e componentes da interface.

---

## 📋 Resumo das Regras de Negócio

| ID | Nome da Regra | Categoria | Escopo Principal |
| :--- | :--- | :--- | :--- |
| **RN01** | Tabela Única de Usuários e Controle de Roles | Autenticação / Modelagem | `Usuario`, `authController` |
| **RN02** | Unicidade de Credenciais e Documentos | Integridade de Dados | `Usuario` (`email`, `cpf`) |
| **RN03** | Criptografia Forte de Senhas (Bcrypt) | Segurança | `Usuario.senhaHash`, `authController` |
| **RN04** | Bloqueio e Suspensão de Contas de Usuário | Segurança / Circulação | `Usuario.bloqueado`, `authMiddleware`, `emprestimoController` |
| **RN05** | Controle de Acesso Baseado em Perfis (RBAC) | Segurança / Autorização | `authMiddleware.ts` (`autorizar`, `admin`) |
| **RN06** | Armazenamento Reduzido de Livros via ISBN | Modelagem / Integração | `Livro.isbn`, `googleBooksService.ts` |
| **RN07** | Validação Prévia de ISBN no Cadastro de Obras | Gestão de Acervo | `livroController.cadastrarLivro` |
| **RN08** | Gestão e Rastreamento Individual de Exemplares | Acervo / Circulação | `ExemplarLivro.status` |
| **RN09** | Transações Atômicas de Circulação e Empréstimos | Integridade Operacional | `emprestimoController.realizarEmprestimo` |
| **RN10** | Limite Global de Livros por Leitor | Circulação / Empréstimos | `Configuracao.limite_global` |
| **RN11** | Limite de Exemplares do Mesmo Título por Leitor | Circulação / Empréstimos | `Configuracao.limite_por_titulo` |
| **RN12** | Definição e Cálculo do Prazo de Devolução | Circulação / Empréstimos | `Configuracao.prazo_padrao_dias`, `ItemEmprestimo.data_prazo` |
| **RN13** | Regras e Restrições para Renovação de Empréstimos | Circulação / Empréstimos | `emprestimoController.adiarEmprestimo` |
| **RN14** | Liberação Automática de Exemplar na Devolução | Circulação / Devolução | `emprestimoController.devolverLivro` |
| **RN15** | Avaliação Única por Livro e Cliente (Chave Composta) | Avaliações / Comunidade | `Avaliacao` (`@@unique([usuarioId, livroId])`) |
| **RN16** | Escala e Validação de Notas de Avaliação | Avaliações / Comunidade | `Avaliacao.nota` (1 a 5) |
| **RN17** | Recálculo Automático da Média das Obras | Avaliações / Catálogo | `livroController`, `avaliacaoController` |
| **RN18** | Autorização para Exclusão de Resenhas e Avaliações | Governança / Avaliações | `avaliacaoController.deletarAvaliacao` |
| **RN19** | Integridade Relacional e Exclusão em Cascata | Banco de Dados | `schema.prisma` (`onDelete: Cascade`) |
| **RN20** | Parametrização Global Dinâmica da Biblioteca | Administração | `Configuracao`, `configController` |

---

## 📑 Detalhamento das Regras de Negócio

---

### Módulo: Usuários, Autenticação e Segurança

#### **RN01 - Tabela Única de Usuários e Controle de Roles**
- **Descrição:** Todos os usuários do sistema (sejam leitores comuns ou administradores) são armazenados em uma única entidade relacional `Usuario`, diferenciados exclusivamente pelo enum `Role` (`ADMINISTRADOR` ou `CLIENTE`). O identificador primário (`id`) deve ser obrigatoriamente um UUID v4 (36 caracteres no padrão string).
- **Justificativa:** Simplifica a modelagem relacional, elimina duplicidade de tabelas de autenticação e permite expansão futura de novos cargos sem necessidade de reestruturação do banco.
- **Onde é Aplicada:** 
  - `Backend/src/database/schema.prisma` (Model `Usuario` e Enum `Role`).
  - `Backend/src/controllers/authController.ts` e `usuarioController.ts`.

---

#### **RN02 - Unicidade de Credenciais e Documentos**
- **Descrição:** O sistema não permite o cadastro de dois usuários com o mesmo endereço de e-mail (`email`) ou mesmo número de CPF (`cpf`). Ambas as colunas possuem restrição de índice exclusivo no banco de dados (`@unique`).
- **Onde é Aplicada:**
  - `Backend/src/database/schema.prisma` (`@unique` em `email` e `cpf`).
  - `Backend/src/controllers/usuarioController.ts` (Validações prévias em `createUsuarioPublico` e `createUsuarioAdmin`).

---

#### **RN03 - Criptografia Forte de Senhas (Bcrypt)**
- **Descrição:** Nenhuma senha de usuário pode ser armazenada em texto plano. Todas as senhas devem passar obrigatoriamente pelo algoritmo de hash criptográfico `bcrypt` / `bcryptjs` com custo de processamento (salt rounds) igual ou superior a 10 antes da persistência no banco de dados.
- **Onde é Aplicada:**
  - `Backend/src/controllers/authController.ts` (`bcrypt.compare`).
  - `Backend/src/controllers/usuarioController.ts` (`bcrypt.hash`).
  - `Backend/src/database/seeds/Usuarios.ts`.

---

#### **RN04 - Bloqueio e Suspensão de Contas de Usuário**
- **Descrição:** Usuários com o atributo booleano `bloqueado = true` sofrem restrições operacionais imediatas:
  1. *Tentativa de Login:* O endpoint de autenticação rejeita a emissão de token com código HTTP `403 Forbidden`.
  2. *Tentativa de Empréstimo:* Caso um token ainda válido tente submeter novo empréstimo, a transação é abortada com mensagem de impedimento por conta bloqueada.
- **Onde é Aplicada:**
  - `Backend/src/controllers/authController.ts` (`login`).
  - `Backend/src/controllers/emprestimoController.ts` (`realizarEmprestimo`).
  - `Backend/src/controllers/usuarioController.ts` (`toggleBloqueioUsuario`).

---

#### **RN05 - Controle de Acesso Baseado em Perfis (RBAC)**
- **Descrição:** Rotas e operações do backend são protegidas por middlewares que inspecionam o Token JWT assinado:
  - `autorizar`: Exige token JWT válido enviado no cabeçalho `Authorization: Bearer <token>`.
  - `admin`: Exige que o token decodificado possua a role `"ADMINISTRADOR"`. Acesso negado com status `403` caso seja um usuário comum.
  - `usuarioOuAdmin`: Permite acesso se o ID do recurso solicitado for do próprio usuário autenticado ou se o solicitante for um administrador.
- **Onde é Aplicada:**
  - `Backend/src/middleware/authMiddleware.ts`.
  - Todas as rotas em `Backend/src/routes/`.

---

### Módulo: Acervo, Livros e Google Books API

#### **RN06 - Armazenamento Reduzido de Livros via ISBN**
- **Descrição:** A tabela `Livro` no banco de dados armazena apenas dados estritamente necessários para a modelagem relacional: `id` (chave primária), `isbn` (código único de 10 ou 13 dígitos) e `mediaAvaliacoes` (float). 
- **Enriquecimento Dinâmico:** Metadados editoriais complementares (Título, Autor/Autores, Editora, Categoria, Sinopse e Capa em alta resolução) não são duplicados no banco local; são resolvidos dinamicamente pela `googleBooksService` a partir do ISBN.
- **Onde é Aplicada:**
  - `Backend/src/database/schema.prisma` (Model `Livro`).
  - `Backend/src/services/googleBooksService.ts`.
  - `Backend/src/controllers/livroController.ts` (`index`, `findLivro`).

---

#### **RN07 - Validação Prévia de ISBN no Cadastro de Obras**
- **Descrição:** Antes de cadastrar um novo livro no acervo, o backend realiza uma consulta prévia na Google Books API com o ISBN informado. O cadastro só é aceito se a obra existir e retornar metadados válidos. Caso contrário, a requisição é rejeitada com código `400 Bad Request`.
- **Onde é Aplicada:**
  - `Backend/src/controllers/livroController.ts` (`cadastrarLivro`, `updateLivro`).
  - `Frontend/src/pages/CadastroLivro.tsx`.

---

#### **RN08 - Gestão e Rastreamento Individual de Exemplares**
- **Descrição:** Um mesmo título (`Livro`) pode conter múltiplos exemplares físicos (`ExemplarLivro`), cada um com seu identificador sequencial próprio e status de disponibilidade (`Disponivel` ou `Emprestado`).
- **Onde é Aplicada:**
  - `Backend/src/database/schema.prisma` (Model `ExemplarLivro` e Enum `LivroStatus`).
  - `Backend/src/controllers/livroController.ts` (`cadastrarExemplar`).

---

### Módulo: Circulação, Empréstimos e Devoluções

#### **RN09 - Transações Atômicas de Circulação e Empréstimos**
- **Descrição:** Todas as operações que alteram o estado de empréstimos, itens e disponibilidade de exemplares devem ser executadas dentro de uma transação de banco de dados atômica (`prisma.$transaction`). Se qualquer validação falhar (estoque concorrente, limites excedidos ou bloqueio de usuário), todas as modificações são revertidas (*rollback*).
- **Onde é Aplicada:**
  - `Backend/src/controllers/emprestimoController.ts` (`realizarEmprestimo`, `adiarEmprestimo`, `devolverLivro`).

---

#### **RN10 - Limite Global de Livros por Leitor**
- **Descrição:** Um cliente não pode retirar mais livros do que o permitido pelo parâmetro `limite_global` definido na tabela `Configuracao` (padrão: **5 livros** no total). O cálculo considera a soma dos livros atualmente em posse do leitor (`data_devolucao IS NULL`) mais a quantidade de exemplares solicitados na nova retirada.
- **Onde é Aplicada:**
  - `Backend/src/controllers/emprestimoController.ts` (`realizarEmprestimo`).

---

#### **RN11 - Limite de Exemplares do Mesmo Título por Leitor**
- **Descrição:** Para evitar monopólio de obras de alta procura, um cliente não pode possuir simultaneamente mais do que `limite_por_titulo` cópias do mesmo livro (padrão: **2 cópias** do mesmo título).
- **Onde é Aplicada:**
  - `Backend/src/controllers/emprestimoController.ts` (`realizarEmprestimo`).

---

#### **RN12 - Definição e Cálculo do Prazo de Devolução**
- **Descrição:** A data limite de entrega de cada item de empréstimo (`data_prazo`) é calculada no momento da retirada somando a data atual aos dias estipulados no parâmetro `prazo_padrao_dias` da tabela `Configuracao` (padrão: **7 dias**).
- **Onde é Aplicada:**
  - `Backend/src/controllers/emprestimoController.ts` (`realizarEmprestimo`, `adiarEmprestimo`).

---

#### **RN13 - Regras e Restrições para Renovação de Empréstimos**
- **Descrição:** A extensão do prazo de entrega de um item de empréstimo (`adiarEmprestimo`) está sujeita a três condições cumulativas obrigatórias:
  1. *Impedimento por Atraso:* Não é permitido renovar empréstimos cuja data limite já tenha vencido (`now > data_prazo`). O leitor é obrigado a comparecer para devolução.
  2. *Intervalo Mínimo de 3 Dias:* O leitor só pode solicitar uma nova renovação se tiverem se passado pelo menos 3 dias desde o empréstimo original ou da última renovação efetuada.
  3. *Limite de Renovações:* Cada item possui um contador inicial de 5 adiamentos (`count_adiar = 5`). Ao esgotar as 5 tentativas (`count_adiar === 0`), o botão de renovação é bloqueado.
- **Onde é Aplicada:**
  - `Backend/src/controllers/emprestimoController.ts` (`index`, `adiarEmprestimo`).
  - `Frontend/src/pages/MeuEmprestimo.tsx`.

---

#### **RN14 - Liberação Automática de Exemplar na Devolução**
- **Descrição:** Ao registrar a devolução de um item (`devolverLivro`), o campo `data_devolucao` do `ItemEmprestimo` é preenchido com a data/hora corrente e o status do exemplar correspondente na tabela `ExemplarLivro` é alterado imediatamente para `Disponivel`.
- **Onde é Aplicada:**
  - `Backend/src/controllers/emprestimoController.ts` (`devolverLivro`).

---

### Módulo: Avaliações, Resenhas e Notas

#### **RN15 - Avaliação Única por Livro e Cliente (Chave Composta)**
- **Descrição:** Cada cliente pode avaliar um livro específico apenas uma única vez. No banco de dados, essa regra é garantida pela restrição de unicidade composta `@@unique([usuarioId, livroId])` na entidade `Avaliacao`.
- **Comportamento Idempotente:** Caso o leitor submeta uma nova avaliação para um livro já avaliado por ele, o sistema executa um `upsert` atualizando a nota e o comentário existentes em vez de criar um registro duplicado.
- **Onde é Aplicada:**
  - `Backend/src/database/schema.prisma` (`@@unique([usuarioId, livroId])`).
  - `Backend/src/controllers/avaliacaoController.ts` (`criarOuAtualizarAvaliacao`).

---

#### **RN16 - Escala e Validação de Notas de Avaliação**
- **Descrição:** A nota atribuída a um livro deve ser obrigatoriamente um número inteiro compreendido no intervalo fechado de **1 a 5 estrelas** (`1 <= nota <= 5`).
- **Onde é Aplicada:**
  - `Backend/src/controllers/avaliacaoController.ts` (`criarOuAtualizarAvaliacao`).
  - `Frontend/src/components/avaliacao/FormularioAvaliacao.tsx`.

---

#### **RN17 - Recálculo Automático da Média das Obras**
- **Descrição:** Sempre que uma avaliação for incluída, modificada ou excluída do sistema, a aplicação deve disparar automaticamente o recálculo da média aritmética das notas (`_avg.nota`) associadas ao `livroId`. O resultado é arredondado para uma casa decimal e gravado no campo `mediaAvaliacoes` da tabela `Livro`. Se o livro não possuir avaliações, a média retorna ao valor padrão `0.0`.
- **Onde é Aplicada:**
  - `Backend/src/controllers/avaliacaoController.ts` (`recalcularMediaAvaliacoes`).
  - `Backend/src/controllers/livroController.ts` (`recalcularMediaAvaliacoes`).

---

#### **RN18 - Autorização para Exclusão de Resenhas e Avaliações**
- **Descrição:** A exclusão de uma avaliação (`DELETE /avaliacao/:id`) só pode ser efetuada se o solicitante for o próprio autor da avaliação (`avaliacao.usuarioId === usuarioLogado.id`) ou se o solicitante possuir o perfil de `ADMINISTRADOR`.
- **Onde é Aplicada:**
  - `Backend/src/controllers/avaliacaoController.ts` (`deletarAvaliacao`).

---

### Módulo: Integridade Relacional e Configurações

#### **RN19 - Integridade Relacional e Exclusão em Cascata**
- **Descrição:** As relações entre entidades possuem cláusulas `onDelete: Cascade`:
  - A exclusão de um `Usuario` remove em cascata seus empréstimos e suas avaliações.
  - A exclusão de um `Emprestimo` remove em cascata seus respectivos `ItemEmprestimo`.
  - A exclusão de um `Livro` remove em cascata seus exemplares físicos e suas avaliações.
- **Onde é Aplicada:**
  - `Backend/src/database/schema.prisma` (definições de `@relation(..., onDelete: Cascade)`).

---

#### **RN20 - Parametrização Global Dinâmica da Biblioteca**
- **Descrição:** As regras de limite de sacola, prazo de entrega e penalidades são centralizadas em um registro singleton na tabela `Configuracao` (ID = 1). As alterações efetuadas pelo Administrador no painel de configurações passam a vigorar instantaneamente para todas as novas operações do sistema sem necessidade de reinicialização do servidor.
- **Onde é Aplicada:**
  - `Backend/src/database/schema.prisma` (Model `Configuracao`).
  - `Backend/src/controllers/configController.ts`.
  - `Backend/src/controllers/emprestimoController.ts`.
