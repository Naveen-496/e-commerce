import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/")({
  component: PostsComponent,
});

const posts = [
  {
    id: 123,
    name: "Hello, World",
  },
  {
    id: 456,
    name: "React Router",
  },
  {
    id: 789,
    name: "React Query",
  },
];

function PostsComponent() {
  return (
    <div className="w-full flex items-center justify-center">
      <ul>
        {posts.map((post) => (
          <div key={post.id} className="p-2 rounded-lg border space-y-4">
            <Link to={`/posts/${post.id}`}>{post.name}</Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
