import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up")({
  component: SignUp,
});

function SignUp() {
  const form = useForm({
    defaultValues: {
      username: "",
      bio: "",
      role: "user",
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="max-w-sm w-full border rounded-lg p-4">
        <h2 className="font-bold mb-4 text-center text-2xl">Sign Up</h2>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="username"
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
            name="bio"
            children={(field) => (
              <div>
                <Label htmlFor={field.name}>{field.name}</Label>
                <Textarea
                  placeholder="Tell us about yourself (Optional)"
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
            Already have an account?{" "}
            <Link className="text-blue-400 text-md font-semibold" to="/sign-in">
              Sign In
            </Link>
          </div>
          <Button className="bg-blue-400 hover:bg-blue-400/90 text-white font-bold w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
