"use client";

import { Settings } from "lucide-react";
import { useAppStoreState } from "@/store/hooks";
import PageHeader from "@/app/components/molecules/PageHeader";
import ProfileSection from "./components/ProfileSection";
import PreferencesSection from "./components/PreferencesSection";
import AppearanceSection from "./components/AppearanceSection";

export default function SettingsPage() {
  const user = useAppStoreState((state) => state.auth.user?.userInfo);

  if (!user) return null;

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 md:ml-14">
      <PageHeader
        title="Settings"
        description="Manage your profile and preferences"
        icon={<Settings className="w-6 h-6 md:w-8 md:h-8 text-primary-purple" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl">
        <ProfileSection user={user} />
        <PreferencesSection user={user} />
        <div className="lg:col-span-2">
          <AppearanceSection />
        </div>
      </div>
    </main>
  );
}
