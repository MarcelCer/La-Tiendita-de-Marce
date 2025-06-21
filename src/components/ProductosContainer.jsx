import { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/card.css";
import { useProductosContext } from "../context/ProductosContext";
function ProductosContainer() {
  const { productos, obtenerProductos } = useProductosContext();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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

  if (cargando) {
    return <p>Cargando productos...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else {
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
}
export default ProductosContainer;
