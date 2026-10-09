// export default function ProfilePage() {
//   return <div>Profile page - coming soon</div>;
// }

import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function MyProfileRedirect() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  redirect(`/profile/${(session.user as any).username}`);
}