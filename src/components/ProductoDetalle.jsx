import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/productoDetalle.css";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";
import { dispararSweet } from "../assets/SweetAlert";
import Swal from "sweetalert2";

function ProductoDetalle() {
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } =
    useProductosContext();
  const { id } = useParams();

  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const navegar = useNavigate();

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

  {
    /*function dispararEliminar() {
    eliminarProducto(id)
      .then(() => {
        navegar("/productos");
      })
      .catch((error) => {
        dispararSweet(
          "Hubo un problema al agregar el producto",
          error,
          "error",
          "Cerrar"
        );
      });
  }*/
  }

  async function dispararEliminar() {
    const resultado = await Swal.fire({
      title: "¿Estás segura?",
      text: "Esta acción eliminará el producto permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      eliminarProducto(id)
        .then(() => {
          Swal.fire("Eliminado", "El producto fue eliminado.", "success");
          navegar("/productos");
        })
        .catch((error) => {
          Swal.fire(
            "Error",
            "Hubo un problema al eliminar el producto: " + error.message,
            "error"
          );
        });
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
        {admin ? (
          <button onClick={dispararEliminar}>Eliminar Producto</button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ProductoDetalle;
