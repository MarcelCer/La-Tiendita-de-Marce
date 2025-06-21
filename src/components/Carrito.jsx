import React from "react";

import CardCarrito from "./CardCarrito";
import "../styles/carrito-container.css";
import "../styles/cardCarrito.css";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";

function Carrito() {
  const { user } = useAuthContext();
  const {
    productosCarrito,
    eliminarProductoDelCarrito,
    sumarAlCarrito,
    descontarProductoDelCarrito,
    totalCarrito,
  } = useContext(CarritoContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="carrito-container">
      {productosCarrito.length > 0 ? (
        productosCarrito.map((producto) => (
          <CardCarrito
            producto={producto}
            key={producto.id}
            onEliminarProductoDelCarrito={eliminarProductoDelCarrito}
            onSumarAlCarrito={sumarAlCarrito}
            onDescontarProductoDelCarrito={descontarProductoDelCarrito}
          />
        ))
      ) : (
        <p>Carrito vacío</p>
      )}
      <div className="total-carrito">
        <h3>Total: ${totalCarrito.toLocaleString()}</h3>
      </div>
    </div>
  );
}

export default Carrito;
