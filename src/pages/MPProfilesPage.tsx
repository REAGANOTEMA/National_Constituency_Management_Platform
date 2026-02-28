import { useState } from "react";
import { Search, Plus, Eye, Edit } from "lucide-react";
import mpPlaceholder from "@/assets/mp-placeholder.png";
import { SAMPLE_MP_PROFILES, UGANDAN_CONSTITUENCIES, type MPProfile } from "@/data/ugandaData";
import { Link } from "react-router-dom";

const ALL_MPs: MPProfile[] = [
  ...SAMPLE_MP_PROFILES,
  ...UGANDAN_CONSTITUENCIES.slice(3, 20).map((c, i) => ({
    id: `mp-${i + 10}`,
    name: `Hon. ${c.mp}`,
    party: i % 3 === 0 ? "NRM - National Resistance Movement" : i % 3 === 1 ? "NUP - National Unity Platform" : "FDC - Forum for Democratic Change",
    constituency: c.name,
    district: c.district,
    region: c.region,
    termStart: "2021-05-20",
    termEnd: "2026-05-19",
    bio: `Serving ${c.name} constituency with dedication to public service and development.`,
    status: "active" as const,
  })),
];

export default function MPProfilesPage() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");

  const filtered = ALL_MPs.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.constituency.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === "All" || m.region === regionFilter;
    return matchSearch && matchRegion;
  });

  const regions = ["All", "Central", "Eastern", "Western", "Northern", "West Nile"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">MP Profiles Directory</h1>
          <p className="text-muted-foreground text-sm mt-1">All Members of Parliament across Uganda's constituencies</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          <Plus size={16} /> Add MP
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {regions.slice(1).map(r => (
          <div key={r} className="gov-card p-4 text-center cursor-pointer hover:border-primary/40 transition-colors"
            onClick={() => setRegionFilter(r === regionFilter ? "All" : r)}>
            <div className="text-xl font-bold font-display text-primary">
              {ALL_MPs.filter(m => m.region === r).length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{r}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="gov-card p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 h-9 w-full rounded-lg text-sm bg-muted border-0 focus:outline-none"
            placeholder="Search by name or constituency..." />
        </div>
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
          className="h-9 px-3 rounded-lg text-sm bg-muted border-0 focus:outline-none">
          {regions.map(r => <option key={r}>{r}</option>)}
        </select>
        <span className="text-sm text-muted-foreground">{filtered.length} MPs found</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(mp => (
          <div key={mp.id} className="gov-card overflow-hidden group">
            <div className="h-20 relative" style={{ background: "hsl(var(--primary))" }}>
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent to-secondary" />
              <div className="absolute top-2 right-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${mp.status === "active" ? "bg-green-500/20 text-green-200 border border-green-500/30" : "bg-gray-500/20 text-gray-200"}`}>
                  {mp.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="px-4 pb-4 -mt-8">
              <img src={mpPlaceholder} alt={mp.name}
                className="w-16 h-16 rounded-xl object-cover border-2 mb-3 shadow-gov-sm"
                style={{ borderColor: "hsl(var(--secondary))" }} />
              <h3 className="font-semibold text-foreground text-sm leading-tight">{mp.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{mp.constituency}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{mp.region}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground truncate max-w-20">{mp.party.split(" - ")[0]}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Link to="/mp-profile" className="flex-1 flex items-center justify-center gap-1.5 h-7 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 transition-colors">
                  <Eye size={12} /> View
                </Link>
                <Link to="/mp-profile" className="flex-1 flex items-center justify-center gap-1.5 h-7 rounded-lg text-xs font-medium transition-all"
                  style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>
                  <Edit size={12} /> Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
