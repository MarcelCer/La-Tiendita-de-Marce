import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { crearUsuario, loginEmailPass } from "../auth/firebase";
import { dispararSweet } from "../assets/SweetAlert";
import { useEffect } from "react";
import { useCarritoContext } from "../context/CarritoContext";
import { Form, Button, Card, Container } from "react-bootstrap";

function Login2() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const { login, user, logout } = useAuthContext();
  const navigate = useNavigate();
  const { vaciarCarrito } = useCarritoContext();
  useEffect(() => {
    // Cada vez que el estado `show` cambia, se limpian los campos
    setUsuario("");
    setPassword("");
  }, [show]);

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
    crearUsuario(usuario, password)
      .then((user) => {
        login(usuario);
        dispararSweet("Logueo exitoso", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code == "auth/invalid-credential") {
          dispararSweet("Credenciales incorrectas", "", "error", "Cerrar");
        }
        if (error.code == "auth/weak-password") {
          dispararSweet(
            "Contraseña debil",
            "Password should be at least 6 characters",
            "error",
            "Cerrar"
          );
        }
        //alert("Error")
      });
  }

  const handleSubmit2 = (e) => {
    e.preventDefault();
    vaciarCarrito();
    logout();
    setUsuario("");
    setPassword("");
  };

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  }

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password)
      .then((user) => {
        login(user); // acá podés pasar todo el user o user.email según cómo lo manejes en AuthContext
        dispararSweet("Inicio de sesión exitoso", "", "success", "Confirmar");
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweet("Credenciales incorrectas", "", "error", "Cerrar");
        } else {
          dispararSweet("Error", error.message, "error", "Cerrar");
        }
      });
  }

  if (user) {
    return (
      <form onSubmit={handleSubmit2}>
        <button type="submit">Cerrar sesión</button>
      </form>
    );
  }
  if (!user && show) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <Card className="p-4 shadow w-100" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <Card.Title className="mb-4 text-center fw-bold">
              Iniciar sesión
            </Card.Title>

            <Form onSubmit={iniciarSesionEmailPass}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Ingresá tu email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresá tu contraseña"
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" variant="primary">
                  Iniciar sesión
                </Button>
              </div>
            </Form>

            <div className="text-center mt-3">
              <Button variant="link" onClick={handleShow}>
                ¿No tenés cuenta? Registrate
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  if (!user && !show) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <Card className="p-4 shadow w-100" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <Card.Title className="mb-4 text-center fw-bold">
              Registrarse
            </Card.Title>

            <Form onSubmit={registrarUsuario}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Ingresá tu email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresá una contraseña segura"
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" variant="success">
                  Registrarse
                </Button>
              </div>
            </Form>

            <div className="text-center mt-3">
              <Button variant="link" onClick={handleShow}>
                ¿Ya tenés cuenta? Iniciar sesión
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  //Formulario para inicio de sesion sin firebase
  /*
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
    
    
    </div>
  );*/
  //Formulario para inicio de sesion sin firebase
}
export default Login2;
