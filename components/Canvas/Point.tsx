import styled from "styled-components";

interface Point {
  top: number;
  left: number;
}

interface PointProps extends Point {
  backgroundColor: string;
}

const Point = styled.div<PointProps>`
  background-color: ${props => props.backgroundColor};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`


export {}