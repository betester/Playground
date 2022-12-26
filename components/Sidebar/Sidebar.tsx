import { FC, useState } from "react";
import styled from "styled-components";
import { Select } from "../Input";
import { Button } from "../Button";
import { interpolate } from "../../utils";

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
  const [interpolationMethod, setInterpolationMethod] = useState<
    "Newton" | "Lagrange" | "Monomial"
  >("Newton");

  const [performanceMeasure, setPerformanceMeasure] = useState<number>(0);

  const onChangeMethod = (e: any) => {
    setInterpolationMethod(e.target.value);
  };

  const onClick = () => {
    const x = circles.map((val) => val.x);
    const y = circles.map((val) => val.y);

    const startTime = performance.now();

    const result = interpolate({
      x: x,
      y: y,
      precision: 0.1,
      method: interpolationMethod,
    });

    const endTime = performance.now();

    setPerformanceMeasure(endTime - startTime);
    setInterpolatedCircles(result);
  };

  const onResetClick = () => {
    setInterpolatedCircles([]);
    setCircles([]);
  };

  return (
    <StyledSidebar>
      <Select>
        <option>Interpolation</option>
      </Select>
      <h2>Interpolation</h2>
      <p>
        Interpolation is a method to find a function that matches the given
        points, that is (x,y). The way it works, is by using the most simplest
        function that it can use and that is polynomial. If we are given n
        points then there are a polynomial degree (n-1) that can pass through
        all of the given points.
      </p>
      <div>
        <h3>Method</h3>
        <p>
          All of the methods that were given will actually give you the same
          form of polynomial. The difference is on the computation and matrix
          constructions difficulty.
        </p>
        <Select onChange={onChangeMethod}>
          <option value={"Newton"}>Newton</option>
          <option value={"Lagrange"}>Lagrange</option>
          <option value={"Monomial"}>Monomial</option>
        </Select>
      </div>
      {interpolationMethod === "Newton" && (
        <p>
          {" "}
          Newton methods is not the fastest on term of computation nor matrix
          construction. But, {"newton's"} will give you a middle ground on
          computation and matrix wise, meaning that it will not be too slow on
          computation nor matrix computation.
        </p>
      )}
      {interpolationMethod === "Lagrange" && (
        <p>
          {" "}
          You {"don't"} even need to construct a matrix to create the
          polynomial, but with the cost of expensive computation...
        </p>
      )}
      {interpolationMethod === "Monomial" && (
        <p>
          {" "}
          {"Monomial's"} method is very fast on computation, much faster than
          newton method. But the matrix construction could take a while...
        </p>
      )}
      <h3>Pitfall of Polynomial</h3>
      <p>
        If you have taken statistic, you might think that the more points you
        have, the more accurate the polynomial that formed. But this is not the
        case for Interpolation, the more points you have, the more inaccurate
        polynomial, this is called as {"Runge's"} Phenomenon.
      </p>
      <p>
        Computation time taken :{" "}
        {`${performanceMeasure.toFixed(3)} milliseconds`}
      </p>
      <div
        style={{
          display: "flex",
          gap: "0.5em",
          marginTop: "1em",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Button onClick={onResetClick} backgroundColor="#FF3333">
          Reset
        </Button>
        <Button onClick={onClick} backgroundColor="#FEC6C6">
          Interpolate!
        </Button>
      </div>
    </StyledSidebar>
  );
};
