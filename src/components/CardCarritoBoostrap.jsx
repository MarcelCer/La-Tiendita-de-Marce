import { Card, Button, Row, Col, Image } from "react-bootstrap";

function CardCarrito({
  producto,
  onEliminarProductoDelCarrito,
  onSumarAlCarrito,
  onDescontarProductoDelCarrito,
}) {
  const { name, descripcion, image, price, cantidad } = producto;
  const subtotal = (price * cantidad).toFixed(0);

  return (
    <Card className="w-100 h-100">
      <Card.Body className="py-0 px-0">
        <Row className="align-items-center g-3">
          {/* Imagen */}
          <Col xs={12} md={3}>
            <Image
              src={image}
              alt={name}
              fluid
              rounded
              style={{ maxHeight: "100px", objectFit: "cover" }}
            />
          </Col>

          {/* Info */}
          <Col xs={12} md={5}>
            <h5 className="fw-bold">{name}</h5>
            <p className="text-muted mb-2">{descripcion}</p>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => onDescontarProductoDelCarrito(producto)}
              >
                -
              </Button>
              <span className="fw-semibold">{cantidad}</span>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => onSumarAlCarrito(producto)}
              >
                +
              </Button>
            </div>
          </Col>

          {/* Precios */}
          <Col xs={12} md={3} className="text-md-end text-center mt-3 mt-md-0">
            <div className="mb-2">
              Precio: <strong>${price}</strong>
            </div>
            <div>
              Subtotal: <strong>${subtotal}</strong>
            </div>
          </Col>

          {/* Eliminar */}
          <Col xs={12} md={1} className="text-end">
            <Button
              variant="danger"
              size="sm"
              onClick={() => onEliminarProductoDelCarrito(producto.id)}
            >
              ✕
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CardCarrito;
