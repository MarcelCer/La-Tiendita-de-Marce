import { Link, Navigate } from "react-router-dom";
import "../styles/card.css";

function Card({ producto }) {
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
