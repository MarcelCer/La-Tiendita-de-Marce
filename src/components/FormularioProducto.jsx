import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { agregarProducto } from "../assets/requests";
import { dispararSweet } from "../assets/SweetAlert";
import { Navigate } from "react-router-dom";

function FormularioProducto() {
  console.log("FormularioProducto se está renderizando...");
  const { admin } = useAuthContext();
  const [producto, setProducto] = useState({
    name: "",
    price: "",
    description: "URL de la imágen",
    image: "",
  });

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (!validarForm) {
      agregarProducto(producto)
        .then((data) => {
          setProducto({ name: "", price: "", description: "", imagen: "" });
        })
        .catch((error) => {
          dispararSweet(
            "Hubo un problema al agregar el producto",
            error,
            "error",
            "Cerrar"
          );
        });
    } else {
      dispararSweet(
        "Error en la carga de producto",
        validarForm,
        "error",
        "Cerrar"
      );
    }
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio.";
    }

    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.image.trim()) {
      return "La URL de la imagen no debe estar vacía";
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <form onSubmit={handleSubmit2}>
      <h2>Agregar Producto</h2>
      <div>
        <label htmlFor="name">
          Nombre:
          <input
            type="text"
            name="name"
            value={producto.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="image">
          Imágen:
          <input
            type="text"
            name="image"
            value={producto.image}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="price">
          Precio:
          <input
            type="number"
            name="price"
            value={producto.price}
            onChange={handleChange}
            required
            min="0"
          />
        </label>
      </div>

      <div>
        <label htmlFor="description">
          Descripción:
          <textarea
            name="description"
            value={producto.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default FormularioProducto;
