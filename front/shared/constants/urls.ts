export const BaseURL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api-mycash.devdiego.work/api/";

export const SignUpURL = new URL("signup", BaseURL);

export const LoginURL = new URL("login", BaseURL);


