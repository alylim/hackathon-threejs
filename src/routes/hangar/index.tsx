import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/hangar/")({
  component: Hangar,
});

function Hangar() {
  return <div className="p-2">Hello from Hangar!</div>;
}
