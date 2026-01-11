import ThemeCardContainer from "@/components/dashboard/profile/theme-card-container";
import UserInformationContainer from "@/components/dashboard/profile/user-information-container";
import SidebarHeaderContent from "@/components/layout/sidebar-header-content";

export default async function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <SidebarHeaderContent
        title="Profile"
        description="Update your photo and personal details."
      />

      <UserInformationContainer />

      {/* Appearance Section */}
      <ThemeCardContainer />
    </div>
  );
}
