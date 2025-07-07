function Carrusel() {
  return (
    <div className="d-flex justify-content-center">
      <div
        id="carouselProductos"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ width: "800px" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto4.jpg?raw=true"
              className="d-block w-100"
              alt="Producto 1"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto7.jpg?raw=true"
              className="d-block w-100"
              alt="Producto 2"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto9.jpg?raw=true"
              className="d-block w-100"
              alt="Producto 3"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Controles */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselProductos"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselProductos"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  );
}

export default Carrusel;
