import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import "../styles/botonCarrito.css";
import { CarritoContext } from "../context/CarritoContext";
import { useContext } from "react";

function BotonCarrito() {
  const { cantidadDeProductos } = useContext(CarritoContext);

  return (
    <div className="contenedor-icono-carrito">
      <Link to="/carrito">
        <IoCart size={30} style={{ color: "black" }} />
        <span style={{ fontSize: "18px", marginLeft: "5px" }}>
          {cantidadDeProductos}
        </span>
      </Link>
    </div>
  );
}

export default BotonCarrito;
