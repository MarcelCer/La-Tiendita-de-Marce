import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";

import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Form,
  Button,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Card } from "react-bootstrap";

function FormularioEdicion() {
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
          toast.success("Producto actualizado correctamente!");
        })
        .catch((error) => {
          toast.error(
            "Hubo un problema al actualizar el producto. " + error.message
          );
        });
    } else {
      toast.error("Error en la carga de producto");
    }
    <ToastContainer />;
  };

  if (cargando || !producto) {
    return <p>Cargando producto...</p>;
  }
  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Card className="shadow-sm border-0 mt-4">
        <Card.Body>
          <Card.Title className="mb-4 fw-semibold text-primary">
            Editar Producto
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="nombreProducto">
                  <Form.Label className="text-start w-100 fw-semibold text-secondary">
                    Nombre:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={producto.name || ""}
                    onChange={handleChange}
                    required
                    style={{ textAlign: "left" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="urlImagen">
                  <Form.Label className="text-start w-100 fw-semibold text-secondary">
                    URL de la Imagen:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="imagen"
                    value={producto.imagen || ""}
                    onChange={handleChange}
                    required
                    style={{ textAlign: "left" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="precioProducto">
                  <Form.Label className="text-start w-100 fw-semibold text-secondary">
                    Precio:
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={producto.price || ""}
                    onChange={handleChange}
                    required
                    min="0"
                    style={{ textAlign: "left" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="descripcionProducto">
                  <Form.Label className="text-start w-100 fw-semibold text-secondary">
                    Descripción:
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="descripcion"
                    value={producto.descripcion || ""}
                    onChange={handleChange}
                    required
                    style={{ textAlign: "left" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Actualizar Producto
            </Button>
          </Form>

          <ToastContainer />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FormularioEdicion;
