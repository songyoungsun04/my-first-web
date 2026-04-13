import PostsListClient from "@/components/PostsListClient";
import { getPosts } from "@/lib/posts";

export default async function PostsPage() {
  const initialPosts = await getPosts();

  return (
    <section className="space-y-6">
      <PostsListClient initialPosts={initialPosts} />
    </section>
  );
}
