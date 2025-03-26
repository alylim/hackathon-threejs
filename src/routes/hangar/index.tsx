import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";
import { Cube } from "./-components/cube";
import { FlyControls } from "@react-three/drei";
import { type Vector3 } from "three";
import { useEffect, useState } from "react";
import { Hangar } from "./-components/hangar";
import tracksJson from './tracks.json';

export const Route = createFileRoute("/hangar/")({
  component: HangarCanvas,
});

function HangarCanvas() {
      const [tracks, setTracks] = useState([]);
      useEffect(() => {
          if (tracksJson.frames && tracksJson.frames.length > 0) {
          setTracks(tracksJson.frames); // Load first frame
          }
          }, []);

  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [100, 20, 100], fov: 50 }}>
        {/* <Cube/> */}
        <Hangar tracks={tracks}/>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <FlyControls movementSpeed={40} rollSpeed={0.5} dragToLook={true} />
        <axesHelper args={[5]} />
        <gridHelper args={[200, 200]} />
      </Canvas>
    </div>
  );
}
