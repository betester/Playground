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
  const [zoom, setZoom] = useState(1);
  const [canvasPos, setCanvasPos] = useState({ x: 0, y: 0 });
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 10;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    // Set the canvas dimensions to match the size of the parent element
    canvas.width = canvas.parentElement!.clientWidth;
    canvas.height = canvas.parentElement!.clientHeight;

    // Set the line color and width
    context.strokeStyle = "black";
    context.lineWidth = 1;

    canvas.addEventListener("wheel", (event: WheelEvent) => {
      // Check if the control key is pressed
      if (event.ctrlKey) {
        event.preventDefault();
        // Calculate the new zoom level
        const delta = event.deltaY < 0 ? 1 : -1;
        const newZoom = Math.min(
          MAX_ZOOM,
          Math.max(MIN_ZOOM, zoom + delta * 0.1)
        );

        // Update the zoom level and redraw the canvas
        setZoom(newZoom);
      }
    });

    // Handle mouse move events
    canvas.addEventListener("mousemove", (event: MouseEvent) => {
      // Check if the control key is pressed
      if (event.ctrlKey) {
        event.preventDefault();

        // Calculate the new canvas position
        const newPos = {
          x: canvasPos.x + event.movementX,
          y: canvasPos.y + event.movementY,
        };

        // Update the canvas position and redraw the canvas
        setCanvasPos(newPos);
      }
    });

    // Clear the canvas

    // Save the canvas state
    context.save();

    // Translate and scale the canvas
    context.scale(zoom, zoom);

    for (
      let x = -canvas.width - Math.abs(canvasPos.x);
      x < canvas.width + Math.abs(canvasPos.x);
      x += 50
    ) {
      context.beginPath();
      context.moveTo(x, -canvas.height - Math.abs(canvasPos.y));
      context.lineTo(x, canvas.height + Math.abs(canvasPos.y));
      context.stroke();
    }
    for (
      let y = -canvas.height - Math.abs(canvasPos.y);
      y < canvas.height + Math.abs(canvasPos.y);
      y += 50
    ) {
      context.beginPath();
      context.moveTo(-canvas.width - Math.abs(canvasPos.x), y);
      context.lineTo(canvas.width + Math.abs(canvasPos.x), y);
      context.stroke();
    }

    circles.forEach((circle) => {
      context.beginPath();
      context.arc(
        circle.x + canvasPos.x,
        circle.y + canvasPos.y,
        10,
        0,
        2 * Math.PI
      );
      context.fillStyle = "#62B6B7";
      context.fill();
    });

    context.strokeStyle = "#FB2576";
    context.lineWidth = 3;

    interpolatedCircles.forEach((circle, index) => {
      context.beginPath();

      if (index != interpolatedCircles.length - 1) {
        context.moveTo(circle.x + canvasPos.x, circle.y + canvasPos.y);
        context.lineTo(
          interpolatedCircles[index + 1].x + canvasPos.x,
          interpolatedCircles[index + 1].y + canvasPos.y
        );
        context.stroke();
      }
    });

    context.restore();
  }, [circles, interpolatedCircles, zoom, canvasPos]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    setCircles([
      ...circles,
      {
        x: (event.clientX - rect.left) / zoom - canvasPos.x,
        y: (event.clientY - rect.top) / zoom - canvasPos.y,
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
        top: "20px",
      }}
    >
      <canvas ref={canvasRef} onClick={handleClick} />
    </div>
  );
};
