import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { crearUsuario } from "../auth/firebase";
import { dispararSweet } from "../assets/SweetAlert";
import { loginEmailPass } from "../auth/firebase";

function Login2() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de autenticación
    if (usuario === "admin" && password === "1234") {
      login(usuario);
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password);
    login(usuario);
  }

  const handleSubmit2 = () => {
    logout();
  };

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password)
      .then((user) => {
        login(usuario);
        dispararSweet("Logueo Exitoso", "", "success", "Confirmar");
      })
      .catch((error) => {
        alert("Error", error);
      });
  }

  if (user) {
    return (
      <form onSubmit={handleSubmit2}>
        <button type="submit">Cerrar sesión</button>
      </form>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>

      <form onSubmit={registrarUsuario}>
        <h2>Registrarse</h2>
        <div>
          <label>Mail:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>

      {/* <form onSubmit={iniciarSesionEmailPass}>
        <h2>Iniciar Sesión con Email & Password</h2>
        <div>
          <label>Mail:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form> */}
    </div>
  );
}
export default Login2;
