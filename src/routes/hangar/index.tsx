import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";
import { Cube } from "./-components/cube";
import { AircraftMesh } from "./-components/aircraftMesh";
import { FlyControls } from "@react-three/drei";
import { type Vector3 } from "three";
import { useEffect, useState } from "react";
import tracksJson from './tracks.json';
import { People } from "./-components/people";

export const Route = createFileRoute("/hangar/")({
  component: Hangar,
});

function Hangar() {
  const [people, setPeople] = useState([]);
    useEffect(() => {
      if (tracksJson.frames && tracksJson.frames.length > 0) {
        setPeople(tracksJson.frames[0].worldCoordinates); // Load first frame
      }
      }, []);

  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [100, 20, 100], fov: 50 }}>
        {/* <Cube/> */}
        <AircraftMesh position={[0, 0, 0]} />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <FlyControls movementSpeed={40} rollSpeed={0.5} dragToLook={true} />
        <People positions={people} />
        <axesHelper args={[5]} />
        <gridHelper args={[200, 200]} />
      </Canvas>
    </div>
  );
}
