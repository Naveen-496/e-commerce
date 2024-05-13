import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  return (
    <main className="size-full flex m-auto bg-background">
      <h1 className="text-4xl font-bold text-green-700/50">
        Welcome to Todo Manager
      </h1>
    </main>
  );
}
