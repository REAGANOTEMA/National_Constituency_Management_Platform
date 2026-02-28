import { Link } from "react-router-dom";
import ncmpLogo from "@/assets/ncmp-logo.png";
import parliamentHero from "@/assets/parliament-hero.png";
import mpPlaceholder from "@/assets/mp-placeholder.png";
import { Shield, Users, FolderKanban, BarChart3, ClipboardList, Heart, MapPin, Phone, Mail, MessageCircle, ChevronRight, Star, CheckCircle } from "lucide-react";

const FEATURES = [
  { icon: ClipboardList, title: "Citizen Request Management", desc: "Receive, track, and resolve citizen requests with full case history and priority management." },
  { icon: FolderKanban, title: "Project Tracking", desc: "Monitor constituency development projects, budgets, milestones, and progress in real-time." },
  { icon: Heart, title: "Beneficiary Programs", desc: "Manage scholarships, medical assistance, youth & women programs with approval workflows." },
  { icon: Users, title: "MP Profiles", desc: "Complete professional profiles for every MP including party, term, bio and contact info." },
  { icon: BarChart3, title: "Reports & Analytics", desc: "Comprehensive performance dashboards, PDF exports and constituency-wide insights." },
  { icon: Shield, title: "Role-Based Security", desc: "Enterprise-grade access control for Super Admin, MPs, Staff, Citizens and Auditors." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-md" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={ncmpLogo} alt="NCMP" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-bold text-sm" style={{ color: "hsl(var(--primary))" }}>NCMP Uganda</div>
              <div className="text-xs text-muted-foreground">National Constituency Management Platform</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#constituencies" className="hover:text-foreground transition-colors">Constituencies</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
          </div>
          <Link to="/login"
            className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
            Sign In →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "hsl(var(--primary))" }}>
        <img src={parliamentHero} alt="Uganda Parliament" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <img src={ncmpLogo} alt="NCMP" className="w-12 h-12 rounded-full object-cover border-2 border-secondary/50" />
              <div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(var(--secondary))" }}>Republic of Uganda</div>
                <div className="text-xs text-primary-foreground/60">Official Government Platform</div>
              </div>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              National Constituency<br />
              <span style={{ color: "hsl(var(--secondary))" }}>Management Platform</span>
            </h1>
            <p className="text-primary-foreground/70 text-xl leading-relaxed mb-10 max-w-2xl">
              Empowering Uganda's 529 Members of Parliament to deliver transparent, accountable, and efficient service to 45 million citizens across 290+ constituencies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login"
                className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" }}>
                Access Platform →
              </Link>
              <a href="#features"
                className="px-8 py-3.5 rounded-xl font-semibold text-sm border transition-all"
                style={{ borderColor: "hsl(var(--primary-foreground) / 0.3)", color: "hsl(var(--primary-foreground))" }}>
                Learn More
              </a>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div className="relative z-10 border-t" style={{ borderColor: "hsl(var(--primary-light))", background: "hsl(var(--primary-light))" }}>
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Constituencies", value: "290+" },
              { label: "Active MPs", value: "529" },
              { label: "Citizens Served", value: "45M+" },
              { label: "Districts", value: "146" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold font-display" style={{ color: "hsl(var(--secondary))" }}>{s.value}</div>
                <div className="text-xs text-primary-foreground/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "hsl(var(--primary) / 0.08)", color: "hsl(var(--primary))" }}>
            <Star size={12} /> Enterprise Government Platform
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Complete Constituency Management</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Everything an MP and their office needs to serve constituents efficiently and transparently.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className="gov-card p-6 group">
              <div className="p-3 rounded-xl w-fit mb-4 transition-colors" style={{ background: "hsl(var(--primary) / 0.08)" }}>
                <f.icon size={22} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MP Profiles Preview */}
      <section id="constituencies" className="py-20" style={{ background: "hsl(var(--muted))" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Professional MP Profiles</h2>
            <p className="text-muted-foreground">Complete profiles for every Member of Parliament in Uganda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Hon. Muhammad Nsereko", constituency: "Kampala Central", party: "NRM", region: "Central" },
              { name: "Hon. Betty Nambooze", constituency: "Mukono Municipal", party: "NUP", region: "Central" },
              { name: "Hon. Norbert Mao", constituency: "Omoro", party: "DP", region: "Northern" },
            ].map(mp => (
              <div key={mp.name} className="gov-card overflow-hidden">
                <div className="h-20" style={{ background: "hsl(var(--primary))" }} />
                <div className="px-5 pb-5 -mt-8">
                  <img src={mpPlaceholder} alt={mp.name} className="w-16 h-16 rounded-xl object-cover border-2 mb-3" style={{ borderColor: "hsl(var(--secondary))" }} />
                  <h3 className="font-semibold text-foreground">{mp.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{mp.constituency} Constituency</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{mp.party}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{mp.region}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Ready to Transform Constituency Management?</h2>
          <p className="text-muted-foreground mb-8">Join Uganda's national digital governance platform and deliver better services to your constituents.</p>
          <Link to="/login"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
            Get Started <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10" style={{ background: "hsl(var(--primary))", borderColor: "hsl(var(--primary-light))" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={ncmpLogo} alt="NCMP" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-bold" style={{ color: "hsl(var(--secondary))" }}>NCMP Uganda</div>
                <div className="text-xs text-primary-foreground/50">National Constituency Management Platform</div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-primary-foreground/60">© 2025 Republic of Uganda. All rights reserved.</p>
              <p className="text-xs text-primary-foreground/40 mt-1">
                Built by <strong className="text-secondary">Reagan Otema</strong> — Enterprise Government Solutions
              </p>
            </div>
            <div className="flex gap-4">
              <a href="https://wa.me/+256700000000" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-primary-foreground/60 hover:text-secondary transition-colors">
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a href="mailto:reaganotemas@gmail.com"
                className="flex items-center gap-2 text-xs text-primary-foreground/60 hover:text-secondary transition-colors">
                <Mail size={14} /> reaganotemas@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
