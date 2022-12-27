interface InterpolateArgs {
  x: number[],
  y: number[],
  precision: number
}

const toU = (A: number[][]) => {
  for (let i = 1; i < A.length; i++) {
    const k = A[i][i - 1] / A[i - 1][i - 1];
    for (let j = i - 1; j <= i; j++) {
      A[i][j] = A[i][j] - k * A[i - 1][j];
    }
  }
  return A;
}

const bs = (A: number[][], b: number[]) => {
  const n = b.length;
  const x: number[] = Array.from({ length: n }, (_) => 0);
  x[n - 1] = b[n - 1] / A[n - 1][n - 1];

  for (let k = n - 2; k >= 0; k--) {
    x[k] = (b[k] - (A[k][k + 1] * x[k + 1])) / A[k][k];
  }

  return x;
}

export const pwInterpolation = ({ x, y, precision }: InterpolateArgs) => {
  if (x.length != y.length) throw Error("x and y needs to be equal");
  else if (x.length == 0) throw Error("There should be at least one point available");
  const interpolatedXPoints = pieceWiseInterpolation(Array.from({ length: x.length }, (_, i) => i + 1), x, precision);
  const interpolatedYPoints = pieceWiseInterpolation(Array.from({ length: y.length }, (_, i) => i + 1), y, precision);

  const result = interpolatedXPoints.map((point, index) => {
    return { y: interpolatedYPoints[index], x: point }
  });


  return result;
}


const pieceWiseInterpolation = (x: number[], y: number[], precision: number) => {



  const n = x.length;
  const h: number[] = Array.from({ length: n - 1 }, (_) => 0);

  for (let i = 0; i < n - 1; i++) {
    h[i] = x[i + 1] - x[i];
  }

  console.log("h");
  console.log(h);

  const g: number[] = Array.from({ length: n - 1 }, (_) => 0);

  for (let i = 1; i < n - 2; i++) {
    g[i] = 6 * ((y[i + 2] - y[i + 1]) / h[i + 1] - (y[i + 1] - y[i]) / h[i]) / (h[i] + h[i + 1]);
  }

  console.log("g")
  console.log(g)

  let A: number[][] = Array(n - 1).fill(Array(n - 1).fill(0)).map(a => a.slice());

  for (let i = 0; i < n - 1; i++) {
    A[i][i] = 2;
  }


  console.log("A")
  console.log(A)


  for (let i = 0; i < n - 2; i++) {
    A[i + 1][i] = h[i] / (h[i] + h[i + 1]);
    A[i][i + 1] = 1 - A[i + 1][i];
  }


  A = toU(A);

  console.log("T")
  console.log(A)

  const s = bs(A, g);

  console.log("s")
  console.log(s)

  const a = Array.from({ length: n - 1 }, (_) => 0);
  const b = Array.from({ length: n - 1 }, (_) => 0);
  const c = Array.from({ length: n - 1 }, (_) => 0);
  const d = Array.from({ length: n - 1 }, (_) => 0);

  for (let i = 0; i < n - 1; i++) {
    b[i] = s[i] / 2;
    d[i] = y[i];
  }


  for (let i = 0; i < n - 2; i++) {
    a[i] = (s[i + 1] - s[i]) / 6 * h[i];
    c[i] = (y[i + 1] - y[i]) / h[i] - h[i] * ((2 * s[i] + s[i + 1]) / 6);
  }


  a[n - 2] = (-2 * b[n - 2]) / 6 * h[n - 2];
  c[n - 2] = (y[n - 1] - y[n - 2]) / h[n - 2] + (2 * b[n - 2] / 6 * h[n - 2]) * Math.pow(h[n - 2], 3) - b[n - 2] * Math.pow(h[n - 2], 2);

  console.log("a")
  console.log(a)
  console.log("b")
  console.log(b)
  console.log("c")
  console.log(c)
  console.log("d")
  console.log(d)


  const polynomial = (xx: number, i: number) => {
    return a[i - 1] * Math.pow(xx - x[i - 1], 3) + b[i - 1] * Math.pow(xx - x[i - 1], 2) + c[i - 1] * (xx - x[i - 1]) + d[i - 1];
  }

  const interpolatedPoints: number[] = [];
  for (let i = 1; i < x.length; i += precision) {
    interpolatedPoints.push(polynomial(i, Math.floor(i)));
  }



  return interpolatedPoints;
}