import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/engine")({
  component: Engine,
});

function Engine() {
  return <div className="p-2">Hello from Engine!</div>;
}
