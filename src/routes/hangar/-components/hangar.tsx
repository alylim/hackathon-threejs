import { useEffect, useState } from "react";
import { AircraftMesh } from "./aircraftMesh";
import { People } from "./people";
import { useFrame } from "@react-three/fiber";

function calculateDistance(coord1, coord2) {
    const [x1, y1, z1] = coord1;
    const [x2, y2, z2] = coord2;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
  }

export function Hangar({ tracks }) {
  const [positions, setPositions] = useState([]);
  const startTimestamp = tracks[0].timestamp;
  const distanceThreshold = 2; // Threshold for considering a new person (2 meters)

  useFrame(({ clock }) => {
    if (tracks.length > 0) {
      const elapsedTime = startTimestamp + clock.elapsedTime * 1000000; // Convert to microseconds for compatibility with timestamps

      // If elapsed time exceeds the last timestamp, set positions to the last frame
      if (elapsedTime >= tracks[tracks.length - 1].timestamp) {
        setPositions(tracks[tracks.length - 1].worldCoordinates);
        return;
      }

      // Find the current frame index based on elapsed time
      const currentFrameIndex = tracks.findIndex((frame) => frame.timestamp > elapsedTime);
      if (currentFrameIndex >= 0) {
        const nextFrameIndex = Math.min(currentFrameIndex + 1, tracks.length - 1);
        const currentFrame = tracks[currentFrameIndex];
        const nextFrame = tracks[nextFrameIndex];

        // Handle positions by matching the number of people across frames
        const updatedPositions = [];

        const currentCoords = currentFrame.worldCoordinates;
        const nextCoords = nextFrame.worldCoordinates;

        // Iterate over each person in the current frame and try to find the closest match in the next frame
        const assignedNextCoords = new Set();

        currentCoords.forEach((currentCoord) => {
          let closestMatchIndex = -1;
          let closestDistance = Infinity;

          // Try to find the closest person in the next frame based on distance
          nextCoords.forEach((nextCoord, nextIndex) => {
            if (!assignedNextCoords.has(nextIndex)) {
              const distance = calculateDistance(currentCoord, nextCoord);
              if (distance < closestDistance && distance < distanceThreshold) {
                closestDistance = distance;
                closestMatchIndex = nextIndex;
              }
            }
          });

          // If a close match is found, use it; otherwise, assume it's a new person
          if (closestMatchIndex !== -1) {
            updatedPositions.push(nextCoords[closestMatchIndex]);
            assignedNextCoords.add(closestMatchIndex); // Mark this next coordinate as assigned
          } else {
            updatedPositions.push(currentCoord); // If no close match, use current position (no interpolation)
          }
        });

        // If there are any new positions in the next frame that weren't assigned, add them
        nextCoords.forEach((nextCoord, nextIndex) => {
          if (!assignedNextCoords.has(nextIndex)) {
            updatedPositions.push(nextCoord); // This is a new person
          }
        });

        setPositions(updatedPositions);
      }
    }
  });

  return (
    <>
      <AircraftMesh position={[0, 0, 0]} />
      <People positions={positions} />
    </>
  );
}
