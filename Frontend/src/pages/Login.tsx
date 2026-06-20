import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";

export default function Login() {
  // Estados para controlar os inputs e mensagens
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue
    setErro("");
    setCarregando(true);

    try {
      // Faz a requisição enviando o email e senha para a rota pública de login
      const resposta = await axios.post("http://localhost:3000/login", {
        email,
        senha, // Certifique-se de que o seu backend espera "senha" e não "password"
      });

      // Se o login for bem-sucedido, o seu backend deve retornar o token (ex: resposta.data.token)
      const token = resposta.data.token;

      if (token) {
        // Salva o token de forma segura no LocalStorage do navegador
        localStorage.setItem("token_biblioteca", token);

        // Redireciona o usuário de volta para a tela inicial (Catálogo de Livros)
        navigate("/");
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      // Se o backend enviar uma mensagem amigável, nós a exibimos
      if (error.response && error.response.data && error.response.data.erro) {
        setErro(error.response.data.erro);
      } else {
        setErro("E-mail ou senha incorretos. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Container maxWidth="xs">
      {/* Box para centralizar o formulário verticalmente na tela */}
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Paper cria esse efeito de cartão/caixa flutuante branca com sombra */}
        <Paper
          elevation={4}
          sx={{ padding: 4, width: "100%", borderRadius: 3 }}
        >
          <Typography
            component="h1"
            variant="h5"
            align="center"
            // color="primary"
            sx={{ fontWeight: "bold", mb: 3, color: "#000000" }}
          >
            Acessar o Sistema
          </Typography>

          {/* Se houver algum erro, exibe o alerta vermelho */}
          {erro && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {erro}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={carregando}
              sx={{ mt: 3, mb: 2, fontWeight: "bold", textTransform: "none" }}
            >
              {carregando ? "Autenticando..." : "Entrar"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
