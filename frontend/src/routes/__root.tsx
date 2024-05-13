import { Button } from "@/components/ui/button";
import { useAuth } from "@/store";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

const Navbar = () => {
  const { user, setUser } = useAuth();

  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/posts" className="[&.active]:font-bold">
        Posts
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      {user && <Button onClick={() => setUser(null)}>Logout</Button>}
    </div>
  );
};

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="size-full text-foreground">
        <Navbar />
        <hr />
        <Outlet />
      </div>
    );
  },
});
