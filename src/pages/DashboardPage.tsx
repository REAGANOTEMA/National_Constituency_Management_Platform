import { useAuth } from "@/contexts/AuthContext";
import StatsCard from "@/components/StatsCard";
import {
  ClipboardList, FolderKanban, Heart, Users, TrendingUp,
  CheckCircle, AlertCircle, Clock, MapPin, Activity,
  FileText, Bell, Star, BarChart2,
} from "lucide-react";
import mpPlaceholder from "@/assets/mp-placeholder.png";
import { SAMPLE_MP_PROFILES } from "@/data/ugandaData";
import { Link } from "react-router-dom";

const RECENT_REQUESTS = [
  { id: "REQ-001", name: "Grace Nakato", type: "Scholarship", priority: "High", status: "In Progress", date: "2025-01-15" },
  { id: "REQ-002", name: "Peter Ochieng", type: "Medical Assistance", priority: "Urgent", status: "New", date: "2025-01-14" },
  { id: "REQ-003", name: "Mary Atim", type: "Business Support", priority: "Medium", status: "Resolved", date: "2025-01-13" },
  { id: "REQ-004", name: "Joseph Mugisha", type: "Infrastructure", priority: "Low", status: "Assigned", date: "2025-01-12" },
  { id: "REQ-005", name: "Annet Nalwoga", type: "Youth Program", priority: "Medium", status: "In Progress", date: "2025-01-11" },
];

const RECENT_PROJECTS = [
  { name: "Kireka Road Rehabilitation", category: "Infrastructure", budget: "UGX 250M", progress: 72, status: "Active" },
  { name: "Borehole Drilling - 5 Villages", category: "Water & Sanitation", budget: "UGX 80M", progress: 100, status: "Completed" },
  { name: "Primary School Construction", category: "Education", budget: "UGX 320M", progress: 45, status: "Active" },
  { name: "Health Center Extension", category: "Health", budget: "UGX 150M", progress: 88, status: "Active" },
];

const statusColors: Record<string, string> = {
  "New": "badge-new",
  "In Progress": "badge-progress",
  "Resolved": "badge-resolved",
  "Assigned": "bg-purple-100 text-purple-800 border border-purple-200",
  "Active": "badge-progress",
  "Completed": "badge-resolved",
};

function SuperAdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Platform Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome, Your Excellency. All Uganda constituencies at a glance.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Constituencies" value="290" subtitle="Across 10 regions" icon={MapPin} variant="primary" trend={{ value: 0, positive: true }} />
        <StatsCard title="Active MPs" value="529" subtitle="Current parliament" icon={Users} variant="gold" />
        <StatsCard title="Total Requests" value="12,847" subtitle="All constituencies" icon={ClipboardList} variant="success" trend={{ value: 8, positive: true }} />
        <StatsCard title="Active Projects" value="1,284" subtitle="Nationwide" icon={FolderKanban} variant="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 gov-card p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart2 size={16} className="text-primary" /> National Request Statistics
          </h3>
          <div className="space-y-3">
            {[
              { label: "Education & Scholarships", count: 3241, percent: 75 },
              { label: "Medical Assistance", count: 2180, percent: 50 },
              { label: "Infrastructure", count: 1820, percent: 42 },
              { label: "Youth Programs", count: 2900, percent: 67 },
              { label: "Women Empowerment", count: 1500, percent: 35 },
            ].map(r => (
              <div key={r.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{r.label}</span>
                  <span className="text-muted-foreground">{r.count.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${r.percent}%`, background: "hsl(var(--primary))" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gov-card p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity size={16} className="text-primary" /> System Activity
          </h3>
          <div className="space-y-3">
            {[
              { label: "New requests today", value: "284", icon: ClipboardList, color: "text-blue-600" },
              { label: "Resolved this week", value: "1,204", icon: CheckCircle, color: "text-green-600" },
              { label: "Pending review", value: "438", icon: Clock, color: "text-amber-600" },
              { label: "Escalated cases", value: "32", icon: AlertCircle, color: "text-red-600" },
              { label: "Active users today", value: "892", icon: Users, color: "text-purple-600" },
            ].map(a => (
              <div key={a.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <a.icon size={14} className={a.color} />
                  <span className="text-sm text-muted-foreground">{a.label}</span>
                </div>
                <span className="text-sm font-bold text-foreground">{a.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Constituency Table Preview */}
      <div className="gov-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-semibold text-foreground">Top Performing Constituencies</h3>
          <Link to="/constituencies" className="text-xs font-semibold hover:underline" style={{ color: "hsl(var(--primary))" }}>
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full gov-table">
            <thead>
              <tr>
                <th className="text-left">Constituency</th>
                <th className="text-left">MP</th>
                <th className="text-left">Region</th>
                <th className="text-left">Requests</th>
                <th className="text-left">Resolved</th>
                <th className="text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Kampala Central", mp: "Hon. Nsereko", region: "Central", req: 284, resolved: 250, score: 88 },
                { name: "Mukono Municipal", mp: "Hon. Nambooze", region: "Central", req: 198, resolved: 185, score: 93 },
                { name: "Gulu City East", mp: "Hon. Komakech", region: "Northern", req: 156, resolved: 140, score: 90 },
                { name: "Mbarara Central", mp: "Hon. Matsiko", region: "Western", req: 210, resolved: 192, score: 91 },
                { name: "Jinja East", mp: "Hon. Kibuule", region: "Eastern", req: 175, resolved: 155, score: 89 },
              ].map(c => (
                <tr key={c.name} className="hover:bg-muted/30 transition-colors">
                  <td className="font-medium text-foreground">{c.name}</td>
                  <td className="text-muted-foreground">{c.mp}</td>
                  <td><span className="px-2 py-0.5 rounded-md text-xs bg-muted text-muted-foreground">{c.region}</span></td>
                  <td className="text-foreground">{c.req}</td>
                  <td className="text-green-600 font-medium">{c.resolved}</td>
                  <td>
                    <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-green-100 text-green-800">{c.score}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MPDashboard() {
  const { user } = useAuth();
  const mp = SAMPLE_MP_PROFILES[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* MP Profile Banner */}
      <div className="rounded-xl overflow-hidden" style={{ background: "hsl(var(--primary))" }}>
        <div className="p-6 flex items-center gap-5">
          <img src={mpPlaceholder} alt="MP" className="w-20 h-20 rounded-xl object-cover border-2 border-secondary/40" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Star size={14} style={{ color: "hsl(var(--secondary))" }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--secondary))" }}>
                Member of Parliament
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-primary-foreground">{mp.name}</h2>
            <p className="text-primary-foreground/70 text-sm">{mp.constituency} Constituency • {mp.party}</p>
            <p className="text-primary-foreground/50 text-xs mt-1">Term: {mp.termStart} to {mp.termEnd}</p>
          </div>
          <Link to="/mp-profile"
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" }}>
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Requests" value="1,284" subtitle="This term" icon={ClipboardList} variant="primary" trend={{ value: 12, positive: true }} />
        <StatsCard title="Resolved Cases" value="1,089" subtitle="85% resolution rate" icon={CheckCircle} variant="success" />
        <StatsCard title="Active Projects" value="24" subtitle="8 completed" icon={FolderKanban} variant="gold" />
        <StatsCard title="Beneficiaries" value="3,420" subtitle="Programs served" icon={Heart} variant="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="gov-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Recent Citizen Requests</h3>
            <Link to="/requests" className="text-xs font-semibold hover:underline" style={{ color: "hsl(var(--primary))" }}>View All</Link>
          </div>
          <div className="divide-y divide-border">
            {RECENT_REQUESTS.map(r => (
              <div key={r.id} className="px-5 py-3 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.type} • {r.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[r.status]}`}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gov-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Active Projects</h3>
            <Link to="/projects" className="text-xs font-semibold hover:underline" style={{ color: "hsl(var(--primary))" }}>View All</Link>
          </div>
          <div className="divide-y divide-border">
            {RECENT_PROJECTS.map(p => (
              <div key={p.name} className="px-5 py-3">
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.category} • {p.budget}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status]}`}>{p.status}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: "hsl(var(--primary))" }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{p.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StaffDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Staff Workspace</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage assigned tasks and citizen requests.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="My Assigned Cases" value="47" subtitle="Active tasks" icon={ClipboardList} variant="primary" />
        <StatsCard title="Resolved Today" value="8" icon={CheckCircle} variant="success" />
        <StatsCard title="Pending Review" value="12" icon={Clock} variant="gold" />
        <StatsCard title="Notifications" value="5" icon={Bell} variant="danger" />
      </div>
      <div className="gov-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-foreground">My Task Queue</h3>
        </div>
        <div className="divide-y divide-border">
          {RECENT_REQUESTS.map(r => (
            <div key={r.id} className="px-5 py-3 hover:bg-muted/30 transition-colors flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{r.id} — {r.name}</p>
                <p className="text-xs text-muted-foreground">{r.type} • Priority: {r.priority}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[r.status]}`}>{r.status}</span>
                <button className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                  style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CitizenDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">My Constituency Portal</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your requests and stay updated on constituency activities.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="My Requests" value="3" subtitle="Submitted" icon={ClipboardList} variant="primary" />
        <StatsCard title="Resolved" value="2" subtitle="Successfully closed" icon={CheckCircle} variant="success" />
        <StatsCard title="Pending" value="1" subtitle="Awaiting response" icon={Clock} variant="gold" />
      </div>

      <div className="gov-card p-5">
        <h3 className="font-semibold text-foreground mb-4">Submit a New Request</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Scholarship", "Medical Aid", "Infrastructure", "Youth Program", "Business Support", "Water & Sanitation", "Other"].map(t => (
            <Link key={t} to="/requests"
              className="p-3 rounded-lg border text-center text-sm font-medium hover:border-primary/40 hover:bg-muted transition-all"
              style={{ borderColor: "hsl(var(--border))" }}>
              {t}
            </Link>
          ))}
        </div>
      </div>

      <div className="gov-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-foreground">My Requests</h3>
        </div>
        <div className="divide-y divide-border">
          {RECENT_REQUESTS.slice(0, 3).map(r => (
            <div key={r.id} className="px-5 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{r.id} — {r.type}</p>
                <p className="text-xs text-muted-foreground">Submitted {r.date}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[r.status]}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case "super_admin": return <SuperAdminDashboard />;
    case "mp": return <MPDashboard />;
    case "staff":
    case "data_entry": return <StaffDashboard />;
    case "citizen": return <CitizenDashboard />;
    default: return <MPDashboard />;
  }
}
