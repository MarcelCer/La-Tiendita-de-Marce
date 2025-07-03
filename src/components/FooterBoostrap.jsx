import logo from "../assets/logo_web.png";
import "bootstrap-icons/font/bootstrap-icons.css";

function FooterBoostrap() {
  return (
    <footer className="bg-light text-dark py-4 mt-5">
      <div className="container text-center text-md-start">
        <div className="row">
          {/* Sección 1: Marca o nombre */}
          <div className="col-md-4 mb-3 text-center text-md-start">
            <a href="/">
              <img
                src={logo}
                alt="Logo"
                style={{ width: "120px", height: "auto" }}
              />
            </a>
          </div>

          {/* Sección 2: Links rápidos */}
          <div className="col-md-4 mb-3 text-center text-md-center">
            <h6 className="text-uppercase fw-bold">Secciones</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/productos" className="text-dark text-decoration-none">
                  Productos
                </a>
              </li>

              <li>
                <a href="/contacto" className="text-dark text-decoration-none">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Sección 3: Redes o contacto */}
          <div className="col-md-4 mb-3 text-center text-center text-md-end">
            <h6 className="text-uppercase fw-bold">Seguinos</h6>
            <div className="d-flex justify-content-end mt-2 gap-4">
              <a
                href="https://www.instagram.com/copitecnia"
                className="text-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a
                href="https://www.facebook.com/marcela.cereijo"
                className="text-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook fs-4"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Línea final */}
        <div
          className="text-center pt-3 border-top mt-4"
          style={{ fontSize: "0.875rem" }}
        >
          &copy; {new Date().getFullYear()} La tiendita de Marce. Todos los
          derechos reservados.
        </div>
      </div>
    </footer>
  );
}
export default FooterBoostrap;
