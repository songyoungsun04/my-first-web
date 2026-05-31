import { supabase } from "@/lib/supabase/client";

export type Post = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
};

export type PostPayload = {
  title: string;
  content: string;
};

type PostResult<T> = {
  data: T | null;
  error: string | null;
  notFound?: boolean;
};

const postSelect = "id, user_id, title, content, created_at";

export async function getPosts(): Promise<PostResult<Post[]>> {
  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data ?? [], error: null };
}

export async function getPostById(id: string): Promise<PostResult<Post | null>> {
  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return { data: null, error: null, notFound: true };
    }
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function createPost(
  userId: string,
  payload: PostPayload
): Promise<PostResult<Post>> {
  const { data, error } = await supabase
    .from("posts")
    .insert({ user_id: userId, title: payload.title, content: payload.content })
    .select(postSelect)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function updatePost(
  id: string,
  payload: PostPayload
): Promise<PostResult<Post>> {
  const { data, error } = await supabase
    .from("posts")
    .update({ title: payload.title, content: payload.content })
    .eq("id", id)
    .select(postSelect)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function deletePost(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
