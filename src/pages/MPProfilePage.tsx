import { useState } from "react";
import mpPlaceholder from "@/assets/mp-placeholder.png";
import { SAMPLE_MP_PROFILES, UGANDAN_CONSTITUENCIES, UGANDAN_PARTIES, type MPProfile } from "@/data/ugandaData";
import { Edit, Mail, Twitter, Globe, MapPin, Calendar, Users, Star, ExternalLink, Save, X } from "lucide-react";

export default function MPProfilePage() {
  const [profile, setProfile] = useState<MPProfile>(SAMPLE_MP_PROFILES[0]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">MP Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">Official representative profile and contact information</p>
        </div>
        {!editing && (
          <button onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
            <Edit size={16} /> Edit Profile
          </button>
        )}
      </div>

      {/* Profile Banner */}
      <div className="rounded-2xl overflow-hidden shadow-gov-lg" style={{ background: "hsl(var(--primary))" }}>
        <div className="h-32 relative" style={{ background: "linear-gradient(135deg, hsl(220,65%,12%) 0%, hsl(220,55%,28%) 50%, hsl(42,80%,35%) 100%)" }}>
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjMiLz48L2c+PC9zdmc+')]" />
        </div>
        <div className="px-8 pb-8 -mt-16 flex items-end gap-6">
          <div className="relative">
            <img src={mpPlaceholder} alt={profile.name}
              className="w-28 h-28 rounded-xl object-cover border-4 shadow-gov-md"
              style={{ borderColor: "hsl(var(--secondary))" }} />
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${profile.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
          </div>
          <div className="pb-2 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Star size={12} style={{ color: "hsl(var(--secondary))" }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--secondary))" }}>
                Member of Parliament
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-primary-foreground">{profile.name}</h2>
            <p className="text-primary-foreground/70 text-sm">{profile.constituency} Constituency</p>
          </div>
        </div>
      </div>

      {editing ? (
        /* Edit Form */
        <div className="gov-card p-6 space-y-5">
          <h3 className="font-semibold text-foreground text-lg">Edit Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", key: "name", type: "text" },
              { label: "Email", key: "email", type: "email" },
              { label: "Phone", key: "phone", type: "tel" },
              { label: "Twitter", key: "twitter", type: "text" },
              { label: "Website", key: "website", type: "url" },
              { label: "Term Start", key: "termStart", type: "date" },
              { label: "Term End", key: "termEnd", type: "date" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{f.label}</label>
                <input type={f.type} value={(form as any)[f.key] || ""}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            ))}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Party</label>
              <select value={form.party} onChange={e => setForm({ ...form, party: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none">
                {UGANDAN_PARTIES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Constituency</label>
              <select value={form.constituency} onChange={e => setForm({ ...form, constituency: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none">
                {UGANDAN_CONSTITUENCIES.map(c => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Biography</label>
            <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              rows={4} />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEditing(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">
              <X size={15} /> Cancel
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
              <Save size={15} /> Save Changes
            </button>
          </div>
        </div>
      ) : (
        /* View Mode */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="gov-card p-5">
              <h3 className="font-semibold text-foreground mb-4">Political Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Party Affiliation", value: profile.party },
                  { label: "Constituency", value: profile.constituency },
                  { label: "District", value: profile.district },
                  { label: "Region", value: profile.region },
                  { label: "Term Start", value: profile.termStart },
                  { label: "Term End", value: profile.termEnd },
                ].map(i => (
                  <div key={i.label}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{i.label}</p>
                    <p className="text-sm font-semibold text-foreground">{i.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="gov-card p-5">
              <h3 className="font-semibold text-foreground mb-3">Biography</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
            </div>

            {/* Performance Stats */}
            <div className="gov-card p-5">
              <h3 className="font-semibold text-foreground mb-4">Performance Overview</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Requests", value: "1,284", icon: Users },
                  { label: "Active Projects", value: "24", icon: Star },
                  { label: "Resolution Rate", value: "85%", icon: Star },
                ].map(s => (
                  <div key={s.label} className="rounded-lg p-3 text-center" style={{ background: "hsl(var(--muted))" }}>
                    <div className="text-xl font-bold font-display text-primary">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-5">
            <div className="gov-card p-5">
              <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-3">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity">
                    <div className="p-2 rounded-lg bg-muted"><Mail size={14} className="text-primary" /></div>
                    <span className="text-muted-foreground">{profile.email}</span>
                  </a>
                )}
                {profile.twitter && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 rounded-lg bg-muted"><Twitter size={14} className="text-primary" /></div>
                    <span className="text-muted-foreground">{profile.twitter}</span>
                  </div>
                )}
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity">
                    <div className="p-2 rounded-lg bg-muted"><Globe size={14} className="text-primary" /></div>
                    <span className="text-muted-foreground">{profile.website}</span>
                    <ExternalLink size={10} className="text-muted-foreground ml-auto" />
                  </a>
                )}
              </div>
            </div>

            {/* Status Card */}
            <div className="gov-card p-5">
              <h3 className="font-semibold text-foreground mb-3">Status</h3>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${profile.status === "active" ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
                <span className="text-sm font-semibold capitalize" style={{ color: profile.status === "active" ? "hsl(var(--success))" : "hsl(var(--muted-foreground))" }}>
                  {profile.status === "active" ? "Currently Serving" : "Inactive"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Serving until {profile.termEnd}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
