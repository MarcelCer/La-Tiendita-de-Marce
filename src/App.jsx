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

function App() {
  {
    /*const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(
        "https://68100d9e27f2fdac24102149.mockapi.io/productos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        }
      );

      if (!respuesta.ok) {
        throw new Error("Error al agregar el producto.");
      }
      const data = await respuesta.json();
      console.log("Producto agregado:", data);
      alert("Producto agregado correctamente");
    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al agregar el producto.");
    }
  };*/

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
          </Routes>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
