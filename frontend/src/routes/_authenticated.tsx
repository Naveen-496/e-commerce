import { useAuth } from "@/store";
import { Outlet, createFileRoute, useRouter } from "@tanstack/react-router";

const Component = () => {
  const { user } = useAuth();
  const router = useRouter();
  if (user) {
    return <Outlet />;
  }
  console.log("NO User");
  router.history.push("/sign-in");
};

// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {},
  component: Component,
});
