function CardCarrito({
  producto,
  onEliminarProductoDelCarrito,
  onSumarAlCarrito,
  onDescontarProductoDelCarrito,
}) {
  return (
    <div key={producto.id} className="producto-carrito">
      <div className="producto-carrito-descripcion">
        <h3>{producto.name}</h3>
        <p>{producto.description}</p>
        <img className="producto-imagen" src={producto.image}></img>
      </div>

      <div className="producto-carrito-totales">
        <div className="titulos">
          <p>Cantidad</p>
          <p>Precio Unitario</p>
          <p>Subtotal</p>
        </div>
        <div className="totales">
          <div>
            <span>{producto.cantidad}</span>
          </div>
          <div>
            <span>${producto.price}</span>
          </div>
          <div>
            <span>${(producto.price * producto.cantidad).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="botonesAgregarDescontar">
        <button
          className="Agregar"
          onClick={() => {
            onSumarAlCarrito(producto);
          }}
        >
          +
        </button>
        <button
          className="descontar"
          onClick={() => onDescontarProductoDelCarrito(producto)}
        >
          -
        </button>
      </div>
      <button
        className="btn-eliminar"
        onClick={() => onEliminarProductoDelCarrito(producto.id)}

        // Esto es lo mismo:
        // onClick={onEliminarProductoDelCarrito}
        // onClick={(e) => onEliminarProductoDelCarrito(e)}
      >
        x
      </button>
    </div>
  );
}
export default CardCarrito;
