import React from "react";
import Image from "react-bootstrap/Image";
import "../styles/header.css";

function Header() {
  return (
    <header>
      <h1>Semana de la Moda</h1>
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
