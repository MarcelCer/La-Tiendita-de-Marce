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
import FormularioEdicion from "./components/FormularioEdicionBoostrap";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar2 from "./components/Nav2";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FooterBoostrap from "./components/FooterBoostrap";

function App() {
  const { verificacionLog } = useAuthContext();
  const [cargandoAuth, setCargandoAuth] = useState(true);

  useEffect(() => {
    async function iniciarSesion() {
      await verificacionLog();
      setCargandoAuth(false);
    }
    iniciarSesion();
  }, []);

  if (cargandoAuth) return <p>Verificando sesión...</p>;

  return (
    <Router>
      <div>
        <Container fluid className="bg-light">
          <Row className="align-items-center py-2">
            <Col xs={12} md={10}>
              <Navbar2 />
            </Col>
            <Col xs={12} md={2} className="text-md-end mt-2 mt-md-0">
              <BotonCarrito />
            </Col>
          </Row>
        </Container>

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
          <Route
            path="/admin/eliminarProducto/:id"
            element={<FormularioEdicion />}
          />
        </Routes>

        <FooterBoostrap />
      </div>
    </Router>
  );
}

export default App;
