import { Link, Navigate } from "react-router-dom";
import "../styles/card.css";

function Card({ producto }) {
  {
    /*const [cantidad, setCantidad] = useState(1);*/
  }

  function navegar() {
    const ruta = "/productos/" + producto.id;
    return <Navigate to={ruta} replace />;
  }

  {
    /*function agregarAlCarrito() {
    if (cantidad < 1) {
      return;
    }
    // El spread operator hace una copia de todos los atributos del objeto.
    // Esto se hace para no modificar el objeto original.
    // Este es un principio de programación funcional que se conoce como inmutabilidad.
    onAgregarAlCarrito({ ...producto, cantidad }); // Spread operator para pasar todos los atributos del producto y la cantidad
  }*/
  }

  {
    /*function restarContador() {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }*/
  }

  return (
    <div key={producto.id} className="producto">
      <h3>{producto.name}</h3>

      <Link to={"/productos/" + producto.id}>
        <img
          src={producto.image}
          alt="producto"
          className="producto-imagen-card"
        />
      </Link>

      <p>{producto.price}</p>
      <Link to={"/productos/" + producto.id}>
        <button style={{ color: "black" }}>Ver detalles del producto</button>
      </Link>
    </div>
  );
}
export default Card;
