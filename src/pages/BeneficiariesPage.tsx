import { useState } from "react";
import { Search, Plus, Eye, Edit, Filter } from "lucide-react";
import { UGANDAN_CONSTITUENCIES } from "@/data/ugandaData";

const BENEFICIARIES = [
  { id: "BEN-001", name: "Grace Nakato", program: "Scholarship", constituency: "Kampala Central", amount: 2500000, status: "Approved", date: "2025-01-10" },
  { id: "BEN-002", name: "Peter Ouma", program: "Medical Assistance", constituency: "Gulu City East", amount: 5000000, status: "Pending", date: "2025-01-09" },
  { id: "BEN-003", name: "Sarah Atim", program: "Women Empowerment", constituency: "Soroti City West", amount: 1500000, status: "Approved", date: "2025-01-08" },
  { id: "BEN-004", name: "John Wasswa", program: "Youth Program", constituency: "Mukono Municipal", amount: 800000, status: "Disbursed", date: "2025-01-07" },
  { id: "BEN-005", name: "Mary Nansubuga", program: "Scholarship", constituency: "Kampala Central", amount: 3000000, status: "Approved", date: "2025-01-06" },
  { id: "BEN-006", name: "Robert Tumwine", program: "Business Support", constituency: "Mbarara Central", amount: 4000000, status: "Rejected", date: "2025-01-05" },
  { id: "BEN-007", name: "Alice Karungi", program: "Medical Assistance", constituency: "Hoima East", amount: 2000000, status: "Disbursed", date: "2025-01-04" },
  { id: "BEN-008", name: "James Okello", program: "Youth Program", constituency: "Lira Central", amount: 1200000, status: "Pending", date: "2025-01-03" },
];

const programColors: Record<string, string> = {
  "Scholarship": "bg-blue-100 text-blue-800",
  "Medical Assistance": "bg-red-100 text-red-800",
  "Women Empowerment": "bg-pink-100 text-pink-800",
  "Youth Program": "bg-purple-100 text-purple-800",
  "Business Support": "bg-amber-100 text-amber-800",
};

const statusColors: Record<string, string> = {
  Approved: "badge-progress",
  Pending: "badge-new",
  Disbursed: "badge-resolved",
  Rejected: "badge-rejected",
};

export default function BeneficiariesPage() {
  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState<"list" | "programs">("list");

  const programs = ["All", "Scholarship", "Medical Assistance", "Women Empowerment", "Youth Program", "Business Support"];
  const filtered = BENEFICIARIES.filter(b =>
    (b.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())) &&
    (programFilter === "All" || b.program === programFilter)
  );

  const programStats = [
    { name: "Scholarship Fund", total: 284, approved: 240, budget: "UGX 720M", icon: "🎓" },
    { name: "Medical Assistance", total: 156, approved: 120, budget: "UGX 480M", icon: "🏥" },
    { name: "Women Empowerment", total: 380, approved: 352, budget: "UGX 352M", icon: "👩‍💼" },
    { name: "Youth Program", total: 520, approved: 480, budget: "UGX 384M", icon: "🌱" },
    { name: "Business Support", total: 94, approved: 78, budget: "UGX 312M", icon: "💼" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Beneficiary Programs</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage scholarships, medical assistance, and support programs</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          <Plus size={16} /> Add Beneficiary
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {["list", "programs"].map(t => (
          <button key={t} onClick={() => setTab(t as any)}
            className={`px-5 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t === "list" ? "Beneficiaries List" : "Programs Overview"}
          </button>
        ))}
      </div>

      {tab === "programs" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programStats.map(p => (
            <div key={p.name} className="gov-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{p.icon}</span>
                <div>
                  <h3 className="font-semibold text-foreground">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">Budget: {p.budget}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Applications</span>
                  <span className="font-semibold text-foreground">{p.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Approved</span>
                  <span className="font-semibold text-green-600">{p.approved}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${(p.approved / p.total) * 100}%`, background: "hsl(var(--success))" }} />
                </div>
                <p className="text-xs text-muted-foreground">{Math.round((p.approved / p.total) * 100)}% approval rate</p>
              </div>
            </div>
          ))}
          <div className="gov-card p-5 border-dashed" style={{ borderStyle: "dashed" }}>
            <button className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors py-8">
              <Plus size={24} />
              <span className="text-sm font-medium">Create New Program</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="gov-card p-4 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 h-9 w-full rounded-lg text-sm bg-muted border-0 focus:outline-none"
                placeholder="Search beneficiaries..." />
            </div>
            <select value={programFilter} onChange={e => setProgramFilter(e.target.value)}
              className="h-9 px-3 rounded-lg text-sm bg-muted border-0 focus:outline-none">
              {programs.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          <div className="gov-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full gov-table">
                <thead>
                  <tr>
                    <th className="text-left">ID</th>
                    <th className="text-left">Beneficiary</th>
                    <th className="text-left">Program</th>
                    <th className="text-left">Constituency</th>
                    <th className="text-left">Amount</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => (
                    <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                      <td className="font-mono text-xs text-primary font-semibold">{b.id}</td>
                      <td className="font-medium text-foreground">{b.name}</td>
                      <td><span className={`text-xs px-2 py-0.5 rounded-md font-medium ${programColors[b.program] || "bg-muted text-muted-foreground"}`}>{b.program}</span></td>
                      <td className="text-muted-foreground text-xs">{b.constituency}</td>
                      <td className="text-foreground text-sm font-medium">UGX {b.amount.toLocaleString()}</td>
                      <td><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[b.status]}`}>{b.status}</span></td>
                      <td className="text-muted-foreground text-xs">{b.date}</td>
                      <td>
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Eye size={13} /></button>
                          <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Edit size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-gov-lg w-full max-w-lg p-6 animate-slide-up">
            <h3 className="font-display text-xl font-bold text-foreground mb-5">Add Beneficiary</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                  <input className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Program</label>
                  <select className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none">
                    {programs.slice(1).map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Constituency</label>
                  <select className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none">
                    {UGANDAN_CONSTITUENCIES.slice(0, 15).map(c => <option key={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Amount (UGX)</label>
                  <input type="number" className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Justification</label>
                <textarea className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none resize-none" rows={3} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-lg border text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-lg text-sm font-semibold transition-all"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                Add Beneficiary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
