import React, { createContext, useState, useContext } from "react";

// Crear el contexto de de los productos
const ProductosContext = createContext();
export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  function obtenerProductos() {
    return new Promise((res, rej) => {
      fetch("https://68100d9e27f2fdac24102149.mockapi.io/productos")
        .then((respuesta) => respuesta.json())
        .then((datos) => {
          console.log("Los productos obtenidos son: ", datos);
          setProductos(datos);
          res(datos);
          //setCargando(false);
        })
        .catch((error) => {
          console.log("Error", error);
          //setError('Hubo un problema al cargar los productos.');
          //setCargando(false);
          rej(error);
        });
    });
  }

  const agregarProducto = (producto) => {
    return new Promise(async (res, rej) => {
      try {
        const respuesta = await fetch(
          "https://68100d9e27f2fdac24102149.mockapi.io/productos",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
          }
        );

        if (!respuesta.ok) {
          throw new Error("Error al agregar el producto.");
        }
        const data = await respuesta.json();
        console.log("Producto agregado:", data);
        res(data);
        //alert('Producto agregado correctamente');
      } catch (error) {
        console.error(error.message);
        //alert('Hubo un problema al agregar el producto.');
        rej(error.message);
      }
    });
  };

  function obtenerProducto(id) {
    return new Promise((res, rej) => {
      fetch("https://68100d9e27f2fdac24102149.mockapi.io/productos")
        .then((res) => res.json())
        .then((datos) => {
          const productoEncontrado = datos.find(
            (item) => item.id === String(id)
          );
          if (productoEncontrado) {
            setProductoEncontrado(productoEncontrado);
            console.log("El producto encontrado es:", productoEncontrado); ///hasta acá obtiene el producto
            res(productoEncontrado);
          } else {
            rej("Producto no encontrado!!!");
          }
        })
        .catch((err) => {
          console.log("Error:", err);
          rej("Hubo un error al obtener el producto.");
        });
    });
  }

  function editarProducto(producto) {
    console.log("Producto a editar:", producto);
    console.log("ID usado en la URL:", producto.id);

    return new Promise(async (res, rej) => {
      try {
        const { createdAt, ...productoLimpio } = producto;
        productoLimpio.descripcion = producto.descripcion;

        console.log("descripción del producto: ", producto.descripcion);

        const respuesta = await fetch(
          `https://68100d9e27f2fdac24102149.mockapi.io/productos/${producto.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productoLimpio),
          }
        );

        const status = respuesta.status;
        const texto = await respuesta.text();

        console.log("➡️ Estado HTTP:", status);
        console.log("➡️ Respuesta del servidor:", texto);

        if (!respuesta.ok) {
          throw new Error(`Servidor respondió con error: ${status}`);
        }

        const data = JSON.parse(texto);
        res(data);
      } catch (error) {
        console.error("🛑 Error atrapado:", error.message);
        rej(error);
      }
    });
  }

  const eliminarProducto = (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar?");
    if (confirmar) {
      return new Promise(async (res, rej) => {
        try {
          console.log("🗑️ Eliminando producto con ID:", id);
          const respuesta = await fetch(
            `https://68100d9e27f2fdac24102149.mockapi.io/productos/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!respuesta.ok)
            throw new Error(`Error al eliminar (código: ${respuesta.status})`);
          alert("Producto eliminado correctamente.");
          res();
        } catch (error) {
          console.error(error.message);
          alert("Hubo un problema al eliminar el producto.");
          rej(error);
        }
      });
    }
  };

  function buscarProductos(termino) {
    return productos.filter(
      (producto) =>
        producto.name &&
        producto.name.toLowerCase().includes(termino.toLowerCase())
    );
  }

  return (
    <ProductosContext.Provider
      value={{
        obtenerProductos,
        productos,
        agregarProducto,
        obtenerProducto,
        productoEncontrado,
        editarProducto,
        eliminarProducto,
        buscarProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
export const useProductosContext = () => useContext(ProductosContext);
