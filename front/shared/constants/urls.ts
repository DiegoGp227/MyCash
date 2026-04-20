const host =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api-mycash.devdiego.work";

export const BaseURL = `${host.replace(/\/$/, "")}/api/`;

export const SignUpURL = new URL("signup", BaseURL);

export const LoginURL = new URL("login", BaseURL);

export const CategoriesURL = new URL("categories", BaseURL);

export const AccountsURL = new URL("accounts", BaseURL);

export const TransactionsURL = new URL("transactions", BaseURL);

export const StatsURL = new URL("stats/summary", BaseURL);

export const TransfersURL = new URL("transfers", BaseURL);

export const BudgetsURL = new URL("budgets", BaseURL);

export const GoalsURL = new URL("goals", BaseURL);

export const DebtsURL = new URL("debts", BaseURL);

export const UsersURL = new URL("users/me", BaseURL);
