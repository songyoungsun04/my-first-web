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

  // Auth Errors
  if (messageLower.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
  if (messageLower.includes("user already registered")) {
    return "이미 가입된 이메일입니다.";
  }
  if (messageLower.includes("email not confirmed")) {
    return "이메일 인증이 필요합니다.";
  }
  if (messageLower.includes("password should be at least")) {
    return "비밀번호는 최소 6자 이상이어야 합니다.";
  }
  if (messageLower.includes("rate limit exceeded")) {
    return "이메일 발송 한도를 초과했습니다. 잠시 후 다시 시도해주세요. (테스트 환경인 경우 Supabase 대시보드에서 이메일 인증 옵션을 꺼주세요.)";
  }
  if (messageLower.includes("database error") || messageLower.includes("duplicate key")) {
    return "데이터베이스 오류로 인해 가입/로그인에 실패했습니다. 트리거 등을 확인해주세요.";
  }

  return DEFAULT_MESSAGE;
}
