import { useState, useCallback } from "react";
import { useAppStoreActions } from "@/store/hooks";
import { parseAuthError } from "@/utils/parseAuthError";
import { ICreateUserRequest } from "../types/auth.types";
import { authService } from "../services/authServices";
import { useRouter } from "next/navigation";

export function useSignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAppStoreActions((actions) => actions.auth);
  const router = useRouter();

  const signup = useCallback(
    async (credentials: ICreateUserRequest) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.signUp(credentials);

        if (response?.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
          setAuth(response);
          router.push("/profile");
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
    signup,
  };
}
