import Link from "next/link";
import { getTechIcon } from "@/lib/techIcons";

export default function CommunityCard({ community }: { community: any }) {
  const { icon: Icon, bg, color } = getTechIcon(community.name);

  return (
    <div className="rounded-xl border border-[#232733] bg-[#12151C] p-4 transition-colors hover:border-[#333844]">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
        <Icon size={20} className={color} />
      </div>
      <h3 className="text-sm font-medium text-[#E6E8EB]">{community.name}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-[#8B92A3]">
        {community.description}
      </p>
      <Link
        href={`/communities/${community.slug}`}
        className="mt-3 block w-full rounded-lg border border-[#232733] py-1.5 text-center text-xs text-[#E6E8EB] transition-colors hover:border-[#7C6FF5] hover:text-[#7C6FF5]"
      >
        View community
      </Link>
    </div>
  );
}