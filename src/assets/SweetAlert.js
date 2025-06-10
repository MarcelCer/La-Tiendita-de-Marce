import Swal from "sweetalert2";

export function dispararSweet(titulo, mensaje, icono, textoBoton) {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icono,
    confirmButtonText: textoBoton,
  });
}
