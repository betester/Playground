import { lusolve } from "mathjs";
// x, independent variable
// y, dependent variable
interface InterpolateArgs {
    x: number[],
    y: number[],
    method?: "Monomial" | "Lagrange" | "Newton",
    precision: number
}

export const interpolate = ({ x, y, method = "Newton", precision }: InterpolateArgs) => {
    if (x.length != y.length) throw Error("x and y needs to be equal");
    else if (x.length == 0) throw Error("There should be at least one point available");

    let interpolatedXPoints: number[];
    let interpolatedYPoints: number[];
    let result: { x: number, y: number }[] = [];

    switch (method) {
        case "Newton":
            interpolatedXPoints = newtonInterpolation(Array.from({ length: x.length }, (_, i) => i + 1), x, precision);
            interpolatedYPoints = newtonInterpolation(Array.from({ length: y.length }, (_, i) => i + 1), y, precision);

            result = interpolatedXPoints.map((point, index) => {
                return { y: interpolatedYPoints[index], x: point }
            });


            return result;

        case "Lagrange":
            interpolatedXPoints = lagrangeInterpolation(Array.from({ length: x.length }, (_, i) => i + 1), x, precision);
            interpolatedYPoints = lagrangeInterpolation(Array.from({ length: y.length }, (_, i) => i + 1), y, precision);

            result = interpolatedXPoints.map((point, index) => {
                return { y: interpolatedYPoints[index], x: point }
            });


            return result;


        case "Monomial":
            interpolatedXPoints = monomialInterpolation(Array.from({ length: x.length }, (_, i) => i + 1), x, precision);
            interpolatedYPoints = monomialInterpolation(Array.from({ length: y.length }, (_, i) => i + 1), y, precision);

            result = interpolatedXPoints.map((point, index) => {
                return { y: interpolatedYPoints[index], x: point }
            });


            return result;

        default:
            break;
    }


}

const newtonPolynomial = (coefficients: number[], xs: number[]): ((x: number) => number) => {
    return (x: number) => {
        let product = 1;
        let result = coefficients[0];

        for (let i = 1; i < coefficients.length; i++) {
            product = product * (x - xs[i - 1]);
            result = result + coefficients[i] * product;
        }
        return result;
    };
}

const lagrangePolynomial = (coefficient: number[], xs: number[]): ((x: number) => number) => {

    return (x: number) => {
        let result = 0;

        for (let i = 0; i < coefficient.length; i++) {
            let ai = coefficient[i];
            for (let j = 0; j < coefficient.length; j++) {
                if (j == i) continue;
                ai = ai * (x - xs[j]) / (xs[i] - xs[j])
            }
            result += ai;
        }

        return result;
    }
}

const monomialPolynomial = (coefficient: number[], xs: number[]): ((x: number) => number) => {
    return (x: number) => {

        let result = 0;

        for (let i = 0; i < coefficient.length; i++) {
            result = result + coefficient[i] * Math.pow(x, i);
        }

        return result;
    }
}

const monomialInterpolation = (x: number[], y: number[], precision: number) => {
    const coefficientMatrix: number[][] = Array(y.length).fill(Array(y.length).fill(0)).map(a => a.slice());
    const interpolatedPoints: number[] = [];

    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x.length; j++) {
            coefficientMatrix[i][j] = Math.pow(x[i], j);
        }
    }

    const coefficient = lusolve(coefficientMatrix, y);


    const polynomial = monomialPolynomial(coefficient as number[], x);


    for (let i = 1; i <= x.length; i += precision) {
        interpolatedPoints.push(polynomial(i));
    }

    return interpolatedPoints;

}

const lagrangeInterpolation = (x: number[], y: number[], precision: number) => {

    const interpolatedPoints: number[] = [];

    const polynomial = lagrangePolynomial(y, x);

    for (let i = 1; i <= x.length; i += precision) {
        interpolatedPoints.push(polynomial(i));
    }

    return interpolatedPoints;

}

const newtonInterpolation = (x: number[], y: number[], precision: number) => {

    // use divide difference
    const differences: number[][] = Array(y.length).fill(Array(y.length).fill(0)).map(a => a.slice());

    // fill the first column with initial value of y
    for (let i = 0; i < y.length; i++) {
        differences[i][0] = y[i];
    }


    // fill the rest column

    for (let j = 1; j < y.length; j++) {
        for (let i = j; i < y.length; i++) {
            differences[i][j] = (differences[i][j - 1] - differences[i - 1][j - 1]) / (x[i] - x[i - j])
        }
    }

    // get all the coefficients from the diagonal
    const coefficients: number[] = [];
    for (let i = 0; i < y.length; i++) {
        coefficients[i] = differences[i][i];
    }


    // construct the newton polynomial
    const polynomial = newtonPolynomial(coefficients, x);

    const interpolatedPoints: number[] = [];

    for (let i = 1; i <= x.length; i += precision) {
        interpolatedPoints.push(polynomial(i));
    }


    return interpolatedPoints;
}