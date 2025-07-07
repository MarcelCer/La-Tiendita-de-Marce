import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { dispararSweet } from "../assets/SweetAlert";
import { Navigate } from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";

function FormularioProducto() {
  const { agregarProducto } = useProductosContext();
  const { admin } = useAuthContext();
  const [producto, setProducto] = useState({
    name: "",
    price: "",
    descripcion: "",
    image: "",
  });

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (!validarForm) {
      agregarProducto(producto)
        .then(() => {
          setProducto({ name: "", price: "", descripcion: "", image: "" });
          dispararSweet(
            "Producto agregado",
            "El producto se agregó correctamente",
            "success",
            "Cerrar"
          );
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
    if (!producto.name.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0)
      return "El precio debe ser mayor a 0.";
    if (!producto.descripcion.trim() || producto.descripcion.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.image.trim())
      return "La URL de la imagen no debe estar vacía";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  if (!admin) return <Navigate to="/login" replace />;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 bg-light p-4 shadow rounded">
          <h2 style={{ color: "#c29b94" }} className="text-center mb-4">
            Agregar Producto
          </h2>
          <form onSubmit={handleSubmit2}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={producto.name}
                onChange={handleChange}
                placeholder="Nombre del producto"
                required
              />
              <label htmlFor="name">Nombre</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="url"
                className="form-control"
                name="image"
                id="image"
                value={producto.image}
                onChange={handleChange}
                placeholder="URL de la imagen"
                required
              />
              <label htmlFor="image">URL de la Imagen</label>
            </div>

            {producto.image && (
              <div className="mb-3 text-center">
                <img
                  src={producto.image}
                  alt="Vista previa"
                  className="img-fluid"
                  style={{ maxHeight: "250px", objectFit: "contain" }}
                />
              </div>
            )}

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                name="price"
                id="price"
                value={producto.price}
                onChange={handleChange}
                min="0"
                placeholder="Precio"
                required
              />
              <label htmlFor="price">Precio</label>
            </div>

            <div className="form-floating mb-4">
              <textarea
                className="form-control"
                name="descripcion"
                id="descripcion"
                style={{ height: "120px" }}
                value={producto.descripcion}
                onChange={handleChange}
                placeholder="Descripción del producto"
                required
              />
              <label htmlFor="descripcion">Descripción</label>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-lg"
                style={{
                  backgroundColor: "#c29b94",
                  color: "#fff",
                  border: "none",
                }}
              >
                Agregar Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioProducto;
