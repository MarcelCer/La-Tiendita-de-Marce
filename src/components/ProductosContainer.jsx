import { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/card.css";
import { useProductosContext } from "../context/ProductosContext";
import { Container, Row, Col } from "react-bootstrap";

function ProductosContainer() {
  const { productos, obtenerProductos } = useProductosContext();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productos.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  useEffect(() => {
    obtenerProductos()
      .then((productos) => {
        setCargando(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setError("Hubo un problema al cargar los productos");
      });
  }, []);

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  if (cargando) {
    return <p>Cargando productos...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else {
    return (
      <Container className="py-4">
        <section className="producto-header mb-4">
          <h2
            style={{ color: "#40394b" }}
            className="text-center fw-bold display-6  mb-4"
          >
            <span className="border-bottom border-2 border-secundary pb-1">
              Explora Nuestros Productos
            </span>
          </h2>
        </section>
        <Row>
          {productosActuales.map((producto) => (
            <Col
              key={producto.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <Card producto={producto} key={producto.id} />
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center my-4">
          {Array.from({ length: totalPaginas }, (_, index) => (
            <button
              key={index + 1}
              className={`btn mx-1 ${
                paginaActual === index + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => cambiarPagina(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </Container>
    );
  }
}
export default ProductosContainer;
