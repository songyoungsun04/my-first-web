import { test, expect } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

const getEnvOrThrow = (key: "TEST_EMAIL" | "TEST_PASSWORD") => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} environment variable is required for this test.`);
  }
  return value;
};

test.describe("auth + posts", () => {
  test("happy path: login, create post, verify in list", async ({ page }) => {
    const email = getEnvOrThrow("TEST_EMAIL");
    const password = getEnvOrThrow("TEST_PASSWORD");

    const title = `E2E 테스트 글 ${Date.now()}`;
    const content = "이 내용은 E2E 테스트용으로 작성되었습니다.";

    await page.goto(`${baseURL}/login`);
    await page.getByLabel("이메일").fill(email);
    await page.getByLabel("비밀번호").fill(password);
    await page.getByRole("button", { name: "로그인" }).click();
    await page.waitForURL(/\/posts/);

    await page.goto(`${baseURL}/posts/new`);
    await page.getByLabel("제목").fill(title);
    await page.getByLabel("내용").fill(content);
    await page.getByRole("button", { name: "작성하기" }).click();
    await page.waitForURL(/\/posts(\/|$)/);

    await page.goto(`${baseURL}/posts`);
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  });

  test("reject path: redirect to login when not authenticated", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${baseURL}/posts/new`);
    await page.waitForURL(/\/login/);
    await expect(page).toHaveURL(/\/login/);

    await context.close();
  });
});
