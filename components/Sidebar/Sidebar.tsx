import { FC, useState } from "react";
import styled from "styled-components";
import { Select } from "../Input";
import { Interpolation } from "./Interpolation";
import { PiecewiseInterpolation } from "./PiecewiseInterpolation";
import { LinearRegression } from "./LinearRegression";

const StyledSidebar = styled.div`
  background-color: #f5ebe0;
  border-radius: 10px;
  padding: 1em;
  border: 1px solid black;
`;

interface SidebarProps {
  setInterpolatedCircles: any;
  setCircles: any;
  circles: { x: number; y: number }[];
}

export const Sidebar: FC<SidebarProps> = ({
  setInterpolatedCircles,
  setCircles,
  circles,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<
    "Interpolation" | "Piecewise Interpolation" | "Linear Regression"
  >("Interpolation");

  const onChangeTopic = (e: any) => {
    setSelectedTopic(e.target.value);
  };

  return (
    <StyledSidebar>
      <Select onChange={onChangeTopic}>
        <option value={"Interpolation"}>Interpolation</option>
        <option value={"Piecewise Interpolation"}>
          Piecewise Interpolation
        </option>
        <option value={"Linear Regression"}>Linear Regression</option>
      </Select>
      {selectedTopic === "Interpolation" && (
        <Interpolation
          setInterpolatedCircles={setInterpolatedCircles}
          setCircles={setCircles}
          circles={circles}
        />
      )}
      {selectedTopic === "Piecewise Interpolation" && (
        <PiecewiseInterpolation
          setInterpolatedCircles={setInterpolatedCircles}
          setCircles={setCircles}
          circles={circles}
        />
      )}
      {selectedTopic === "Linear Regression" && (
        <LinearRegression
          circles={circles}
          setRegressedPoints={setInterpolatedCircles}
          setCircles={setCircles}
        />
      )}
    </StyledSidebar>
  );
};
