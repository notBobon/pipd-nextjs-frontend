import InfoUserCard from "@/components/user-profile/InfoUserCard";
import OrgaUserCard from "@/components/user-profile/OrgaUserCard";
import ProfileTabs from "@/components/user-profile/ProfileTabs";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMainCard from "@/components/user-profile/UserMainCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function Profile() {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        
        <div className="space-y-6">
          <UserMainCard />         
          <InfoUserCard />
          <OrgaUserCard />
          
        </div>
      </div>
      <div className="rounded-2xl p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          
          <ProfileTabs />
          
        </div>
    </div>
  );
}
