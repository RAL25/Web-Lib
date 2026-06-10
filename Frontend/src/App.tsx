import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ListaLivros from "./pages/ListaLivros";

function App() {
  return (
    <BrowserRouter>
      {/* O Menu Superior (Navbar) fica fora das Rotas para aparecer em todas as telas */}
      <AppBar position="static">
        <Toolbar>
          <MenuBookIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Biblioteca Central
          </Typography>

          {/* Botão que navega para a página inicial */}
          <Button color="inherit" component={Link} to="/">
            Catálogo
          </Button>
          {/* Botão preparado para a futura tela de login */}
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Aqui é onde o conteúdo das páginas vai renderizar (mudar) */}
      <Routes>
        {/* Quando a URL for "/", ele mostra o componente ListaLivros */}
        <Route path="/" element={<ListaLivros />} />

        {/* Rota reservada para a tela de Login que faremos depois */}
        <Route
          path="/login"
          element={
            <div style={{ padding: "20px", textAlign: "center" }}>
              <h1>Tela de Login em construção...</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
