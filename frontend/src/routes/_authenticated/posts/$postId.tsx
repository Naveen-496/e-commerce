import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/$postId")({
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();
  return <div>Post Id: {postId}</div>;
}
