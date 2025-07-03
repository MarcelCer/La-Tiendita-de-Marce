import styled from "styled-components";

const BotonDelete = styled.button`
  background-color: #920d0d;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #eb2e2e;
  }
`;
function BotonEliminar({ onClick, children }) {
  return <BotonDelete onClick={onClick}>{children}</BotonDelete>;
}

export default BotonEliminar;
