// export default function CommunitiesPage() {
//   return <div>Communities page - coming soon</div>;
// }
// import Link from "next/link";
// import { getCommunities } from "@/lib/services/communityService";
// import CreateCommunityForm from "@/components/CreateCommunityForm";
// export const revalidate = 60;
// export default async function CommunitiesPage() {
//   const { communities } = await getCommunities();

//   return (
//     <div className="min-h-screen bg-[#0B0D12] px-6 py-10">
//       <div className="max-w-3xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-xl font-semibold text-[#E6E8EB]">Communities</h1>
//             <p className="text-sm text-[#8B92A3] mt-1">
//               Find developers building around the same technologies.
//             </p>
//           </div>
//           <CreateCommunityForm />
//         </div>

//         {communities.length === 0 ? (
//           <div className="border border-dashed border-[#232733] rounded-xl p-10 text-center">
//             <p className="text-sm text-[#8B92A3]">
//               No communities yet. Be the first to create one.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {communities.map((c: any) => (
//               <Link
//                 key={c._id}
//                 href={`/communities/${c.slug}`}
//                 className="block bg-[#12151C] border border-[#232733] hover:border-[#333844] rounded-xl p-5 transition-colors"
//               >
//                 <h2 className="text-[#E6E8EB] font-medium">{c.name}</h2>
//                 <p className="text-sm text-[#8B92A3] mt-1">{c.description}</p>
//                 {c.topics?.length > 0 && (
//                   <div className="flex gap-2 mt-3 flex-wrap">
//                     {c.topics.map((topic: string) => (
//                       <span
//                         key={topic}
//                         className="text-xs font-mono text-[#7C6FF5] bg-[#7C6FF5]/10 px-2 py-1 rounded-md"
//                       >
//                         {topic}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { getCommunities } from "@/lib/services/communityService";
import CreateCommunityForm from "@/components/CreateCommunityForm";
import SearchInput from "@/components/SearchInput";

export const revalidate = 60;

export default async function CommunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const { communities } = await getCommunities(search);

  return (
    <div className="min-h-screen bg-[#0B0D12] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-[#E6E8EB]">Communities</h1>
            <p className="text-sm text-[#8B92A3] mt-1">
              Find developers building around the same technologies.
            </p>
          </div>
          <CreateCommunityForm />
        </div>

        <div className="mb-6">
          <SearchInput placeholder="Search communities..." />
        </div>

        {communities.length === 0 ? (
          <div className="border border-dashed border-[#232733] rounded-xl p-10 text-center">
            <p className="text-sm text-[#8B92A3]">
              {search ? `No communities found for "${search}".` : "No communities yet. Be the first to create one."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {communities.map((c: any) => (
              <Link
                key={c._id}
                href={`/communities/${c.slug}`}
                className="block bg-[#12151C] border border-[#232733] hover:border-[#333844] rounded-xl p-5 transition-colors"
              >
                <h2 className="text-[#E6E8EB] font-medium">{c.name}</h2>
                <p className="text-sm text-[#8B92A3] mt-1">{c.description}</p>
                {c.topics?.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {c.topics.map((topic: string) => (
                      <span
                        key={topic}
                        className="text-xs font-mono text-[#7C6FF5] bg-[#7C6FF5]/10 px-2 py-1 rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}