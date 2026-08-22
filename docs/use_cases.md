# Especificação de Casos de Uso (Use Cases) - Web-Lib

Este documento descreve formalmente todos os Casos de Uso (UC) do sistema **Web-Lib**, organizados por atores/perfis de acesso (`NÃO AUTENTICADO / PÚBLICO`, `CLIENTE` e `ADMINISTRADOR`).

---

## 👥 Atores do Sistema

1. **Visitante (Não Autenticado / Público):** Qualquer usuário que acessa a plataforma sem efetuar login.
2. **Cliente (Leitor):** Usuário registrado com permissões para consultar acervo, solicitar empréstimos, renovar prazos, avaliar livros e gerenciar sua conta.
3. **Administrador:** Usuário responsável pela gestão operacional da biblioteca (cadastro de livros e exemplares, bloqueio/gerenciamento de usuários, monitoramento de KPIs e configuração de parâmetros do sistema).

---

## 📑 Índice dos Casos de Uso

| ID | Nome do Caso de Uso | Ator Principal | Módulo |
| :--- | :--- | :--- | :--- |
| **UC01** | Cadastrar Conta de Cliente | Visitante | Autenticação e Conta |
| **UC02** | Autenticar Usuário (Login) | Visitante / Usuário | Autenticação e Conta |
| **UC03** | Consultar e Atualizar Perfil | Cliente / Administrador | Autenticação e Conta |
| **UC04** | Consultar Catálogo de Livros e Metadados | Todos | Acervo e Catálogo |
| **UC05** | Visualizar Detalhes e Sinopse do Livro | Todos | Acervo e Catálogo |
| **UC06** | Cadastrar Novo Livro e Exemplares via ISBN | Administrador | Gestão de Acervo |
| **UC07** | Gerenciar e Excluir Livros do Acervo | Administrador | Gestão de Acervo |
| **UC08** | Consultar Exemplares Disponíveis | Cliente / Administrador | Circulação / Empréstimos |
| **UC09** | Adicionar Exemplar à Sacola (Carrinho) | Cliente | Circulação / Empréstimos |
| **UC10** | Confirmar e Realizar Empréstimo | Cliente | Circulação / Empréstimos |
| **UC11** | Consultar Empréstimos Ativos | Cliente | Circulação / Empréstimos |
| **UC12** | Renovar Prazo de Empréstimo | Cliente | Circulação / Empréstimos |
| **UC13** | Registrar Devolução de Exemplar | Administrador / Cliente | Circulação / Empréstimos |
| **UC14** | Consultar Histórico de Empréstimos | Cliente | Circulação / Empréstimos |
| **UC15** | Criar ou Atualizar Avaliação de Livro | Cliente | Avaliações e Resenhas |
| **UC16** | Listar Avaliações de um Livro | Todos | Avaliações e Resenhas |
| **UC17** | Gerenciar e Excluir Minhas Avaliações | Cliente / Administrador | Avaliações e Resenhas |
| **UC18** | Gerenciar Usuários e Bloqueios | Administrador | Administração |
| **UC19** | Visualizar Dashboard de Métricas e Alertas | Administrador | Administração |
| **UC20** | Configurar Parâmetros Operacionais da Biblioteca | Administrador | Administração |

---

## 📖 Detalhamento dos Casos de Uso

---

### Módulo: Autenticação e Conta

#### UC01 - Cadastrar Conta de Cliente
- **Ator Principal:** Visitante (Não Autenticado)
- **Pré-condições:** O visitante não deve estar logado no sistema.
- **Fluxo Principal:**
  1. O visitante acessa a tela de cadastro (`/cadastro`).
  2. Preenche o formulário informando: Nome Completo, E-mail, CPF, Telefone e Senha.
  3. O visitante clica no botão "Cadastrar".
  4. O frontend envia requisição `POST /usuario` com os dados informados.
  5. O backend valida a formatação dos campos, a unicidade do e-mail e do CPF.
  6. A senha é criptografada utilizando o algoritmo `bcrypt` (10 rounds).
  7. O usuário é inserido na tabela `Usuario` com `role = "CLIENTE"` e `bloqueado = false`.
  8. O backend retorna status `201 Created` e mensagem de confirmação.
  9. O frontend exibe mensagem de sucesso e redireciona o usuário para a tela de login (`/login`).
- **Fluxos Alternativos / Exceção:**
  - *E-mail ou CPF já cadastrados:* O backend retorna status `400 Bad Request` informando a duplicidade. O frontend exibe o alerta de erro em tela sem recarregar a página.
  - *Campos obrigatórios ausentes:* O backend rejeita a criação com mensagem descritiva.
- **Pós-condições:** Uma nova conta de cliente é criada no banco de dados, habilitada para autenticação.

---

#### UC02 - Autenticar Usuário (Login)
- **Ator Principal:** Visitante / Usuário
- **Pré-condições:** O usuário deve possuir uma conta previamente cadastrada.
- **Fluxo Principal:**
  1. O usuário acessa a tela de login (`/login`).
  2. Informa seu E-mail e Senha e clica em "Entrar".
  3. O frontend envia requisição `POST /login`.
  4. O backend busca o registro correspondente pelo e-mail informado.
  5. O backend compara o hash da senha enviada com o `senha_hash` armazenado.
  6. O backend verifica se o usuário está com `bloqueado === true`.
  7. Estando apto, o backend gera um token `JWT` assinado contendo no payload: `{ id, nome, email, role }` com expiração de 24 horas.
  8. O backend retorna status `200 OK` com o token e os dados básicos do usuário.
  9. O frontend armazena o token no `localStorage`, atualiza o `AuthContext` e redireciona o usuário:
     - `CLIENTE`: Redirecionado para a Home (`/`).
     - `ADMINISTRADOR`: Redirecionado para o Dashboard Admin (`/dashboard`).
- **Fluxos Alternativos / Exceção:**
  - *Credenciais incorretas (E-mail ou Senha inválidos):* O backend retorna `401 Unauthorized`. O frontend exibe mensagem de erro de autenticação.
  - *Usuário bloqueado:* O backend detecta `bloqueado = true` e retorna status `403 Forbidden` informando que a conta está suspensa/bloqueada.
- **Pós-condições:** O usuário é considerado autenticado na sessão e seu token é enviado nas requisições subsequentes.

---

#### UC03 - Consultar e Atualizar Perfil
- **Ator Principal:** Cliente / Administrador
- **Pré-condições:** O usuário deve estar autenticado (`Token JWT` válido).
- **Fluxo Principal:**
  1. O usuário clica na opção "Perfil" no menu lateral (`/perfil`).
  2. O frontend executa chamada `GET /usuario/perfil` enviando o token no header `Authorization`.
  3. O backend identifica o usuário logado via `authMiddleware` e retorna seus dados cadastrais.
  4. O usuário visualiza seus dados e edita: Nome, Telefone, CPF ou Nova Senha.
  5. O usuário clica em "Salvar Alterações".
  6. O frontend envia requisição `PUT /usuario/alterar`.
  7. Se uma nova senha for fornecida, o backend gera novo hash `bcrypt`.
  8. O backend persiste as atualizações no banco de dados e retorna confirmação.
  9. O frontend exibe alerta de sucesso.
- **Fluxos Alternativos / Exceção:**
  - *Tentativa de alteração com CPF duplicado:* O backend rejeita a operação com status `400`.
- **Pós-condições:** Os dados cadastrais do usuário são atualizados no banco de dados.

---

### Módulo: Acervo e Catálogo de Livros

#### UC04 - Consultar Catálogo de Livros e Metadados
- **Ator Principal:** Visitante, Cliente ou Administrador
- **Pré-condições:** Nenhuma (Rota pública).
- **Fluxo Principal:**
  1. O usuário acessa a página inicial (`/`).
  2. O frontend solicita ao backend `GET /livro`.
  3. O backend busca todos os registros da tabela `Livro` (`id`, `isbn`, `media_avaliacoes`).
  4. Para cada livro, o serviço `googleBooksService` busca metadados atualizados pelo ISBN (Título, Autores, Editora, Categoria, Capa HTTPS e Sinopse) consultando a Google Books API (com suporte a cache em memória e fallbacks).
  5. O backend responde com a lista completa e enriquecida de livros.
  6. O frontend renderiza a grade de livros com capas, títulos, autores, categorias e notas médias em estrelas (⭐).
- **Fluxos Alternativos / Exceção:**
  - *Falha temporária de rede com a Google Books API:* O backend utiliza o cache ou os fallbacks (BrasilAPI / OpenLibrary), garantindo que as informações principais sejam renderizadas sem quebrar a interface.
- **Pós-condições:** O acervo de títulos da biblioteca é exibido de forma dinâmica e estruturada.

---

#### UC05 - Visualizar Detalhes e Sinopse do Livro
- **Ator Principal:** Visitante, Cliente ou Administrador
- **Pré-condições:** O catálogo deve conter livros cadastrados.
- **Fluxo Principal:**
  1. O usuário clica sobre o card de um livro no catálogo.
  2. O frontend abre um modal de detalhes exibindo: Capa ampliada, Título, Autores, ISBN, Editora, Categoria, Sinopse completa e Média de Avaliações.
  3. O componente `ListaAvaliacoes` busca e exibe a lista de resenhas e notas deixadas por outros leitores para aquela obra (`GET /livro/:id/avaliacoes`).
  4. Se o usuário for um `CLIENTE` logado, o componente `FormularioAvaliacao` é exibido permitindo que ele avalie a obra imediatamente.
- **Pós-condições:** O leitor obtém visão completa da obra e da recepção pela comunidade de leitores.

---

#### UC06 - Cadastrar Novo Livro e Exemplares via ISBN
- **Ator Principal:** Administrador
- **Pré-condições:** O usuário deve estar autenticado com `role = "ADMINISTRADOR"`.
- **Fluxo Principal:**
  1. O Administrador acessa a tela de cadastro de livros (`/cadastrar-livro`).
  2. Digita o código ISBN (10 ou 13 dígitos) no campo correspondente.
  3. (Opcional) Clica no botão "🔍 Buscar ISBN" para verificar a prévia da obra.
  4. O frontend consulta a API e exibe um card de pré-visualização (Preview) com capa, título, autores e editora encontrados.
  5. O Administrador informa a quantidade inicial de exemplares físicos (ex: 3).
  6. O Administrador clica em "Salvar Livro".
  7. O frontend envia requisição `POST /livro` com `{ isbn, quantidade }`.
  8. O backend valida a existência do ISBN na Google Books API.
  9. Cria ou localiza o registro em `Livro` com o `isbn` normalizado.
  10. Cria os N registros associados na tabela `ExemplarLivro` com `status = "Disponivel"`.
  11. O backend responde com status `201 Created` e resumo da inclusão.
  12. O formulário é limpo e uma mensagem de sucesso é apresentada.
- **Fluxos Alternativos / Exceção:**
  - *ISBN inválido ou inexistente:* O backend recusa o cadastro com status `400` informando "ISBN inválido ou não localizado na base da Google Books API".
- **Pós-condições:** O livro e seus respectivos exemplares físicos ficam disponíveis para circulação.

---

#### UC07 - Gerenciar e Excluir Livros do Acervo
- **Ator Principal:** Administrador
- **Pré-condições:** O usuário deve estar autenticado como `ADMINISTRADOR`.
- **Fluxo Principal:**
  1. O Administrador acessa a tela de gestão de acervo (`/gerenciar-livros`).
  2. O sistema exibe uma tabela completa contendo Capa, Título, Autor, ISBN, Editora, Categoria, Média de Avaliações e Quantidade de Exemplares.
  3. O Administrador pode filtrar a listagem digitando no campo de busca.
  4. O Administrador clica no botão "Excluir" em uma linha correspondente.
  5. O sistema solicita confirmação do usuário.
  6. O frontend envia requisição `DELETE /livro/:id`.
  7. O backend remove em cascata os itens de empréstimo associados, os exemplares físicos e o registro do livro.
  8. A listagem é recarregada automaticamente.
- **Pós-condições:** O livro e seus exemplares são removidos do banco de dados.

---

### Módulo: Empréstimos, Circulação e Devoluções

#### UC08 - Consultar Exemplares Disponíveis
- **Ator Principal:** Cliente ou Administrador
- **Pré-condições:** Usuário autenticado.
- **Fluxo Principal:**
  1. O usuário acessa a tela de consulta de exemplares (`/realizar-emprestimo`).
  2. Informa um termo de pesquisa (título, autor, ISBN ou categoria) e clica em "Buscar".
  3. O frontend envia `GET /livro/exemplares/disponiveis?busca=...`.
  4. O backend busca os exemplares físicos com seus livros relacionados e enriquece os dados via Google Books API.
  5. O frontend exibe a lista de exemplares identificados individualmente (`Exemplar #1`, `Exemplar #2`, etc.) com badge de status (`Disponível` ou `Emprestado`).
- **Pós-condições:** O usuário identifica quais cópias físicas estão livres para retirada.

---

#### UC09 - Adicionar Exemplar à Sacola (Carrinho)
- **Ator Principal:** Cliente
- **Pré-condições:** O exemplar consultado deve possuir `status = "Disponivel"`.
- **Fluxo Principal:**
  1. Na lista de exemplares disponíveis, o Cliente clica no botão "Adicionar ao carrinho".
  2. O `CarrinhoContext` insere o item na lista do carrinho local.
  3. O botão na tabela muda de estado para `✓ Selecionado` (desabilitado).
  4. O contador de itens no topo da tela (`🛒 Itens no Carrinho`) é incrementado.
- **Pós-condições:** O exemplar é armazenado temporariamente na sacola do leitor.

---

#### UC10 - Confirmar e Realizar Empréstimo
- **Ator Principal:** Cliente
- **Pré-condições:**
  - O Cliente deve estar autenticado e com a conta ativa (`bloqueado = false`).
  - O carrinho deve conter ao menos 1 exemplar selecionado.
- **Fluxo Principal:**
  1. O Cliente acessa a página do carrinho (`/carrinho`).
  2. Revisa a lista de livros que deseja retirar.
  3. Clica no botão "Confirmar Empréstimo".
  4. O frontend envia requisição `POST /emprestimo/realizar` com o array de IDs dos exemplares (`id_exemplares`).
  5. O backend inicia uma transação atômica (`prisma.$transaction`):
     - Obtém os parâmetros globais de `Configuracao` (`limite_global`, `limite_por_titulo`, `prazo_padrao_dias`).
     - Valida se o usuário não está bloqueado.
     - Valida se nenhum dos exemplares foi emprestado concorrentemente.
     - Valida se o total de livros somado aos empréstimos ativos não ultrapassa o `limite_global` (padrão: 5).
     - Valida se a quantidade de cópias do mesmo título não ultrapassa o `limite_por_titulo` (padrão: 2).
     - Cria o registro na tabela `Emprestimo`.
     - Cria os registros na tabela `ItemEmprestimo` com `data_prazo = now + prazo_padrao_dias` e `count_adiar = 5`.
     - Atualiza o status de cada exemplar para `Emprestado`.
  6. O backend confirma a transação e responde com status `201 Created`.
  7. O frontend limpa o carrinho e redireciona o Cliente para a tela "Meus Empréstimos" (`/meus-emprestimos`).
- **Fluxos Alternativos / Exceção:**
  - *Usuário bloqueado:* Transação abortada. Retorna `400` com "Não é possível realizar empréstimo. Sua conta está bloqueada".
  - *Limite de livros excedido:* Retorna `400` indicando violação do limite global ou de cópias por título.
  - *Exemplar indisponível:* Retorna `400` listando quais exemplares já foram retirados.
- **Pós-condições:** Os exemplares passam a constar como emprestados e o prazo de entrega é estabelecido.

---

#### UC11 - Consultar Empréstimos Ativos
- **Ator Principal:** Cliente
- **Pré-condições:** Usuário autenticado como `CLIENTE`.
- **Fluxo Principal:**
  1. O Cliente acessa a tela "Meus Empréstimos" (`/meus-emprestimos`).
  2. O frontend executa `GET /emprestimo/listar_itens`.
  3. O backend busca todos os `ItemEmprestimo` do usuário onde `data_devolucao IS NULL`.
  4. Calcula para cada item se está em atraso (`data_prazo < now`), os dias restantes, a elegibilidade para renovação e o motivo de eventual bloqueio.
  5. Enriquece os dados com título, autor e capa da Google Books API.
  6. O frontend renderiza os cards de empréstimo com barra de status (`Em dia` ou `Atrasado`), data limite e botões de ação.
- **Pós-condições:** O leitor monitora o tempo restante para a devolução de cada exemplar em sua posse.

---

#### UC12 - Renovar Prazo de Empréstimo
- **Ator Principal:** Cliente
- **Pré-condições:**
  - O empréstimo deve estar ativo e **não estar em atraso**.
  - O exemplar deve possuir renovações restantes (`count_adiar > 0`).
  - Devem ter se passado no mínimo **3 dias** desde o empréstimo inicial ou última renovação.
- **Fluxo Principal:**
  1. Na tela de empréstimos ativos, o Cliente clica no botão "Renovar Empréstimo" do item desejado.
  2. O frontend envia requisição `PUT /emprestimo/adiar/:id`.
  3. O backend valida as regras de negócio em transação:
     - Verifica se `now <= data_prazo` (não atrasado).
     - Verifica se `count_adiar > 0`.
     - Verifica se o intervalo mínimo de 3 dias foi cumprido.
  4. O backend calcula a nova data de prazo (`now + prazo_padrao_dias`), decrementa `count_adiar` e persiste no banco.
  5. Retorna status `200 OK`.
  6. O frontend exibe mensagem de sucesso e atualiza a data limite na tela.
- **Fluxos Alternativos / Exceção:**
  - *Empréstimo em atraso:* Rejeição imediata com mensagem instruindo o leitor a realizar a devolução física.
  - *Intervalo inferior a 3 dias:* Rejeição com cálculo informando quantos dias faltam para liberar a renovação.
  - *Limite de renovações zerado:* Rejeição por esgotamento de tentativas.
- **Pós-condições:** A data de entrega do item é postergada e o contador de adiamentos restantes é decrementado.

---

#### UC13 - Registrar Devolução de Exemplar
- **Ator Principal:** Administrador ou Cliente (Operação de Entrega)
- **Pré-condições:** O item deve constar com empréstimo em aberto (`data_devolucao == null`).
- **Fluxo Principal:**
  1. O usuário solicita a devolução do item via endpoint `PUT /emprestimo/devolver/:id`.
  2. O backend abre transação atômica:
     - Preenche o campo `data_devolucao = new Date()` no `ItemEmprestimo`.
     - Altera o `status` do `ExemplarLivro` de volta para `Disponivel`.
  3. Retorna status `200 OK`.
  4. O exemplar volta imediatamente a ficar elegível para novos empréstimos no acervo.
- **Pós-condições:** O empréstimo do item é encerrado e o exemplar físico é liberado na estante.

---

#### UC14 - Consultar Histórico de Empréstimos
- **Ator Principal:** Cliente
- **Pré-condições:** Usuário autenticado.
- **Fluxo Principal:**
  1. O Cliente acessa a tela de histórico (`/historico`).
  2. O frontend consome `GET /emprestimo/historico_emprestimo`.
  3. O backend retorna todos os itens onde `data_devolucao IS NOT NULL`, ordenados por data de devolução decrescente.
  4. O frontend exibe a lista com capas, títulos, data em que o livro foi retirado e data em que foi devolvido.
- **Pós-condições:** O leitor consulta seu registro histórico de leituras concluídas.

---

### Módulo: Avaliações e Resenhas

#### UC15 - Criar ou Atualizar Avaliação de Livro
- **Ator Principal:** Cliente
- **Pré-condições:** O Cliente deve estar autenticado.
- **Fluxo Principal:**
  1. O Cliente abre o modal de detalhes de um livro no Catálogo (`/`).
  2. Seleciona a quantidade de estrelas (de 1 a 5) no seletor interativo de estrelas.
  3. (Opcional) Digita um comentário/resenha na caixa de texto.
  4. Clica em "Enviar Avaliação".
  5. O frontend envia requisição `POST /livro/:id/avaliacoes` (ou `POST /avaliacao`).
  6. O backend realiza um `upsert` no model `Avaliacao` utilizando a chave composta única `[usuarioId, livroId]`.
  7. O backend invoca `recalcularMediaAvaliacoes(livroId)` para calcular a nova média das notas da obra com `prisma.avaliacao.aggregate`.
  8. O campo `mediaAvaliacoes` da tabela `Livro` é atualizado no banco de dados.
  9. O backend retorna status `201 Created` com a avaliação e a nova média do livro.
  10. A lista de resenhas do modal e a média de estrelas no card do catálogo são atualizadas instantaneamente.
- **Fluxos Alternativos / Exceção:**
  - *Nota fora do intervalo (ex: < 1 ou > 5):* Retorna `400 Bad Request`.
  - *Livro inexistente:* Retorna `404 Not Found`.
- **Pós-condições:** A nota/resenha é gravada e a pontuação pública do livro é recalculada.

---

#### UC16 - Listar Avaliações de um Livro
- **Ator Principal:** Todos (Público)
- **Pré-condições:** Nenhuma.
- **Fluxo Principal:**
  1. No modal de detalhes do livro, o componente `ListaAvaliacoes` executa `GET /livro/:id/avaliacoes`.
  2. O backend retorna todas as avaliações registradas para a obra com a nota, o comentário, a data e o nome do autor da avaliação.
  3. O frontend renderiza a listagem formatada de resenhas.
- **Pós-condições:** Os comentários da comunidade são exibidos de forma transparente.

---

#### UC17 - Gerenciar e Excluir Minhas Avaliações
- **Ator Principal:** Cliente ou Administrador
- **Pré-condições:** Usuário autenticado.
- **Fluxo Principal:**
  1. O Cliente acessa a página de Perfil (`/perfil`), onde a seção "Minhas Avaliações e Resenhas" é carregada (`GET /usuario/minhas-avaliacoes`).
  2. O sistema exibe os cards com os livros avaliados pelo usuário, a nota atribuída e o comentário deixado.
  3. O usuário clica no botão "Excluir" em uma avaliação específica.
  4. O sistema solicita confirmação do usuário.
  5. O frontend envia requisição `DELETE /avaliacao/:id`.
  6. O backend valida se o solicitante é o autor da avaliação ou um `ADMINISTRADOR`.
  7. O registro é deletado da tabela `Avaliacao`.
  8. A média de notas do livro correspondente é recalculada automaticamente.
  9. O frontend recarrega a seção e exibe mensagem de sucesso.
- **Fluxos Alternativos / Exceção:**
  - *Tentativa de exclusão de avaliação de terceiro por usuário comum:* O backend recusa com status `403 Forbidden`.
- **Pós-condições:** A avaliação é excluída e a média da obra é reajustada.

---

### Módulo: Painéis Administrativos e Configurações

#### UC18 - Gerenciar Usuários e Bloqueios
- **Ator Principal:** Administrador
- **Pré-condições:** Usuário autenticado como `ADMINISTRADOR`.
- **Fluxo Principal:**
  1. O Administrador acessa a tela de gestão de usuários (`/gerenciar-usuarios`).
  2. O frontend consome `GET /usuario`.
  3. O sistema lista todos os usuários cadastrados com Nome, E-mail, CPF, Cargo (`ADMINISTRADOR` / `CLIENTE`) e Status (`Ativo` / `Bloqueado`).
  4. O Administrador pode:
     - **Bloquear/Desbloquear:** Clica no botão de status para alternar o campo `bloqueado` (`PUT /usuario/bloquear/:id`).
     - **Cadastrar Novo Usuário:** Clica em "Novo Usuário" e preenche o formulário definindo o perfil (`POST /usuario/adicionar_usuario`).
     - **Excluir Usuário:** Clica no botão de exclusão (`DELETE /usuario/deletar/:id`).
- **Pós-condições:** O estado do usuário é modificado, impactando imediatamente sua permissão de login ou de realização de novos empréstimos.

---

#### UC19 - Visualizar Dashboard de Métricas e Alertas
- **Ator Principal:** Administrador
- **Pré-condições:** Usuário autenticado como `ADMINISTRADOR`.
- **Fluxo Principal:**
  1. O Administrador acessa o painel de controle (`/dashboard`).
  2. O sistema realiza chamadas paralelas para os endpoints:
     - `GET /dashboard/kpis`: Total de títulos, total de exemplares, empréstimos ativos, devoluções em atraso, total de leitores e usuários bloqueados.
     - `GET /dashboard/alertas`: Empréstimos com prazo vencido detalhando leitor, livro e dias de atraso; últimas 5 movimentações do sistema; títulos com estoque zerado ou em nível crítico (<= 1 disponível).
     - `GET /dashboard/estatisticas`: Gráfico de fluxo mensal de empréstimos vs devoluções dos últimos 6 meses e ranking dos 5 livros mais emprestados.
  3. O frontend renderiza os KPIs em cards destacados, gráficos interativos e painéis de monitoramento em tempo real.
- **Pós-condições:** A administração obtém visão analítica e operacional da biblioteca.

---

#### UC20 - Configurar Parâmetros Operacionais da Biblioteca
- **Ator Principal:** Administrador
- **Pré-condições:** Usuário autenticado como `ADMINISTRADOR`.
- **Fluxo Principal:**
  1. O Administrador acessa a tela de configurações (`/configuracao`).
  2. O frontend obtém os parâmetros vigentes via `GET /configuracao`.
  3. O Administrador altera os valores desejados:
     - *Limite global de livros por empréstimo* (ex: de 5 para 3).
     - *Limite de cópias do mesmo título por leitor* (ex: de 2 para 1).
     - *Prazo padrão de empréstimo em dias* (ex: de 7 para 14 dias).
     - *Dias de penalidade por atraso*.
  4. Clica em "Salvar Configurações".
  5. O frontend envia `PUT /configuracao` com o payload atualizado.
  6. O backend persiste na tabela `Configuracao` e responde com sucesso.
- **Pós-condições:** As novas regras passam a reger os próximos empréstimos e cálculos de prazo em todo o sistema.
