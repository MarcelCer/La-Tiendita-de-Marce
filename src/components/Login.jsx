export default function Login({
  setUsuarioLoguado,
  setAdminLogueado,
  user,
  admin,
}) {
  return (
    <div>
      <button onClick={setUsuarioLoguado}>
        {user ? "Cerrar sesion" : "Iniciar sesion"}
      </button>
      <button onClick={setAdminLogueado}>
        {admin ? "Cerrar sesion Admin" : "Iniciar sesion Admin"}
      </button>
    </div>
  );
}
