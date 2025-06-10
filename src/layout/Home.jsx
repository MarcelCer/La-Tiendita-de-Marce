import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Nav from "../components/Nav";

import "../styles/card.css";

{
  /*const producto = [  
    { id: 1, nombre: "HP 150A", descripcion: "Tóner HP 150a                    ", img: "../public/img/img1.jpg", precio: '$' + 100 },
    { id: 2, nombre: "HP 150B", descripcion: "Tóner Minolta Bizhub 226i        ", img: "../public/img/img3.jpg", precio: '$' + 200 },  
    { id: 3, nombre: "HP 150C", descripcion: "Tóner Minolta Bizhub 227/287/367", img: "../public/img/img3.jpg", precio: '$' + 300 },  
];*/
}

export default function Home() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}
