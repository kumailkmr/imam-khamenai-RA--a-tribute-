"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, MessageSquare, Bell, FileText, Download } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("guestbook");

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-ink text-parchment font-inter flex flex-col">
      {/* Header */}
      <header className="border-b border-brass/20 bg-charcoal px-6 py-4 flex justify-between items-center">
        <h1 className="font-amiri text-2xl text-brass">Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 text-sm text-parchment/60 hover:text-parchment transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 md:p-6 gap-6">
        
        {/* Sidebar Nav */}
        <nav className="w-full md:w-64 space-y-2 flex-shrink-0">
          <TabButton 
            id="guestbook" 
            label="Guestbook Moderation" 
            icon={<MessageSquare className="w-4 h-4" />} 
            active={activeTab} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="announcements" 
            label="Announcements Feed" 
            icon={<Bell className="w-4 h-4" />} 
            active={activeTab} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="condolences" 
            label="Official Condolences" 
            icon={<FileText className="w-4 h-4" />} 
            active={activeTab} 
            onClick={setActiveTab} 
          />
        </nav>

        {/* Workspace */}
        <main className="flex-1 bg-charcoal rounded-lg border border-brass/10 p-6 min-h-[500px]">
          {activeTab === "guestbook" && <GuestbookModerator />}
          {activeTab === "announcements" && <AnnouncementsEditor />}
          {activeTab === "condolences" && <CondolencesEditor />}
        </main>
      </div>
    </div>
  );
}

function TabButton({ id, label, icon, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-left transition-colors ${
        active === id 
          ? "bg-brass/10 text-brass border border-brass/30" 
          : "text-parchment/60 hover:bg-ink hover:text-parchment border border-transparent"
      }`}
    >
      {icon}
      <span className="font-mono text-sm">{label}</span>
    </button>
  );
}

// -----------------------------------------------------------------------------
// GUESTBOOK MODERATOR
// -----------------------------------------------------------------------------
function GuestbookModerator() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    const res = await fetch("/api/admin/guestbook");
    if (res.ok) setEntries(await res.json());
    setLoading(false);
  };

  useEffect(() => { setTimeout(() => fetchEntries(), 0); }, []);

  const toggleHide = async (id, currentStatus) => {
    await fetch("/api/admin/guestbook", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isHidden: !currentStatus })
    });
    fetchEntries();
  };

  const deleteEntry = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this entry?")) return;
    await fetch("/api/admin/guestbook", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchEntries();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-brass/20 pb-4">
        <h2 className="text-xl font-amiri text-brass">Guestbook Moderation</h2>
        <a 
          href="/api/admin/export" 
          download
          className="flex items-center space-x-2 text-sm bg-brass/10 hover:bg-brass/20 text-brass px-3 py-1.5 rounded transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </a>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="space-y-3">
          {entries.map(e => (
            <div key={e.id} className={`p-4 border rounded ${e.isHidden ? 'border-red-900/50 bg-red-900/10 opacity-75' : 'border-brass/20 bg-ink/50'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <strong className="text-brass-light block">{e.name}</strong>
                  <span className="text-xs text-parchment/50 font-mono">
                    {new Date(e.timestamp).toLocaleString()} {e.ip && `| IP: ${e.ip}`}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleHide(e.id, e.isHidden)}
                    className={`text-xs px-2 py-1 rounded border ${e.isHidden ? 'text-green-400 border-green-400/30' : 'text-yellow-400 border-yellow-400/30'}`}
                  >
                    {e.isHidden ? "Unhide" : "Hide"}
                  </button>
                  <button 
                    onClick={() => deleteEntry(e.id)}
                    className="text-xs px-2 py-1 rounded border text-red-400 border-red-400/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm">{e.message}</p>
            </div>
          ))}
          {entries.length === 0 && <p className="text-parchment/50">No entries yet.</p>}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// ANNOUNCEMENTS EDITOR
// -----------------------------------------------------------------------------
function AnnouncementsEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/announcements");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => { setTimeout(() => fetchItems(), 0); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete announcement?")) return;
    await fetch("/api/admin/announcements", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-brass/20 pb-4">
        <h2 className="text-xl font-amiri text-brass">Announcements Feed</h2>
        <p className="text-xs text-parchment/50 mt-1">Updates in the scrolling ticker.</p>
      </div>

      <AnnouncementForm onSave={fetchItems} />

      <div className="space-y-4 pt-6 border-t border-brass/10">
        <h3 className="font-mono text-sm text-brass-light">Existing Announcements</h3>
        {loading ? <p>Loading...</p> : items.map(item => (
          <div key={item.id} className="p-4 bg-ink/50 border border-brass/20 rounded relative">
            <button onClick={() => handleDelete(item.id)} className="absolute top-4 right-4 text-xs text-red-400">Delete</button>
            <div className="grid grid-cols-2 gap-4 text-sm mb-2">
              <div><strong className="text-parchment/60">Date (EN):</strong> {item.date_en}</div>
              <div><strong className="text-parchment/60">Date (FA):</strong> {item.date_fa}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-2">
              <div><strong className="text-parchment/60">EN:</strong> {item.text_en}</div>
              <div dir="rtl"><strong className="text-parchment/60">FA:</strong> {item.text_fa}</div>
            </div>
            {item.sourceUrl && <div className="text-xs text-blue-400 mt-2">Source: {item.sourceUrl}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnnouncementForm({ onSave }) {
  const [form, setForm] = useState({ date_en: "", date_fa: "", text_en: "", text_fa: "", sourceUrl: "", isUrgent: false });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ date_en: "", date_fa: "", text_en: "", text_fa: "", sourceUrl: "", isUrgent: false });
    setSaving(false);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-ink p-4 rounded border border-brass/30">
      <h3 className="font-mono text-sm text-brass-light">Add New Announcement</h3>
      <div className="grid grid-cols-2 gap-4">
        <input required placeholder="Date (EN)" value={form.date_en} onChange={e => setForm({...form, date_en: e.target.value})} className="bg-charcoal border border-brass/20 p-2 rounded text-sm w-full" />
        <input required placeholder="Date (FA)" value={form.date_fa} onChange={e => setForm({...form, date_fa: e.target.value})} className="bg-charcoal border border-brass/20 p-2 rounded text-sm w-full" dir="rtl" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <textarea required placeholder="Text (EN)" value={form.text_en} onChange={e => setForm({...form, text_en: e.target.value})} className="bg-charcoal border border-brass/20 p-2 rounded text-sm w-full h-24" />
        <textarea required placeholder="Text (FA)" value={form.text_fa} onChange={e => setForm({...form, text_fa: e.target.value})} className="bg-charcoal border border-brass/20 p-2 rounded text-sm w-full h-24" dir="rtl" />
      </div>
      <div className="flex items-center space-x-4">
        <input placeholder="Source URL (optional)" value={form.sourceUrl} onChange={e => setForm({...form, sourceUrl: e.target.value})} className="bg-charcoal border border-brass/20 p-2 rounded text-sm flex-1" />
        <label className="flex items-center space-x-2 text-sm text-parchment/60">
          <input type="checkbox" checked={form.isUrgent} onChange={e => setForm({...form, isUrgent: e.target.checked})} />
          <span>Is Urgent?</span>
        </label>
        <button type="submit" disabled={saving} className="bg-brass text-ink px-4 py-2 rounded text-sm font-bold">
          {saving ? "Saving..." : "Add"}
        </button>
      </div>
    </form>
  );
}

// -----------------------------------------------------------------------------
// CONDOLENCES EDITOR
// -----------------------------------------------------------------------------
function CondolencesEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/condolences");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => { setTimeout(() => fetchItems(), 0); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete condolence?")) return;
    await fetch("/api/admin/condolences", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-brass/20 pb-4">
        <h2 className="text-xl font-amiri text-brass">Official Condolences</h2>
      </div>

      <CondolenceForm onSave={fetchItems} />

      <div className="space-y-4 pt-6 border-t border-brass/10">
        <h3 className="font-mono text-sm text-brass-light">Existing Statements</h3>
        {loading ? <p>Loading...</p> : items.map(item => (
          <div key={item.id} className="p-4 bg-ink/50 border border-brass/20 rounded relative">
            <button onClick={() => handleDelete(item.id)} className="absolute top-4 right-4 text-xs text-red-400">Delete</button>
            <div className="grid grid-cols-2 gap-4 text-sm mb-2">
              <div><strong className="text-parchment/60">Name (EN):</strong> {item.name_en}</div>
              <div dir="rtl"><strong className="text-parchment/60">Name (FA):</strong> {item.name_fa}</div>
              <div><strong className="text-parchment/60">Affiliation (EN):</strong> {item.affiliation_en}</div>
              <div dir="rtl"><strong className="text-parchment/60">Affiliation (FA):</strong> {item.affiliation_fa}</div>
            </div>
            <div className="text-sm mt-2"><strong className="text-parchment/60">EN Excerpt:</strong> {item.excerpt_en}</div>
            <div className="text-sm mt-2" dir="rtl"><strong className="text-parchment/60">FA Excerpt:</strong> {item.excerpt_fa}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CondolenceForm({ onSave }) {
  const [form, setForm] = useState({ name_en: "", name_fa: "", affiliation_en: "", affiliation_fa: "", excerpt_en: "", excerpt_fa: "", sourceUrl: "", date_en: "", date_fa: "" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/condolences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ name_en: "", name_fa: "", affiliation_en: "", affiliation_fa: "", excerpt_en: "", excerpt_fa: "", sourceUrl: "", date_en: "", date_fa: "" });
    setSaving(false);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-ink p-4 rounded border border-brass/30">
      <h3 className="font-mono text-sm text-brass-light">Add New Condolence</h3>
      <div className="grid grid-cols-2 gap-4">
        <input required placeholder="Name (EN)" value={form.name_en} onChange={e => setForm({...form, name_en: e.target.value})} className="bg-charcoal border border-brass/20 p-2 rounded text-sm w-full" />
        <input required placeholder="Name (FA)" value={form.name_fa} onChange={e => setForm({...form, name_fa: e.target.value})} className="bg-charcoal border border-brass/20 p-2 rounded text-sm w-full" dir="rtl" />
        <input required placeholder="Affiliation (EN)" value={form.affiliation_en} onChange={e => setForm({...form, affiliation_en: e.target.value})} className="bg-charcoal border border-brass/20 p-2 rounded text-sm w-full" />
        <input required placeholder="Affiliation (FA)" value={form.affiliation_fa} onChange={e => setForm({...form, affiliation_fa: e.target.value})} className="bg-charcoal border border-brass/20 p-2 rounded text-sm w-full" dir="rtl" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <textarea required placeholder="Excerpt (EN)" value={form.excerpt_en} onChange={e => setForm({...form, excerpt_en: e.target.value})} className="bg-charcoal border border-brass/20 p-2 rounded text-sm w-full h-20" />
        <textarea required placeholder="Excerpt (FA)" value={form.excerpt_fa} onChange={e => setForm({...form, excerpt_fa: e.target.value})} className="bg-charcoal border border-brass/20 p-2 rounded text-sm w-full h-20" dir="rtl" />
      </div>
      <div className="flex space-x-4">
        <button type="submit" disabled={saving} className="bg-brass text-ink px-4 py-2 rounded text-sm font-bold ml-auto">
          {saving ? "Saving..." : "Add Statement"}
        </button>
      </div>
    </form>
  );
}
