import { useState } from "react";
import { Plus, Bell, Send, Megaphone, Calendar, Users, Eye } from "lucide-react";

const ANNOUNCEMENTS = [
  { id: 1, title: "Constituency Day - January 25th", type: "Event", audience: "All Citizens", date: "2025-01-15", status: "Published", views: 1284 },
  { id: 2, title: "Scholarship Applications Now Open", type: "Program", audience: "Youth", date: "2025-01-12", status: "Published", views: 2847 },
  { id: 3, title: "Road Works Notice - Kireka Road", type: "Notice", audience: "Kireka Residents", date: "2025-01-10", status: "Published", views: 892 },
  { id: 4, title: "Community Health Drive - February", type: "Event", audience: "All Citizens", date: "2025-01-08", status: "Draft", views: 0 },
  { id: 5, title: "Women Empowerment Workshop", type: "Program", audience: "Women", date: "2025-01-05", status: "Published", views: 1540 },
];

const EVENTS = [
  { date: "2025-01-25", title: "Constituency Day", location: "Town Hall", time: "9:00 AM" },
  { date: "2025-02-03", title: "Community Health Drive", location: "Health Center", time: "8:00 AM" },
  { date: "2025-02-15", title: "Women's Empowerment Workshop", location: "Community Center", time: "10:00 AM" },
  { date: "2025-03-01", title: "Youth Football Tournament", location: "Nakivubo Stadium", time: "2:00 PM" },
];

const typeColors: Record<string, string> = {
  Event: "bg-blue-100 text-blue-800",
  Program: "bg-green-100 text-green-800",
  Notice: "bg-amber-100 text-amber-800",
};

export default function CommunicationPage() {
  const [tab, setTab] = useState<"announcements" | "events" | "compose">("announcements");
  const [compose, setCompose] = useState({ title: "", message: "", audience: "All Citizens", type: "Event" });
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Communication & Engagement</h1>
          <p className="text-muted-foreground text-sm mt-1">Publish announcements, manage events and engage with citizens</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          <Plus size={16} /> New Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Announcements", value: 42, icon: Megaphone, color: "text-primary" },
          { label: "Total Views", value: "18.4K", icon: Eye, color: "text-green-600" },
          { label: "Upcoming Events", value: 4, icon: Calendar, color: "text-amber-600" },
          { label: "Subscribers", value: "3,284", icon: Users, color: "text-purple-600" },
        ].map(s => (
          <div key={s.label} className="gov-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <div className={`text-xl font-bold font-display ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {[["announcements", "Announcements"], ["events", "Events"], ["compose", "Compose SMS/Email"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === "announcements" && (
        <div className="space-y-3">
          {ANNOUNCEMENTS.map(a => (
            <div key={a.id} className="gov-card p-5 flex items-center gap-4">
              <div className={`px-2 py-1 rounded-md text-xs font-semibold ${typeColors[a.type]}`}>{a.type}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Audience: {a.audience} • Published: {a.date}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Eye size={12} /> {a.views.toLocaleString()} views
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.status === "Published" ? "badge-resolved" : "badge-new"}`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {tab === "events" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EVENTS.map(e => (
            <div key={e.date} className="gov-card p-5 flex items-start gap-4">
              <div className="rounded-xl p-3 text-center min-w-14" style={{ background: "hsl(var(--primary))" }}>
                <div className="text-xs font-bold text-primary-foreground/70">
                  {new Date(e.date).toLocaleString("default", { month: "short" })}
                </div>
                <div className="text-2xl font-bold font-display text-primary-foreground leading-none">
                  {new Date(e.date).getDate()}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{e.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">📍 {e.location}</p>
                <p className="text-sm text-muted-foreground">⏰ {e.time}</p>
              </div>
            </div>
          ))}
          <button onClick={() => setShowModal(true)}
            className="gov-card p-5 border-dashed flex items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-pointer"
            style={{ borderStyle: "dashed" }}>
            <Plus size={18} /> Add Event
          </button>
        </div>
      )}

      {tab === "compose" && (
        <div className="gov-card p-6 max-w-2xl">
          <h3 className="font-semibold text-foreground text-lg mb-5">Compose Bulk Message</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message Type</label>
                <select className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none">
                  <option>SMS</option>
                  <option>Email</option>
                  <option>Both</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Target Audience</label>
                <select className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none">
                  {["All Citizens", "Youth", "Women", "Elders", "Business Owners", "Farmers"].map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Subject</label>
              <input className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none" placeholder="Message subject..." />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Message</label>
              <textarea className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none resize-none" rows={6}
                placeholder="Type your message here..." />
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Bell size={16} className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground">This message will be sent to approximately <strong>12,840 recipients</strong> in your constituency.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">Save Draft</button>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                <Send size={14} /> Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-gov-lg w-full max-w-lg p-6 animate-slide-up">
            <h3 className="font-display text-xl font-bold text-foreground mb-5">Create Announcement</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Title</label>
                <input className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Type</label>
                  <select className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none">
                    <option>Event</option>
                    <option>Notice</option>
                    <option>Program</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Audience</label>
                  <select className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none">
                    {["All Citizens", "Youth", "Women", "Elders"].map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Content</label>
                <textarea className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none resize-none" rows={4} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-lg border text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-lg text-sm font-semibold"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
