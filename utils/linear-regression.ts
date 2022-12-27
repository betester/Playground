import { lusolve, multiply, transpose } from "mathjs";

interface LinearRegressionArgs {
  x: number[],
  y: number[],
  precision: number;
}

// can be really inefficient as it uses normal equation
export const linearRegression = ({ x, y, precision }: LinearRegressionArgs) => {
  // construct the matrix
  

  const coefficients: number[][] = [];

  for (let i = 0; i < x.length; i++) {
    coefficients.push([x[i], 1]);
  }

  const transposedCoefficient = transpose(coefficients);

  const normalizedCoefficient = multiply(transposedCoefficient, coefficients);
  const normalizedB = multiply(transposedCoefficient, y);
  const solution = lusolve(normalizedCoefficient, normalizedB) as number[][];


  const f = (xx: number) => {
    return xx * solution[0][0] + solution[1][0];
  }

  const regressedPoints: { x: number, y: number }[] = [];
  const furthestDistance = x[x.length - 1] - x[0];

  for (let i = x[0]; i <= x[x.length - 1]; i +=  furthestDistance) {
    regressedPoints.push({ x: i, y: f(i) });
  }


  return regressedPoints;

}