
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserByUsername } from "@/lib/services/userService";
import SettingsForm from "@/components/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = await getUserByUsername((session.user as any).username);

  return (
    <div className="min-h-screen bg-[#0B0D12] px-6 py-10">
      <div className="max-w-lg mx-auto">
        <h1 className="text-xl font-semibold text-[#E6E8EB] mb-1">Settings</h1>
        <p className="text-sm text-[#8B92A3] mb-8">
          Update your public profile information.
        </p>

        <SettingsForm user={user} />
      </div>
    </div>
  );
}