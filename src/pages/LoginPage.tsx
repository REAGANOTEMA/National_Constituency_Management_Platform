import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ncmpLogo from "@/assets/ncmp-logo.png";
import parliamentHero from "@/assets/parliament-hero.png";
import { Eye, EyeOff, Shield, AlertCircle } from "lucide-react";

const DEMO_CREDS = [
  { label: "Super Admin / President", email: "admin@ncmp.go.ug", role: "super_admin" },
  { label: "Member of Parliament", email: "mp@ncmp.go.ug", role: "mp" },
  { label: "Office Staff", email: "staff@ncmp.go.ug", role: "staff" },
  { label: "Citizen", email: "citizen@ncmp.go.ug", role: "citizen" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (demoEmail: string) => {
    setError("");
    setLoading(true);
    try {
      await login(demoEmail, "demo1234");
      navigate("/dashboard");
    } catch {
      setError("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12" style={{ background: "hsl(var(--primary))" }}>
        <img src={parliamentHero} alt="Uganda Parliament" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <img src={ncmpLogo} alt="NCMP" className="w-14 h-14 rounded-full object-cover border-2 border-secondary/50" />
            <div>
              <div className="font-bold text-lg text-secondary">NCMP</div>
              <div className="text-xs text-primary-foreground/70">Republic of Uganda</div>
            </div>
          </div>
          <h1 className="font-display text-4xl font-bold text-primary-foreground leading-tight mb-4">
            National Constituency<br />Management Platform
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-md">
            Empowering Members of Parliament and constituency offices to deliver transparent, efficient, and accountable service to citizens of Uganda.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label: "Constituencies", value: "290+" },
            { label: "Active MPs", value: "529" },
            { label: "Citizens Served", value: "45M+" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4" style={{ background: "hsl(var(--primary-light))" }}>
              <div className="text-2xl font-bold text-secondary">{s.value}</div>
              <div className="text-xs text-primary-foreground/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16 bg-background">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-3 mb-8">
          <img src={ncmpLogo} alt="NCMP" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-bold text-primary">NCMP Uganda</div>
            <div className="text-xs text-muted-foreground">National Constituency Management Platform</div>
          </div>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} style={{ color: "hsl(var(--secondary))" }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--secondary))" }}>
              Secure Government Portal
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">Sign in to NCMP</h2>
          <p className="text-muted-foreground text-sm mb-8">Enter your official credentials to access your workspace.</p>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm mb-6">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Official Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@parliament.go.ug"
                required
                className="w-full h-11 px-4 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-11 px-4 pr-11 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  style={{ borderColor: "hsl(var(--border))" }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-60"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              {loading ? "Authenticating..." : "Sign In Securely"}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">Demo Access</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_CREDS.map(d => (
                <button
                  key={d.email}
                  onClick={() => quickLogin(d.email)}
                  className="text-left px-3 py-2.5 rounded-lg border text-xs transition-all hover:border-primary/40 hover:bg-muted"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <div className="font-semibold text-foreground">{d.label}</div>
                  <div className="text-muted-foreground mt-0.5">{d.email}</div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link to="/" className="font-semibold hover:underline" style={{ color: "hsl(var(--primary))" }}>
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
