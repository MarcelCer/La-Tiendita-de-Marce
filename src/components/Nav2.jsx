import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useProductosContext } from "../context/ProductosContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo_web from "../assets/logo_web.png";

function Navbar2() {
  const { admin } = useAuthContext();
  const { buscarProductos } = useProductosContext();
  const [termino, setTermino] = useState("");
  const [resultados, setResultados] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const encontrados = buscarProductos(termino);

    if (encontrados.length > 0) {
      navigate(`/productos/${encontrados[0].id}`);
    } else {
      // Podés agregar un toast, SweetAlert o mensaje visual si no hay coincidencias
      console.log("Producto no encontrado");
    }

    setTermino(""); // Opcional: limpiar input
    setResultados([]); // Limpiar sugerencias si las estuvieras mostrando
  };

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src={logo_web}
            alt="Logo Tu Tienda"
            width="100"
            height="100"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">
              Nosotros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
            {admin && (
              <Nav.Link as={NavLink} to="/admin/agregarProducto">
                Agregar Producto
              </Nav.Link>
            )}
          </Nav>

          <Form className="d-flex position-relative" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Buscar"
              className="me-2"
              value={termino}
              onChange={(e) => setTermino(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              Buscar
            </Button>

            {resultados.length > 0 && (
              <div
                className="position-absolute bg-white rounded shadow mt-2 z-3"
                style={{ top: "100%", right: 0, width: "300px" }}
              >
                {resultados.map((producto) => (
                  <div className="p-2 border-bottom" key={producto.id}>
                    <h6 className="mb-1">{producto.name}</h6>
                    <p
                      className="mb-2 text-muted"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {producto.descripcion?.slice(0, 60)}...
                    </p>
                    <NavLink
                      to={`/detalle/${producto.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Ver más
                    </NavLink>
                  </div>
                ))}
              </div>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar2;
