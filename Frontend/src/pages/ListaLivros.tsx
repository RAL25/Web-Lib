import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

// 1. Definimos o "molde" (Interface) de como é um Livro que vem do backend
interface Livro {
  id: number;
  titulo: string;
  autor: string;
}

export default function ListaLivros() {
  // 2. Estados do React para guardar os dados, carregamento e erros
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");

  // 3. useEffect executa essa função automaticamente quando a tela abre
  useEffect(() => {
    // Substitua a porta 3000 pela porta correta do seu backend, se for diferente
    axios
      .get("http://localhost:3001/api/lib/livro")
      .then((resposta) => {
        setLivros(resposta.data); // Guarda os livros no estado
        setCarregando(false); // Para a rodinha de carregar
      })
      .catch((error) => {
        console.error("Erro ao buscar livros:", error);
        setErro("Não foi possível carregar o catálogo de livros.");
        setCarregando(false);
      });
  }, []); // Esse array vazio [] garante que só execute 1 vez ao abrir a tela

  // 4. O que mostrar enquanto estiver buscando os dados da API
  if (carregando) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 5. O que mostrar se o backend estiver desligado ou der erro
  if (erro) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">{erro}</Alert>
      </Container>
    );
  }

  // 6. A Tela Principal com os dados reais
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Catálogo de Livros
      </Typography>

      {/* O Grid organiza os Cards lado a lado. xs=12 (celular), sm=6 (tablet), md=4 (PC) */}
      <Grid container spacing={3}>
        {livros.map((livro) => (
          <Grid item xs={12} sm={6} md={4} key={livro.id}>
            {/* elevation={3} dá uma sombra bonita no card */}
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                  {livro.titulo}
                </Typography>
                <Typography color="text.secondary">
                  Autor: {livro.autor}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mensagem caso o banco de dados esteja vazio */}
      {livros.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
          Nenhum livro cadastrado no momento.
        </Typography>
      )}
    </Container>
  );
}
