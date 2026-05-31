"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type PostFormValues = {
  title: string;
  content: string;
};

type PostFormProps = {
  initialValues?: PostFormValues;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
  submitLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
};

export default function PostForm({
  initialValues,
  onSubmit,
  submitLabel = "저장하기",
  isSubmitting = false,
  errorMessage,
}: PostFormProps) {
  const [form, setForm] = useState<PostFormValues>(
    initialValues ?? { title: "", content: "" }
  );
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues?.title, initialValues?.content]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    const trimmedTitle = form.title.trim();
    const trimmedContent = form.content.trim();

    if (!trimmedTitle) {
      setLocalError("제목을 입력해주세요.");
      return;
    }

    if (!trimmedContent) {
      setLocalError("내용을 입력해주세요.");
      return;
    }

    await onSubmit({ title: trimmedTitle, content: trimmedContent });
  };

  const displayError = errorMessage ?? localError;

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-foreground">
          제목
        </label>
        <Input
          id="title"
          type="text"
          name="title"
          value={form.title}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, title: event.target.value }))
          }
          placeholder="제목을 입력하세요"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-foreground">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          value={form.content}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, content: event.target.value }))
          }
          placeholder="내용을 입력하세요"
          rows={8}
          disabled={isSubmitting}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {displayError ? (
        <p className="text-sm text-destructive">{displayError}</p>
      ) : null}

      <Button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
