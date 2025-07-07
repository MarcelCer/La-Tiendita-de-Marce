import { useState } from "react";
import Swal from "sweetalert2";

function FormularioContacto() {
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const data = new FormData(e.target);

    const response = await fetch("https://formspree.io/f/xnnvknvv", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    });

    setEnviando(false);

    if (response.ok) {
      Swal.fire({
        title: "¡Mensaje enviado!",
        text: "Gracias por contactarnos. Te responderemos pronto.",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      e.target.reset();
    } else {
      Swal.fire({
        title: "Ups...",
        text: "Algo salió mal. Intentá de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 bg-light p-4 shadow rounded">
          <h2 style={{ color: "#c29b94" }} className="mb-4 text-center">
            Contacto
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="nombre"
                id="nombre"
                placeholder="Tu nombre"
                required
              />
              <label htmlFor="nombre">Nombre</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Tu email"
                required
              />
              <label htmlFor="email">Correo electrónico</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                name="mensaje"
                id="mensaje"
                placeholder="Escribí tu mensaje"
                style={{ height: "120px" }}
                required
              ></textarea>
              <label htmlFor="mensaje">Mensaje</label>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{
                  backgroundColor: "#c29b94",
                  color: "#fff",
                  border: "none",
                }}
                disabled={enviando}
              >
                {enviando ? "Enviando..." : "Enviar mensaje"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default FormularioContacto;
