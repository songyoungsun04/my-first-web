type NormalizedError = {
  message: string;
  messageLower: string;
  code?: string;
};

const DEFAULT_MESSAGE = "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
const RLS_MESSAGE = "이 작업을 수행할 권한이 없습니다.";
const FETCH_MESSAGE = "인터넷 연결을 확인해주세요.";
const NOT_FOUND_MESSAGE = "요청한 게시글을 찾을 수 없습니다.";

const normalizeError = (error: unknown): NormalizedError => {
  if (typeof error === "string") {
    return { message: error, messageLower: error.toLowerCase() };
  }

  if (error && typeof error === "object") {
    const record = error as { message?: unknown; code?: unknown };
    const message = typeof record.message === "string" ? record.message : "";
    const code =
      typeof record.code === "string" || typeof record.code === "number"
        ? String(record.code)
        : undefined;

    return { message, messageLower: message.toLowerCase(), code };
  }

  return { message: "", messageLower: "" };
};

export function getErrorMessage(error: unknown): string {
  const { messageLower, code } = normalizeError(error);

  if (code === "42501" || messageLower.includes("row-level security")) {
    return RLS_MESSAGE;
  }

  if (messageLower.includes("failed to fetch")) {
    return FETCH_MESSAGE;
  }

  if (messageLower.includes("not found")) {
    return NOT_FOUND_MESSAGE;
  }

  return DEFAULT_MESSAGE;
}
