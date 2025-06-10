import { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/card.css";

function ProductosContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68100d9e27f2fdac24102149.mockapi.io/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        console.log(datos);
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setError("Hubo un problema al cargar los productos");
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <section className="producto-header">
        <h2>Productos</h2>
        <h3>Vestidos</h3>
      </section>
      <div className="producto-container">
        {productos.map((producto) => (
          <Card producto={producto} key={producto.id} />
        ))}
      </div>
    </div>
  );
}
export default ProductosContainer;
