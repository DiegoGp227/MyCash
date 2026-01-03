import { useAppStoreActions } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ICredentials } from "../types/auth.types";
import { parseAuthError } from "@/utils/parseAuthError";
import { authService } from "../services/authServices";

export function useLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAppStoreActions((actions) => actions.auth);
  const router = useRouter();

  const login = useCallback(
    async (credentials: ICredentials) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.login(credentials);

        if (response?.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
          setAuth(response);
          router.push("/");
        }

        return response;
      } catch (err: unknown) {
        const errorMessage = parseAuthError(err);
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [setAuth, router]
  );

  return {
    isLoading,
    error,
    login,
  };
}
