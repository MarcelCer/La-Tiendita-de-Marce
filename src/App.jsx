import Home from "./layout/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Carrito from "./components/Carrito";
import Footer from "./components/Footer";
import About from "./components/About";
import Contacto from "./components/Contacto";
import BotonCarrito from "./components/BotonCarrito";
import ProductoDetalle from "./components/ProductoDetalle";
import ProductosContainer from "./components/ProductosContainer";
import Login2 from "./components/Login2";
import Admin from "./components/Admin";
import FormularioProducto from "./components/FormularioProducto";
import FormularioEdicion from "./components/FormularioEdicion";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const { verificacionLog } = useAuthContext();

  useEffect(() => {
    verificacionLog();
  }, []);

  return (
    <Router>
      <div>
        <div className="navegador">
          <Nav />
          <BotonCarrito />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login2 />} />
          <Route path="/productos" element={<ProductosContainer />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/agregarProducto"
            element={<FormularioProducto />}
          />
          <Route
            path="/admin/editarProducto/:id"
            element={<FormularioEdicion />}
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
