import type { LucideIcon } from "lucide-react";
import styled from "styled-components";

type ButtonProps = {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  icon?: LucideIcon;
};

export const Button = ({
  onClick,
  label,
  disabled,
  icon: Icon,
}: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} $isDisabled={disabled}>
      {Icon && <Icon size={13} />}
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ $isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${(props) => (props.$isDisabled ? "#4B5563" : "#E5E7EB")};
  background: transparent;
  border: 1px solid #374151;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: ${(props) => (props.$isDisabled ? "not-allowed" : "pointer")};
  margin: 0 4px;
`;
