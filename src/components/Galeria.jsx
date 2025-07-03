import "../styles/galleria.css";

function Galeria() {
  const elementos = [
    {
      src: "https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto1.jpg?raw=true",
      titulo: "Moda urbana",
    },
    {
      src: "https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto2.jpg?raw=true",
      titulo: "Todo cueros",
    },
    {
      src: "https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto3.jpg?raw=true",
      titulo: "Romántica",
    },
    {
      src: "https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto4.jpg?raw=true",
      titulo: "Sensual",
    },
    {
      video: "public/video.mp4",
      titulo: "Primavera",
    },
    {
      src: "https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto5.jpg?raw=true",
      titulo: "Todo seda",
    },
    {
      src: "https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto6.jpg?raw=true",
      titulo: "Coctel",
    },
    {
      src: "https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto7.jpg?raw=true",
      titulo: "Moda Urbana",
    },
    {
      src: "https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto8.jpg?raw=true",
      titulo: "Romántica",
    },
    {
      src: "https://github.com/MarcelCer/La-Tiendita-de-Marce/blob/main/public/img/foto9.jpg?raw=true",
      titulo: "Sensual",
    },
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
