import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store";
import { useForm } from "@tanstack/react-form";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
});

function SignIn() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(value),
      });
      if (!response.ok) {
        setError(await response.json().then((res) => res.message));
      }
      const data = await response.json();
      localStorage.setItem("accessToken", data.token);
      const userResponse = await fetch("/api/users/me", {
        headers: {
          accessToken: data.token,
        },
      });

      const userData = await userResponse.json();
      setUser(userData.result);
      navigate({ to: "/posts" });
    },
  });
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <div className="border max-w-sm w-full rounded-lg p-4">
        <h2 className="font-bold mb-4 text-center text-2xl">Sign In</h2>
        {error && <p>{error}</p>}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            children={(field) => (
              <div>
                <Label htmlFor={field.name}>{field.name}</Label>
                <Input
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <div>
                <Label htmlFor={field.name}>{field.name}</Label>
                <Input
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          />
          <div>
            Don't have an account? <Link className="text-blue-400 text-md font-semibold" to="/sign-up">Sign Up</Link>
          </div>
          <Button className="bg-blue-400 hover:bg-blue-400/90 text-white font-bold w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
