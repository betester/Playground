import { assert } from "console";
import { useRef, useEffect, useState, FC } from "react";

interface CanvasProps {
  circles: { x: number; y: number }[];
  interpolatedCircles: { x: number; y: number }[];
  setCircles: any;
}

export const Canvas: FC<CanvasProps> = ({
  circles,
  interpolatedCircles,
  setCircles,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    // Set the canvas dimensions to match the size of the parent element
    canvas.width = canvas.parentElement!.clientWidth;
    canvas.height = canvas.parentElement!.clientHeight;

    // Set the line color and width
    context.strokeStyle = "black";
    context.lineWidth = 1;

    // Draw the grid

    for (let x = -canvas.width; x < canvas.width; x += 50) {
      context.beginPath();
      context.moveTo(x, -canvas.height);
      context.lineTo(x, canvas.height);
      context.stroke();
    }
    for (let y = -canvas.height; y < canvas.height; y += 50) {
      context.beginPath();
      context.moveTo(-canvas.width, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }

    circles.forEach((circle) => {
      context.beginPath();
      context.arc(circle.x, circle.y, 10, 0, 2 * Math.PI);
      context.fillStyle = "#62B6B7";
      context.fill();
    });

    context.strokeStyle = "#FB2576";
    context.lineWidth = 3;

    interpolatedCircles.forEach((circle, index) => {
      context.beginPath();

      if (index != interpolatedCircles.length - 1) {
        context.moveTo(circle.x, circle.y);
        context.lineTo(
          interpolatedCircles[index + 1].x,
          interpolatedCircles[index + 1].y
        );
        context.stroke();
      }
    });
  }, [circles, interpolatedCircles]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    setCircles([
      ...circles,
      {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
    ]);
  };

  return (
    <div
      style={{
        height: "50%",
        overflow: "hidden",
        border: "1px solid black",
        borderRadius: "10px",
        position: "sticky",
        top: 0,
      }}
    >
      <canvas ref={canvasRef} onClick={handleClick} />
    </div>
  );
};
