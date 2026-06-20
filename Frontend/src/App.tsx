import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ListaLivros from "./pages/ListaLivros";
import Login from "./pages/Login"; // 1. Importe a nova tela de Login aqui!

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <MenuBookIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Biblioteca Central
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Catálogo
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<ListaLivros />} />

        {/* 2. Substitua o elemento antigo pela chamada da tela real <Login /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
