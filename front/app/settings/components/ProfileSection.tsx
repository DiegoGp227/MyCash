"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { profileSchema, ProfileFormInput } from "@/src/auth/schemas/updateUser.schema";
import { useUpdateUser } from "@/src/auth/hooks/useUpdateUser";
import { IUserInfo } from "@/src/auth/types/auth.types";
import { useState } from "react";

interface ProfileSectionProps {
  user: IUserInfo;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const { isLoading, updateUser } = useUpdateUser();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      username: user.userName ?? "",
    },
  });

  const onSubmit = async (data: ProfileFormInput) => {
    setServerError(null);
    setSuccess(false);
    try {
      await updateUser({
        name: data.name,
        username: data.username || undefined,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary-purple/10 dark:bg-primary-purple/20 flex items-center justify-center">
          <User className="w-5 h-5 text-primary-purple" />
        </div>
        <div>
          <h2 className="font-semibold text-light-text-main dark:text-white">Profile</h2>
          <p className="text-sm text-hard-gray">Update your name and username</p>
        </div>
      </div>

      <div className="h-px bg-gray-100 dark:bg-dark-border" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-hard-gray">Name *</label>
          <input
            {...register("name")}
            disabled={isLoading}
            placeholder="Your name"
            className="input text-hard-gray"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-hard-gray">Username</label>
          <input
            {...register("username")}
            disabled={isLoading}
            placeholder="@username"
            className="input text-hard-gray"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-hard-gray">Email</label>
          <input
            value={user.email}
            disabled
            className="input text-hard-gray opacity-50 cursor-not-allowed"
          />
          <p className="text-xs text-hard-gray">Email cannot be changed.</p>
        </div>

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
        {success && <p className="text-green-500 text-sm">Profile updated successfully.</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 rounded-lg bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors disabled:opacity-60"
          >
            {isLoading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
