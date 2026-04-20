import { useCallback, useState } from "react";
import { useAppStoreActions } from "@/store/hooks";
import { authService } from "../services/authServices";
import { IUpdateUserRequest } from "../types/auth.types";

export function useUpdateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUserInfo } = useAppStoreActions((actions) => actions.auth);

  const updateUser = useCallback(
    async (data: IUpdateUserRequest) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.updateUser(data);
        updateUserInfo(response.userInfo);
        localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
        return response;
      } catch (err: any) {
        const message =
          err?.response?.data?.message ?? err?.message ?? "Something went wrong";
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    [updateUserInfo],
  );

  return { isLoading, error, updateUser };
}
