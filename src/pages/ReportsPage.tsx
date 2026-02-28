import { Download, BarChart2, PieChart, TrendingUp, FileText, Calendar } from "lucide-react";

const REPORT_DATA = [
  { month: "Aug", requests: 245, resolved: 198 },
  { month: "Sep", requests: 312, resolved: 267 },
  { month: "Oct", requests: 278, resolved: 245 },
  { month: "Nov", requests: 398, resolved: 352 },
  { month: "Dec", requests: 356, resolved: 298 },
  { month: "Jan", requests: 284, resolved: 234 },
];

const maxVal = Math.max(...REPORT_DATA.map(d => Math.max(d.requests, d.resolved)));

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Comprehensive constituency performance data and insights</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border bg-background hover:bg-muted transition-colors">
            <Calendar size={14} /> Date Range
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Cases Handled", value: "12,847", change: "+8.4%", positive: true },
          { label: "Resolution Rate", value: "85.2%", change: "+2.1%", positive: true },
          { label: "Avg Response Time", value: "3.2 days", change: "-0.5 days", positive: true },
          { label: "Citizen Satisfaction", value: "4.2/5", change: "+0.3", positive: true },
        ].map(k => (
          <div key={k.label} className="gov-card p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{k.label}</p>
            <p className="text-3xl font-bold font-display text-foreground">{k.value}</p>
            <p className={`text-xs mt-1.5 font-medium ${k.positive ? "text-green-600" : "text-red-600"}`}>
              {k.change} vs last period
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Bar Chart */}
        <div className="gov-card p-5">
          <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
            <BarChart2 size={16} className="text-primary" /> Monthly Requests vs Resolved
          </h3>
          <div className="flex items-end gap-3 h-40">
            {REPORT_DATA.map(d => (
              <div key={d.month} className="flex-1 flex items-end gap-0.5">
                <div className="flex-1 rounded-t-md transition-all duration-700"
                  style={{ height: `${(d.requests / maxVal) * 100}%`, background: "hsl(var(--primary))", opacity: 0.8 }} />
                <div className="flex-1 rounded-t-md transition-all duration-700"
                  style={{ height: `${(d.resolved / maxVal) * 100}%`, background: "hsl(var(--success))" }} />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3 justify-center">
            {REPORT_DATA.map(d => (
              <div key={d.month} className="flex-1 text-center text-xs text-muted-foreground">{d.month}</div>
            ))}
          </div>
          <div className="flex gap-5 justify-center mt-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "hsl(var(--primary))" }} />
              Requests
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "hsl(var(--success))" }} />
              Resolved
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="gov-card p-5">
          <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
            <PieChart size={16} className="text-primary" /> Requests by Category
          </h3>
          <div className="space-y-3">
            {[
              { label: "Education & Scholarships", count: 3241, percent: 35, color: "hsl(220,65%,25%)" },
              { label: "Medical Assistance", count: 2180, percent: 24, color: "hsl(0,75%,45%)" },
              { label: "Youth Programs", count: 1820, percent: 20, color: "hsl(42,95%,48%)" },
              { label: "Infrastructure", count: 1200, percent: 13, color: "hsl(210,80%,48%)" },
              { label: "Women Empowerment", count: 740, percent: 8, color: "hsl(280,60%,50%)" },
            ].map(c => (
              <div key={c.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{c.label}</span>
                  <span className="text-muted-foreground">{c.count.toLocaleString()} ({c.percent}%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.percent * 3}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project performance */}
      <div className="gov-card p-5">
        <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" /> Project Completion Overview
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Infrastructure", completed: 18, total: 32, color: "hsl(220,65%,25%)" },
            { label: "Education", completed: 12, total: 15, color: "hsl(210,80%,48%)" },
            { label: "Health", completed: 8, total: 10, color: "hsl(0,75%,45%)" },
            { label: "Water & San.", completed: 25, total: 28, color: "hsl(190,65%,40%)" },
            { label: "Youth/Women", completed: 14, total: 20, color: "hsl(280,60%,50%)" },
          ].map(p => (
            <div key={p.label} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke={p.color} strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={`${2 * Math.PI * 32 * (1 - p.completed / p.total)}`}
                    className="transition-all duration-1000" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground">{Math.round((p.completed / p.total) * 100)}%</span>
                </div>
              </div>
              <p className="text-xs font-medium text-foreground">{p.label}</p>
              <p className="text-xs text-muted-foreground">{p.completed}/{p.total}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Available Reports */}
      <div className="gov-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-foreground">Available Reports</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            { title: "Monthly Constituency Performance Report", period: "January 2025", size: "2.4 MB" },
            { title: "Annual Casework Summary 2024", period: "Full Year 2024", size: "8.1 MB" },
            { title: "Project Status Report Q4 2024", period: "Oct–Dec 2024", size: "3.7 MB" },
            { title: "Beneficiary Programs Impact Report", period: "2024", size: "5.2 MB" },
            { title: "Constituency Budget Utilization", period: "FY 2024/2025", size: "1.9 MB" },
          ].map(r => (
            <div key={r.title} className="px-5 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.period} • {r.size}</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                style={{ color: "hsl(var(--primary))", background: "hsl(var(--primary) / 0.1)" }}>
                <Download size={12} /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
