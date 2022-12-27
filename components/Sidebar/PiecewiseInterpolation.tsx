import { Select } from "../Input";
import { Button } from "../Button";

import { FC, useState } from "react";
import { interpolate, pwInterpolation } from "../../utils";

interface InterpolationProps {
  setInterpolatedCircles: any;
  setCircles: any;
  circles: { x: number; y: number }[];
}

export const PiecewiseInterpolation: FC<InterpolationProps> = ({
  setInterpolatedCircles,
  setCircles,
  circles,
}) => {
  const [performanceMeasure, setPerformanceMeasure] = useState<number>(0);

  const onResetClick = () => {
    setInterpolatedCircles([]);
    setCircles([]);
  };

  const onClick = () => {
    const x = circles.map((val) => val.x);
    const y = circles.map((val) => val.y);

    const startTime = performance.now();

    const result = pwInterpolation({
      x: x,
      y: y,
      precision: 0.1,
    });

    const endTime = performance.now();

    setPerformanceMeasure(endTime - startTime);
    setInterpolatedCircles(result);
  };

  return (
    <>
      <h2>Piecewise Interpolation</h2>
      <p>
        Interpolation can be very bad if the given points are too much (
        {"Runge's"} phenomenon happened). Piecewise interpolation solved those
        problem. The way piecewise interpolation works is by dividing n points
        into n-1 interval. Then, each interval will be interpolated by an m
        degree polynomial. Then, each given point will be interpolated based on
        appropriate polynomial. That is, x will be interpolated by Si(x) if{" "}
        {"Xi-1 <= x <= Xi"}. That way, {"Runge's"} phenomenon are less likely to
        happen.
      </p>
      <h3>Why?</h3>
      <p>
        The problem with the usual interpolation is that, the higher the degree
        of the polynomial, the higher the oscilations that could happen. With
        piecewise, we only take 2 points, with that, it guarantees that there{" "}
        {"won't"} be too much of oscilations occuring.
      </p>
      <h3>Pitfall of Piecewise</h3>
      <p>
        .The only problem with piecewise is that, it is very expensive in terms
        of computation. Since we have n-1 interval, that means we have to
        construct n-1 polynomial. With the normal interpolation, we only need 1
        polynomial to construct.
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
    </>
  );
};
