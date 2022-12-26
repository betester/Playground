// x, independent variable
// y, dependent variable

interface InterpolateArgs {
    x: number[],
    y: number[],
    method?: "monomial" | "vandermonde" | "newton",
    precision: number
}

export const interpolate = ({ x, y, method = "newton", precision }: InterpolateArgs) => {
    if (x.length != y.length) throw Error("x and y needs to be equal");
    else if (x.length == 0) throw Error("There should be at least one point available");

    let interpolatedXPoints: number[];
    let interpolatedYPoints: number[];

    switch (method) {
        case "newton":
            interpolatedXPoints = newtonInterpolation(Array.from({ length: x.length }, (_, i) => i + 1), x, precision);
            interpolatedYPoints = newtonInterpolation(Array.from({ length: y.length }, (_, i) => i + 1), y, precision);

            console.log(x);
            console.log(y);


            const result = interpolatedXPoints.map((point, index) => {
                return { y: interpolatedYPoints[index], x: point }
            });

            console.log(result);

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