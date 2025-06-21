import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";
import { dispararSweet } from "../assets/SweetAlert";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
{
  /*function FormularioEdicion() {
  const { obtenerProducto, editarProducto } = useProductosContext();
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then((prod) => {
        console.log("Producto recibido en componente:", prod);
        setProducto(prod); // No setProducto(prod.id), sino el objeto completo
        setError(null);
        setCargando(false);
      })
      .catch((error) => {
        setError(error); // El mensaje exacto
        setCargando(false);
      });
  }, [id]);

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio.";
    }

    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
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

  const handleSubmit = async (e) => {
    console.log("Enviando producto a editar:", producto);

    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm == true) {
      editarProducto(producto)
        .then((prod) => {
          alert("Producto actualizado correctamente");
        })
        .catch((error) => {
          alert("Hubo un problema al actualizar el producto." + error.message);
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

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={producto.name || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>URL de la Imagen</label>
        <input
          type="text"
          name="image"
          value={producto.image || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={producto.price || ""}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={producto.descripcion || ""}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Actualizar Producto</button>
    </form>
  );
}
export default FormularioEdicion;*/
}

function FormularioEdicion({}) {
  const { admin } = useAuthContext();
  const { obtenerProducto, productoEncontrado, editarProducto } =
    useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoEncontrado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    obtenerProducto(id)
      .then(() => {
        //setProducto(productoEncontrado)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    console.log(producto.descripcion.trim());
    if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.imagen.trim()) {
      return "La url de la imgaen no debe estar vacía";
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm == true) {
      editarProducto(producto)
        .then((prod) => {
          alert("Producto actualizado correctamente.");
        })
        .catch((error) => {
          alert("Hubo un problema al actualizar el producto. " + error.message);
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={producto.name || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>URL de la Imagen</label>
        <input
          type="text"
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={producto.price || ""}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={producto.descripcion || ""}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Actualizar Producto</button>
    </form>
  );
}

export default FormularioEdicion;
