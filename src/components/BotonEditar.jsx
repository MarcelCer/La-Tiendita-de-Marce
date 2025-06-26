import styled from "styled-components";
const BotonEdit = styled.button`
  background-color: #0d5d92;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2eb9eb;
  }
`;
function BotonEditar() {
  return <BotonEdit>Editar Producto</BotonEdit>;
}

export default BotonEditar;
