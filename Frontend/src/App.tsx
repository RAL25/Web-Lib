import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CarrinhoProvider } from "./contexts/CarrinhoContext";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <Router>
          <div className="w-full min-h-screen flex flex-col">
            <AppRoutes />
          </div>
        </Router>
      </CarrinhoProvider>
    </AuthProvider>
  );
}

export default App;
