import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CarritoContext, CarritoProvider } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";

function Nav({}) {
  const { productosCarrito } = useContext(CarritoContext);
  const { user, admin } = useAuthContext();

  return (
    <nav
      style={{
        backgroundColor: "#333",
        color: "white",
        padding: "10px",
        width: "100%",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "space-around",
          margin: 0,
        }}
      >
        <li>
          <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/productos"
            style={{ color: "white", textDecoration: "none" }}
          >
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/nosotros"
            style={{ color: "white", textDecoration: "none" }}
          >
            Nosotros
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contacto"
            style={{ color: "white", textDecoration: "none" }}
          >
            Contacto
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/login"
            style={{ color: "white", textDecoration: "none" }}
          >
            Login
          </NavLink>
        </li>
        {admin ? (
          <li>
            <NavLink
              to="/admin/agregarProducto"
              style={({ isActive }) => ({
                color: isActive ? "#ffc107" : "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Agregar productos
            </NavLink>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
