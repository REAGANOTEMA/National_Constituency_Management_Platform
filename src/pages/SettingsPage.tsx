import { useState } from "react";
import { Shield, Users, Key, Bell, Globe, Lock, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("general");

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account and platform preferences</p>
      </div>

      <div className="flex border-b border-border gap-1">
        {[["general","General"],["security","Security"],["notifications","Notifications"],["users","User Roles"]].map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)}
            className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${tab===key?"border-primary text-primary":"border-transparent text-muted-foreground hover:text-foreground"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === "general" && (
        <div className="gov-card p-6 space-y-5">
          <h3 className="font-semibold text-foreground">Platform Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              {label:"Platform Name",value:"National Constituency Management Platform"},
              {label:"Country",value:"Republic of Uganda"},
              {label:"Official Domain",value:"ncmp.go.ug"},
              {label:"Support Email",value:"support@ncmp.go.ug"},
            ].map(f=>(
              <div key={f.label}>
                <label className="text-sm font-medium mb-1.5 block">{f.label}</label>
                <input defaultValue={f.value} className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
            style={{background:"hsl(var(--primary))",color:"hsl(var(--primary-foreground))"}}>
            <Save size={14}/> Save Changes
          </button>
        </div>
      )}

      {tab === "security" && (
        <div className="gov-card p-6 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2"><Lock size={16}/> Security Settings</h3>
          {[
            {label:"Two-Factor Authentication",desc:"Require 2FA for all admin accounts",enabled:true},
            {label:"Session Timeout",desc:"Auto logout after 30 minutes of inactivity",enabled:true},
            {label:"Audit Logging",desc:"Log all user actions for compliance",enabled:true},
            {label:"IP Restriction",desc:"Restrict access to government IP ranges",enabled:false},
          ].map(s=>(
            <div key={s.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <div className={`w-10 h-5 rounded-full cursor-pointer transition-colors ${s.enabled?"bg-primary":"bg-muted"}`} />
            </div>
          ))}
        </div>
      )}

      {tab === "notifications" && (
        <div className="gov-card p-6 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2"><Bell size={16}/> Notification Preferences</h3>
          {[
            {label:"New Citizen Requests",desc:"Notify when new requests are submitted"},
            {label:"Case Status Updates",desc:"Notify on case status changes"},
            {label:"Project Milestones",desc:"Notify on project progress updates"},
            {label:"System Alerts",desc:"Platform maintenance and security alerts"},
          ].map(n=>(
            <div key={n.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <div className="flex gap-3">
                {["SMS","Email","Push"].map(c=>(
                  <label key={c} className="flex items-center gap-1.5 text-xs cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    {c}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "users" && (
        <div className="gov-card overflow-hidden">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h3 className="font-semibold text-foreground flex items-center gap-2"><Users size={16}/> Role Management</h3>
            <button className="text-xs px-3 py-1.5 rounded-lg font-semibold"
              style={{background:"hsl(var(--primary))",color:"hsl(var(--primary-foreground))"}}>
              + Invite User
            </button>
          </div>
          <div className="divide-y divide-border">
            {[
              {name:"H.E. Yoweri K. Museveni",email:"admin@ncmp.go.ug",role:"Super Admin",status:"Active"},
              {name:"Hon. Muhammad Nsereko",email:"mp@ncmp.go.ug",role:"MP",status:"Active"},
              {name:"Sarah Nakimera",email:"staff@ncmp.go.ug",role:"Office Staff",status:"Active"},
              {name:"John Ochieng",email:"citizen@ncmp.go.ug",role:"Citizen",status:"Active"},
            ].map(u=>(
              <div key={u.email} className="px-5 py-3 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{background:"hsl(var(--primary))",color:"hsl(var(--primary-foreground))"}}>
                  {u.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{u.role}</span>
                <span className="text-xs px-2 py-0.5 rounded-full badge-resolved">{u.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
