import { FC } from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.4em;
  font: inherit;
  background-color: #F0DBDB;
`;

interface SelectProps {
  children: React.ReactNode;
  onChange? : any
}

export const Select: FC<SelectProps> = ({ children, onChange }) => {
  return <StyledSelect onChange={onChange}>{children}</StyledSelect>;
};
