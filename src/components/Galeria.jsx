import "../styles/galleria.css";

function Galeria() {
  const elementos = [
    { src: "../img/foto1.jpg", titulo: "Moda urbana" },
    { src: "../img/foto2.jpg", titulo: "Todo cueros" },
    { src: "../img/foto3.jpg", titulo: "Romántica" },
    { src: "../img/foto4.jpg", titulo: "Sensual" },
    {
      video: "../videos/video3.mp4",
      titulo: "Primavera",
    },
    { src: "../img/foto5.jpg", titulo: "Todo seda" },
    { src: "../img/foto6.jpg", titulo: "Coctel" },
    { src: "../img/foto7.jpg", titulo: "Moda Urbana" },
    { src: "../img/foto8.jpg", titulo: "Romántica" },
    { src: "../img/foto9.jpg", titulo: "Sensual" },
    { src: "../img/foto1.jpg", titulo: "Moda urbana" },
    { src: "../img/foto5.jpg", titulo: "Todo seda" },
    { src: "../img/foto6.jpg", titulo: "Coctel" },
    { src: "../img/foto7.jpg", titulo: "Moda Urbana" },
  ];

  return (
    <div className="collage">
      {elementos.map((el, index) => (
        <div className="item-collage" key={index}>
          {el.video ? (
            <video loop autoPlay muted>
              <source src={el.video} type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
          ) : (
            <img src={el.src} alt={el.titulo} />
          )}
          <div className="titulo">{el.titulo}</div>
        </div>
      ))}
      <p>Designed by Freepik.es</p>
    </div>
  );
}

export default Galeria;
