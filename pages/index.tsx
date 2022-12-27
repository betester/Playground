import { useState } from "react";
import { Canvas } from "../components/Canvas";
import { CanvasLayout, Layout } from "../components/Layout";
import { Sidebar } from "../components/Sidebar";
import { Heading } from "../styles/components";

export default function Home() {
  const [circles, setCircles] = useState<{ x: number; y: number }[]>([]);
  const [interpolatedCircles, setInterpolatedCircles] = useState<
    { x: number; y: number }[]
  >([]);


  return (
    <Layout>
      <Heading>Playground</Heading>
      <p>Press ctrl + wheel to zoom in/out</p>
      <p>Press ctrl + left click to drag the canvas</p>
      <CanvasLayout>
        <Canvas
          circles={circles}
          interpolatedCircles={interpolatedCircles}
          setCircles={setCircles}
        />
        <Sidebar
          setCircles={setCircles}
          setInterpolatedCircles={setInterpolatedCircles}
          circles={circles}
        />
      </CanvasLayout>
    </Layout>
  );
}
