import React from "react";
import Galeria from "../components/Galeria";

function Main() {
  return (
    <main style={{ padding: "10px" }}>
      <h2>Tendencias</h2>
      <div className="container bg-success p-2 text-dark bg-opacity-10">
        <Galeria />
      </div>

      <p>Este es un ejemplo de contenido dentro del área principal.</p>
    </main>
  );
}
export default Main;
