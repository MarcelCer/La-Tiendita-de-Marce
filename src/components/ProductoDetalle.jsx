import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dispararSweet } from "../assets/SweetAlert";
import "../styles/productoDetalle.css";
import { CarritoContext } from "../context/CarritoContext";

function ProductoDetalle() {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68100d9e27f2fdac24102149.mockapi.io/productos")
      .then((res) => res.json())
      .then((datos) => {
        const productoEncontrado = datos.find((item) => item.id === id);
        if (productoEncontrado) {
          setProducto(productoEncontrado);
          // console.log("cantidad de productos " + cantidad);
        } else {
          setError("Producto no encontrado.");
        }
        setCargando(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setError("Hubo un error al obtener el producto.");
        setCargando(false);
      });
  }, [id]);

  function agregar() {
    if (cantidad < 1) return;
    dispararSweet(
      "Producto Agregado",
      "El producto fue agregado al carrito con éxito",
      "success",
      "Cerrar"
    );
    agregarAlCarrito({ ...producto, cantidad });
  }

  function sumarContador() {
    setCantidad((cantPrev) => cantPrev + 1);
  }

  function restarContador() {
    if (cantidad > 1) {
      setCantidad((cantPrev) => cantPrev - 1);
    }
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return null;

  return (
    <div className="detalle-container">
      <img
        className="detalle-imagen"
        src={producto.image}
        alt={producto.name}
      />
      <div className="detalle-info">
        <h2>{producto.name}</h2>
        <p>{producto.description}</p>
        <p>${producto.price}</p>
        <span>Sub total: ${producto.price * cantidad}</span>
        <div className="detalle-contador">
          <button onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>
        <button onClick={agregar}>Agregar al carrito</button>
      </div>
    </div>
  );
}

export default ProductoDetalle;
