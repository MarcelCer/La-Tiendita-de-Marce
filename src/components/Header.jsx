import React from "react";
import Image from "react-bootstrap/Image";
import "../styles/header.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <header>
      <h1
        style={{
          fontSize: "3.5rem",
          color: "#e16161",
          letterSpacing: "2px",
          textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
        }}
        className="display-3 text-center fw-bold animate__animated animate__fadeInDown"
      >
        Semana de la Moda
      </h1>
      <Image
        src="https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/src/assets/banner.jpg?raw=true"
        alt="Banner principal"
        fluid
        style={{
          maxHeight: "500px",
          objectFit: "cover",
          width: "80%",
          objectPosition: "top",
        }}
      />
    </header>
  );
}
export default Header;
