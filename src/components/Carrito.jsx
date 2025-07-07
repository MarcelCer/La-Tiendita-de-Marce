import React from "react";
import CardCarrito from "./CardCarritoBoostrap";

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { Container } from "react-bootstrap";

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
    <Container className="py-4">
      <div className="carrito-container">
        {productosCarrito.length > 0 ? (
          productosCarrito.map((producto) => (
            <div
              key={producto.id}
              className="mb-3 mx-auto"
              style={{ maxWidth: "800px" }}
            >
              <CardCarrito
                producto={producto}
                onEliminarProductoDelCarrito={eliminarProductoDelCarrito}
                onSumarAlCarrito={sumarAlCarrito}
                onDescontarProductoDelCarrito={descontarProductoDelCarrito}
              />
            </div>
          ))
        ) : (
          <p className="text-center">Carrito vacío</p>
        )}
        <div className="mt-4 text-end">
          <h3>Total: ${totalCarrito.toLocaleString()}</h3>
        </div>
      </div>
    </Container>
  );
}

export default Carrito;
