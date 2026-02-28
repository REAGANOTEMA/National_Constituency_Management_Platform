import { useState } from "react";
import { Search, Plus, MapPin, Users, FolderKanban, ClipboardList, ChevronRight } from "lucide-react";
import { UGANDAN_CONSTITUENCIES, UGANDAN_REGIONS } from "@/data/ugandaData";
import { Link } from "react-router-dom";

export default function ConstituenciesPage() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [selected, setSelected] = useState<typeof UGANDAN_CONSTITUENCIES[0] | null>(null);

  const filtered = UGANDAN_CONSTITUENCIES.filter(c =>
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.district.toLowerCase().includes(search.toLowerCase()) || c.mp.toLowerCase().includes(search.toLowerCase())) &&
    (regionFilter === "All" || c.region === regionFilter)
  );

  const regionCount = UGANDAN_REGIONS.reduce((acc, r) => {
    acc[r] = UGANDAN_CONSTITUENCIES.filter(c => c.region === r).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Constituencies Directory</h1>
          <p className="text-muted-foreground text-sm mt-1">All {UGANDAN_CONSTITUENCIES.length}+ constituencies across Uganda</p>
        </div>
      </div>

      {/* Region overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {UGANDAN_REGIONS.map(r => (
          <button key={r} onClick={() => setRegionFilter(regionFilter === r ? "All" : r)}
            className={`gov-card p-4 text-center transition-all ${regionFilter === r ? "ring-2 ring-primary" : ""}`}>
            <div className="text-2xl font-bold font-display text-primary">{regionCount[r]}</div>
            <div className="text-xs text-muted-foreground mt-1">{r}</div>
          </button>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="gov-card p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 h-9 w-full rounded-lg text-sm bg-muted border-0 focus:outline-none"
            placeholder="Search by name, district, or MP..." />
        </div>
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
          className="h-9 px-3 rounded-lg text-sm bg-muted border-0 focus:outline-none">
          <option value="All">All Regions</option>
          {UGANDAN_REGIONS.map(r => <option key={r}>{r}</option>)}
        </select>
        <span className="text-sm text-muted-foreground">{filtered.length} constituencies</span>
      </div>

      {/* Main grid + detail panel */}
      <div className={`grid gap-4 ${selected ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"}`}>
        <div className={selected ? "lg:col-span-2" : ""}>
          <div className="gov-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full gov-table">
                <thead>
                  <tr>
                    <th className="text-left">#</th>
                    <th className="text-left">Constituency</th>
                    <th className="text-left">District</th>
                    <th className="text-left">Region</th>
                    <th className="text-left">MP</th>
                    <th className="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => (
                    <tr key={c.id} className={`hover:bg-muted/30 transition-colors cursor-pointer ${selected?.id === c.id ? "bg-primary/5" : ""}`}
                      onClick={() => setSelected(selected?.id === c.id ? null : c)}>
                      <td className="text-muted-foreground text-xs">{c.id}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <MapPin size={12} className="text-primary flex-shrink-0" />
                          <span className="font-medium text-foreground">{c.name}</span>
                        </div>
                      </td>
                      <td className="text-muted-foreground text-xs">{c.district}</td>
                      <td><span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{c.region}</span></td>
                      <td className="text-foreground text-xs">{c.mp}</td>
                      <td>
                        <button className="p-1.5 rounded hover:bg-muted text-muted-foreground transition-colors">
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="space-y-4">
            <div className="gov-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-foreground text-lg">{selected.name}</h3>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "District", value: selected.district },
                  { label: "Region", value: selected.region },
                  { label: "Current MP", value: selected.mp },
                  { label: "Constituency ID", value: `CON-${String(selected.id).padStart(3, "0")}` },
                ].map(i => (
                  <div key={i.label} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{i.label}</span>
                    <span className="text-sm font-semibold text-foreground">{i.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: "Requests", value: Math.floor(Math.random() * 500) + 100, icon: ClipboardList },
                  { label: "Projects", value: Math.floor(Math.random() * 30) + 5, icon: FolderKanban },
                  { label: "Staff", value: Math.floor(Math.random() * 8) + 2, icon: Users },
                ].map(s => (
                  <div key={s.label} className="rounded-lg p-3 text-center bg-muted">
                    <div className="text-lg font-bold font-display text-primary">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Link to="/requests" className="flex-1 text-center py-2 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 transition-colors">
                  View Requests
                </Link>
                <Link to="/mp-profiles" className="flex-1 text-center py-2 rounded-lg text-xs font-medium transition-all"
                  style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>
                  View MP
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
