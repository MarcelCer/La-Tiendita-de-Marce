import React from "react";
import Galeria from "../components/Galeria";
import Carrusel from "../components/Carrusel";

function Main() {
  return (
    <main style={{ padding: "10px" }}>
      <h2
        style={{
          fontSize: "3rem",
          color: "#e16161",
          letterSpacing: "2px",
          textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        Tendencias
      </h2>
      <div>
        <Carrusel />
      </div>
      <div className="container bg-success p-2 text-dark bg-opacity-10">
        <Galeria />
      </div>
    </main>
  );
}
export default Main;
