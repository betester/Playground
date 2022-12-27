import { FC, useState } from "react";
import { Button } from "../Button";
import { linearRegression } from "../../utils";

interface LinearRegressionProps {
  circles: { x: number; y: number }[];
  setRegressedPoints: any;
  setCircles: any;
}

export const LinearRegression: FC<LinearRegressionProps> = ({
  setCircles,
  setRegressedPoints,
  circles,
}) => {
  const [performanceMeasure, setPerformanceMeasure] = useState<number>(0);

  const onResetClick = () => {
    setCircles([]);
    setRegressedPoints([]);
  };

  const onClick = () => {
    circles.sort((a, b) => a.x - b.x);

    const x = circles.map((val) => val.x);
    const y = circles.map((val) => val.y);

    const startTime = performance.now();

    const result = linearRegression({
      x,
      y,
      precision: 0.1,
    });

    const endTime = performance.now();

    setPerformanceMeasure(endTime - startTime);
    setRegressedPoints(result);
  };

  return (
    <>
      <h2>Linear Regression</h2>
      <p>
        Linear Regression is a regression that uses a linear function to
        describe the behavior of the given points. The way it describes is by
        finding the least total error from the true points. <br />
      </p>
      <h3>Example</h3>
      <p>
        {"Let's"} say that we have 3 points, (1,2), (2, -4), (3, 7). Then we
        have hypotesis function, h, that tries to fit these 3 points. Say we
        have 2 hypothesis function, h1 and h2.
      </p>
      <div style={{ display: "flex", gap: "3em" }}>
        <div>
          <h4>h1(x) = 2x</h4>
          <li>(1,2)</li>
          <li>(2,4)</li>
          <li>(3,6)</li>
        </div>
        <div>
          <h4>h1(x) = 2.5x - 3.33</h4>
          <li>(1,-0.83)</li>
          <li>(2,1.667)</li>
          <li>(3,5.667)</li>
        </div>
      </div>
      <p>
        The h1 is a random hypothesis function where as h2 is regressed
        function. You can see that even though {"it's"} not accurate, it has
        less error compared to h1.
      </p>
      <h3>Application</h3>
      <p>
        Linear regression is used in machine learning model, for example, you
        could predict the price of a house given the area, number of beds, etc.{" "}
        The price is called as the target attribute where as the area, number of
        beds is called attributes. <br /> Then, to map it into a linear
        equation, the attributes become the unknown variables and the target
        attribute becomes {"'y'"} value. What we wanted to find is the
        coefficient that has the least amount of error.
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
          Regress!
        </Button>
      </div>
    </>
  );
};
