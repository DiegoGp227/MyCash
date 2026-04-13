/**
 * Saves the auth token to both localStorage and a cookie.
 * The cookie is needed for server-side middleware route protection.
 */
export function saveAuthToken(token: string): void {
  localStorage.setItem("token", token);
  document.cookie = `token=${token}; path=/; SameSite=Strict`;
}

/**
 * Clears the auth token from both localStorage and the cookie.
 */
export function clearAuthToken(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
}
