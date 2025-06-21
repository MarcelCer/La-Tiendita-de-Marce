import React, { createContext, useState } from "react";
import { dispararSweet } from "../assets/SweetAlert";
import { TbAlertOctagonFilled } from "react-icons/tb";

// Crear el contexto
export const CarritoContext = createContext();

// Proveedor del contexto
export function CarritoProvider({ children }) {
  const [productosCarrito, setProductosCarrito] = useState([]);

  const cantidadDeProductos = productosCarrito.reduce(
    (cantidadTotal, producto) => {
      const cantidadParcial = producto.cantidad;

      return cantidadTotal + cantidadParcial;
    },
    0
  );

  const agregarAlCarrito = (producto) => {
    console.log(productosCarrito);
    const existe = productosCarrito.find((p) => p.id === producto.id); // Verifica si el producto ya está en el carrito
    console.log(existe);
    if (existe) {
      const carritoActualizado = productosCarrito.map((p) => {
        if (p.id === producto.id) {
          const productoActualizado = {
            ...p,
            cantidad: p.cantidad + producto.cantidad,
          };
          console.log(producto.cantidad);
          return productoActualizado;
        }

        return p;
      });

      setProductosCarrito(carritoActualizado);
    } else {
      const nuevoCarrito = [...productosCarrito, producto]; //Agregamos el nuevo producto al carrito

      setProductosCarrito(nuevoCarrito);
    }
  };

  const vaciarCarrito = () => {
    setProductosCarrito([]);
  };

  function eliminarProductoDelCarrito(id) {
    console.log("eliminar producto", id);
    dispararSweet(
      "Se eliminará el producto del carrito",
      "¡Producto Eliminado!",
      <TbAlertOctagonFilled />
    );

    const productosActualizados = productosCarrito.filter(
      (producto) => producto.id !== id
    );

    console.log(productosActualizados);
    setProductosCarrito(productosActualizados);
  }

  function descontarProductoDelCarrito(producto) {
    if (producto.cantidad === 1) {
      eliminarProductoDelCarrito(producto.id);
    } else {
      setProductosCarrito((prevProductos) =>
        prevProductos
          .map((p) =>
            p.id === producto.id ? { ...p, cantidad: p.cantidad - 1 } : p
          )
          .filter((p) => p.cantidad > 0)
      );
    }
  }

  function sumarAlCarrito(producto) {
    setProductosCarrito((prevProductos) =>
      prevProductos.map((p) =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  }

  const totalCarrito = productosCarrito.reduce((acum, prod) => {
    const precio = parseFloat(prod.price);
    const cantidad = prod.cantidad || 1; // Ajustá el nombre si usás otro campo
    return acum + precio * cantidad;
  }, 0);

  return (
    <CarritoContext.Provider
      value={{
        productosCarrito,
        cantidadDeProductos,
        agregarAlCarrito,
        eliminarProductoDelCarrito,
        descontarProductoDelCarrito,
        sumarAlCarrito,
        vaciarCarrito,
        totalCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
