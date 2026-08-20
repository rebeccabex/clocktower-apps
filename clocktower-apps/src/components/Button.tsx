import styled from "styled-components";

type ButtonProps = {
  onClick: () => void;
  label: string;
  disabled?: boolean;
};

export const Button = ({ onClick, label, disabled }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 75px;
  margin: 0 20px;
`;
