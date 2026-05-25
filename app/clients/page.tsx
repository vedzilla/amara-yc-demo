import { PageHeader } from "@/components/SectionLabel";
import { ClientCard } from "@/components/ClientCard";
import { clients } from "@/lib/mock-data";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ClientsPage() {
  const healthy = clients.filter((c) => c.status === "healthy").length;
  const attention = clients.filter((c) => c.status === "attention").length;

  return (
    <div>
      <PageHeader
        number="03"
        label="CLIENTS · UNDER MANAGEMENT"
        title="Six clients."
        italicTitle="Twenty-three channels."
        trailingTitle="One agent running them all."
        subtitle={`${healthy} healthy, ${attention} on watch. Each client has its own playbook ingested at onboarding — every decision Amara makes references it.`}
        actions={
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-line-dark hover:border-violet/40 hover:bg-ink-raised text-cream text-[13px] transition-colors"
          >
            <Plus size={14} className="text-violet-bright" />
            Onboard client
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clients.map((c) => (
          <ClientCard key={c.slug} client={c} />
        ))}
      </div>
    </div>
  );
}
