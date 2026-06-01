"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type PostFormValues = {
  title: string;
  content: string;
};

type FieldErrors = {
  title?: string;
  content?: string;
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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
      setFieldErrors({});
    }
  }, [initialValues?.title, initialValues?.content]);

  const validate = (values: PostFormValues): FieldErrors => {
    const errors: FieldErrors = {};
    const trimmedTitle = values.title.trim();
    const trimmedContent = values.content.trim();

    if (!trimmedTitle) {
      errors.title = "제목을 입력해주세요.";
    } else if (trimmedTitle.length < 2) {
      errors.title = "제목은 최소 2자 이상이어야 합니다.";
    }

    if (!trimmedContent) {
      errors.content = "내용을 입력해주세요.";
    } else if (trimmedContent.length < 10) {
      errors.content = "내용은 최소 10자 이상이어야 합니다.";
    }

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const trimmedTitle = form.title.trim();
    const trimmedContent = form.content.trim();

    const nextErrors = validate(form);
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit({ title: trimmedTitle, content: trimmedContent });
  };

  const displayError = errorMessage ?? null;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, title: value }));
    if (fieldErrors.title) {
      setFieldErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, content: value }));
    if (fieldErrors.content) {
      setFieldErrors((prev) => ({ ...prev, content: undefined }));
    }
  };

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
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요"
          disabled={isSubmitting}
        />
        {fieldErrors.title ? (
          <p className="text-sm text-destructive">{fieldErrors.title}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-foreground">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          value={form.content}
          onChange={handleContentChange}
          placeholder="내용을 입력하세요"
          rows={8}
          disabled={isSubmitting}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-60"
        />
        {fieldErrors.content ? (
          <p className="text-sm text-destructive">{fieldErrors.content}</p>
        ) : null}
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
