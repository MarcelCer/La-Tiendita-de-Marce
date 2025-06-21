import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const { admin } = useAuthContext();
  if (!admin) {
    return <Navigate to="/login" replace />;
  }
  return <div>Componente Admin</div>;
}
