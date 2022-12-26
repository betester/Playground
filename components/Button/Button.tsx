import { FC } from "react";
import styled from "styled-components";

interface StyledButtonProps {
  backgroundColor?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: 0.5em;
  background: none;
  color: inherit;
  border: none;
  border-radius: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background-color: ${(props) => props.backgroundColor};
`;
interface ButtonProps {
  children: React.ReactNode;
  backgroundColor?: string;
  onClick?: any;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  backgroundColor,
}) => {
  return (
    <StyledButton onClick={onClick} backgroundColor={backgroundColor}>
      {children}
    </StyledButton>
  );
};
