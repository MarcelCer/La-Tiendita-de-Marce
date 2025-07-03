import React from "react";

import CardCarrito from "./CardCarritoBoostrap";
import "../styles/carrito-container.css";

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
          <div
            key={producto.id}
            className="d-flex justify-content-center mb-3"
            style={{ width: "100%" }}
          >
            <div className="card-wrapper w-100" style={{ maxWidth: "800px" }}>
              <CardCarrito
                producto={producto}
                onEliminarProductoDelCarrito={eliminarProductoDelCarrito}
                onSumarAlCarrito={sumarAlCarrito}
                onDescontarProductoDelCarrito={descontarProductoDelCarrito}
              />
            </div>
          </div>
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
