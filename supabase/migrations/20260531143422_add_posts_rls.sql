-- NOTE: Before applying, make sure policies with the same names do not already exist.
-- If they do, drop or rename them to avoid duplicates.

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "posts_select_public"
ON public.posts
FOR SELECT
USING (true);

CREATE POLICY "posts_insert_own"
ON public.posts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "posts_update_own"
ON public.posts
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "posts_delete_own"
ON public.posts
FOR DELETE
USING (auth.uid() = user_id);