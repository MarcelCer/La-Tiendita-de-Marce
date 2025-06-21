import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/productoDetalle.css";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";
import { dispararSweet } from "../assets/SweetAlert";

function ProductoDetalle() {
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto } = useProductosContext();
  const { id } = useParams();

  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => {
        setCargando(false);
      })
      .catch((error) => {
        if (error == "Producto no encontrado") {
          setError("Producto no encontrado");
        }
        if (error == "Hubo un error al obtener el producto.") {
          setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
      });
  }, [id]);

  function agregar() {
    if (cantidad < 1) return;
    dispararSweet(
      "Producto Agregado",
      "El producto fue agregado al carrito",
      "success",
      "Cerrar"
    );
    agregarAlCarrito({ ...productoEncontrado, cantidad });
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
  if (!productoEncontrado) return null;

  return (
    <div className="detalle-container">
      <img
        className="detalle-imagen"
        src={productoEncontrado.image}
        alt={productoEncontrado.name}
      />
      <div className="detalle-info">
        <h2>{productoEncontrado.name}</h2>
        <p>{productoEncontrado.descripcion}</p>
        <p>${productoEncontrado.price}</p>
        <span>Sub total: ${Number(productoEncontrado.price * cantidad)}</span>
        <div className="detalle-contador">
          <button onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>
        {admin ? (
          <Link to={`/admin/editarProducto/${productoEncontrado.id}`}>
            <button>Editar Producto</button>
          </Link>
        ) : (
          <button onClick={agregar}>Agregar al carrito</button>
        )}
      </div>
    </div>
  );
}

export default ProductoDetalle;
