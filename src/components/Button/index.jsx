import styled from "styled-components";

export const Button = ({ text, onClick, disabled }) => {
  return (
    <BUTTON disabled={disabled} onClick={onClick}>
      {text}
    </BUTTON>
  );
};

const BUTTON = styled.button`
  margin-top: 20px;
  padding: 15px;
  width: 100%;
  background-color: darkblue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  :disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;
