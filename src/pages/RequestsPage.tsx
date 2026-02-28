import { useState } from "react";
import { Search, Plus, Filter, Download, Eye, Edit, ChevronDown } from "lucide-react";
import { UGANDAN_CONSTITUENCIES, UGANDAN_REGIONS } from "@/data/ugandaData";

const priorityColors: Record<string, string> = {
  Urgent: "bg-red-100 text-red-800 border border-red-200",
  High: "bg-orange-100 text-orange-800 border border-orange-200",
  Medium: "bg-amber-100 text-amber-800 border border-amber-200",
  Low: "bg-green-100 text-green-800 border border-green-200",
};

const statusColors: Record<string, string> = {
  New: "badge-new",
  Assigned: "bg-purple-100 text-purple-800 border border-purple-200",
  "In Progress": "badge-progress",
  Resolved: "badge-resolved",
  Rejected: "badge-rejected",
};

const REQUESTS = [
  { id: "REQ-2025-001", name: "Grace Nakato", constituency: "Kampala Central", type: "Scholarship", priority: "High", status: "In Progress", date: "2025-01-15", assigned: "Sarah Nakimera" },
  { id: "REQ-2025-002", name: "Peter Ochieng", constituency: "Gulu City East", type: "Medical Assistance", priority: "Urgent", status: "New", date: "2025-01-14", assigned: "-" },
  { id: "REQ-2025-003", name: "Mary Atim", constituency: "Soroti City West", type: "Business Support", priority: "Medium", status: "Resolved", date: "2025-01-13", assigned: "John Okello" },
  { id: "REQ-2025-004", name: "Joseph Mugisha", constituency: "Mbarara Central", type: "Infrastructure", priority: "Low", status: "Assigned", date: "2025-01-12", assigned: "Paul Byaruhanga" },
  { id: "REQ-2025-005", name: "Annet Nalwoga", constituency: "Kampala Central", type: "Youth Program", priority: "Medium", status: "In Progress", date: "2025-01-11", assigned: "Sarah Nakimera" },
  { id: "REQ-2025-006", name: "Daniel Ssekandi", constituency: "Mukono Municipal", type: "Water & Sanitation", priority: "High", status: "New", date: "2025-01-10", assigned: "-" },
  { id: "REQ-2025-007", name: "Fatuma Nabukenya", constituency: "Jinja East", type: "Women Empowerment", priority: "Medium", status: "Resolved", date: "2025-01-09", assigned: "Alice Nakiganda" },
  { id: "REQ-2025-008", name: "Robert Kiiza", constituency: "Hoima East", type: "Scholarship", priority: "Low", status: "In Progress", date: "2025-01-08", assigned: "James Byarugaba" },
];

type Status = "New" | "Assigned" | "In Progress" | "Resolved" | "Rejected";

export default function RequestsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newForm, setNewForm] = useState({ name: "", type: "Scholarship", priority: "Medium", description: "", constituency: "Kampala Central" });

  const filtered = REQUESTS.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchType = typeFilter === "All" || r.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const types = ["All", ...Array.from(new Set(REQUESTS.map(r => r.type)))];
  const statuses = ["All", "New", "Assigned", "In Progress", "Resolved", "Rejected"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Citizen Requests & Cases</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage all citizen requests and constituency casework</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          <Plus size={16} /> New Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total", value: 847, color: "text-foreground" },
          { label: "New", value: 124, color: "text-blue-600" },
          { label: "In Progress", value: 283, color: "text-amber-600" },
          { label: "Resolved", value: 398, color: "text-green-600" },
          { label: "Rejected", value: 42, color: "text-red-600" },
        ].map(s => (
          <div key={s.label} className="gov-card p-4 text-center">
            <div className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="gov-card p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 h-9 w-full rounded-lg text-sm bg-muted border-0 focus:outline-none"
            placeholder="Search by name or ID..." />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="h-9 px-3 rounded-lg text-sm bg-muted border-0 focus:outline-none">
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
          className="h-9 px-3 rounded-lg text-sm bg-muted border-0 focus:outline-none">
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
        <button className="flex items-center gap-2 h-9 px-3 rounded-lg text-sm bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
          <Download size={14} /> Export
        </button>
      </div>

      {/* Table */}
      <div className="gov-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full gov-table">
            <thead>
              <tr>
                <th className="text-left">Request ID</th>
                <th className="text-left">Citizen</th>
                <th className="text-left">Constituency</th>
                <th className="text-left">Type</th>
                <th className="text-left">Priority</th>
                <th className="text-left">Status</th>
                <th className="text-left">Assigned To</th>
                <th className="text-left">Date</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                  <td className="font-mono text-xs text-primary font-semibold">{r.id}</td>
                  <td className="font-medium text-foreground">{r.name}</td>
                  <td className="text-muted-foreground text-xs">{r.constituency}</td>
                  <td className="text-foreground text-xs">{r.type}</td>
                  <td><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[r.priority]}`}>{r.priority}</span></td>
                  <td><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[r.status]}`}>{r.status}</span></td>
                  <td className="text-muted-foreground text-xs">{r.assigned}</td>
                  <td className="text-muted-foreground text-xs">{r.date}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"><Eye size={14} /></button>
                      <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"><Edit size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No requests found matching your criteria.</div>
        )}
      </div>

      {/* New Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-gov-lg w-full max-w-lg p-6 animate-slide-up">
            <h3 className="font-display text-xl font-bold text-foreground mb-5">Submit New Request</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Citizen Name</label>
                  <input value={newForm.name} onChange={e => setNewForm({ ...newForm, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Full name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Request Type</label>
                  <select value={newForm.type} onChange={e => setNewForm({ ...newForm, type: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none">
                    {["Scholarship", "Medical Assistance", "Infrastructure", "Youth Program", "Business Support", "Water & Sanitation", "Women Empowerment", "Other"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Priority</label>
                  <select value={newForm.priority} onChange={e => setNewForm({ ...newForm, priority: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none">
                    {["Urgent", "High", "Medium", "Low"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Constituency</label>
                  <select value={newForm.constituency} onChange={e => setNewForm({ ...newForm, constituency: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none">
                    {UGANDAN_CONSTITUENCIES.slice(0, 20).map(c => <option key={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                <textarea value={newForm.description} onChange={e => setNewForm({ ...newForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  rows={3} placeholder="Describe the request in detail..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 h-10 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowModal(false)}
                className="flex-1 h-10 rounded-lg text-sm font-semibold transition-all"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
