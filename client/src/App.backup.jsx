
import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  LayoutDashboard,
  Search,
  Bookmark,
  ClipboardList,
  Users,
  Settings,
  MapPin,
  Clock3,
  ExternalLink,
  SlidersHorizontal,
  Bell,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  Menu,
  X,
} from "lucide-react";
import "./index.css";

const API_BASE = "http://localhost:5000/api";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Find Jobs", icon: Search },
  { label: "Saved Jobs", icon: Bookmark },
  { label: "Applications", icon: ClipboardList },
  { label: "Contacts", icon: Users },
];

function formatDate(value) {
  if (!value) return "Date not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function App() {
  const [activePage, setActivePage] = useState("Find Jobs");
  const [query, setQuery] = useState("React Developer");
  const [location, setLocation] = useState("Noida");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [sourceFilter, setSourceFilter] = useState("All sources");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ai-job-hunter-saved") || "[]");
    } catch {
      return [];
    }
  });

  const filteredJobs = useMemo(() => {
    let result = jobs;

    if (sourceFilter !== "All sources") {
      result = result.filter(
        (job) => job.source?.toLowerCase() === sourceFilter.toLowerCase()
      );
    }

    if (remoteOnly) {
      result = result.filter((job) => job.remote);
    }

    if (activePage === "Saved Jobs") {
      result = result.filter((job) =>
        savedJobs.some((saved) => saved.url === job.url)
      );
    }

    return result;
  }, [jobs, sourceFilter, remoteOnly, activePage, savedJobs]);

  async function searchJobs(event) {
    event?.preventDefault();

    if (!query.trim() || !location.trim()) {
      setError("Please enter both job title and location.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const params = new URLSearchParams({
        query: query.trim(),
        location: location.trim(),
      });

      const response = await fetch(`${API_BASE}/jobs/search?${params}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Job search failed.");
      }

      setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      setActivePage("Find Jobs");
    } catch (err) {
      setError(
        err.message.includes("fetch")
          ? "Backend connect nahi ho raha. Check karo server port 5000 par running hai."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  function toggleSave(job) {
    const exists = savedJobs.some((saved) => saved.url === job.url);

    const updated = exists
      ? savedJobs.filter((saved) => saved.url !== job.url)
      : [...savedJobs, job];

    setSavedJobs(updated);
    localStorage.setItem("ai-job-hunter-saved", JSON.stringify(updated));
  }

  const pageTitle =
    activePage === "Overview"
      ? "Your job hunt, simplified."
      : activePage === "Saved Jobs"
        ? "Your saved opportunities."
        : activePage === "Applications"
          ? "Track your applications."
          : activePage === "Contacts"
            ? "Build your professional network."
            : "Find your next opportunity.";

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
  <img
    src="/hirepilot-logo.svg"
    alt="HirePilot"
    className="brand-logo"
  />
</div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="nav-list">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activePage === label ? "active" : ""}`}
              onClick={() => {
                setActivePage(label);
                setMobileMenu(false);
              }}
            >
              <Icon size={19} />
              <span>{label}</span>
              {label === "Saved Jobs" && savedJobs.length > 0 && (
                <span className="nav-count">{savedJobs.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="pro-card">
            <div className="pro-icon"><Sparkles size={18} /></div>
            <h3>Career goals</h3>
            <p>Keep moving toward your next opportunity.</p>
            <div className="progress-track">
              <div className="progress-value" />
            </div>
            <span className="progress-caption">Job search workspace</span>
          </div>

          <button className="nav-item settings-item" onClick={() => setActivePage("Settings")}>
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="profile-row">
            <div className="avatar">RS</div>
            <div className="profile-info">
              <strong>Rahul Shastri</strong>
              <span>Job seeker</span>
            </div>
            <button className="icon-button" aria-label="Profile options">
              <Settings size={17} />
            </button>
          </div>
        </div>
      </aside>

      {mobileMenu && (
        <button
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
          aria-label="Close sidebar"
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu-button icon-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>{activePage}</strong>
          </div>
          <div className="topbar-actions">
            <div className="api-status">
              <span className="status-dot" />
              Backend connected
            </div>
            <button className="icon-button notification-button" aria-label="Notifications">
              <Bell size={19} />
            </button>
          </div>
        </header>

        <div className="page-container">
          <section className="welcome-section">
            <div>
              <div className="eyebrow"><Sparkles size={14} /> YOUR CAREER, IN ONE PLACE</div>
              <h1>{pageTitle}</h1>
              <p className="welcome-subtitle">
                Discover relevant roles, organize your search, and take the next step.
              </p>
            </div>
            <div className="welcome-date">
              <span>YOUR WORKSPACE</span>
              <strong>2026 Job Search</strong>
            </div>
          </section>

          <section className="search-panel">
            <div className="search-panel-heading">
              <div className="search-heading-icon"><Search size={18} /></div>
              <div>
                <h2>Search opportunities</h2>
                <p>Find jobs from multiple sources in one place.</p>
              </div>
            </div>

            <form className="search-form" onSubmit={searchJobs}>
              <label className="search-field">
                <span>JOB TITLE OR KEYWORD</span>
                <div className="field-input">
                  <Search size={18} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="React Developer, QA Tester..."
                  />
                </div>
              </label>

              <label className="search-field location-field">
                <span>LOCATION</span>
                <div className="field-input">
                  <MapPin size={18} />
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Noida, Delhi, Gurugram..."
                  />
                </div>
              </label>

              <button className="search-button" type="submit" disabled={loading}>
                {loading ? <RefreshCw size={18} className="spin" /> : <Search size={18} />}
                {loading ? "Searching..." : "Search jobs"}
              </button>
            </form>

            <div className="quick-searches">
              <span>Try:</span>
              {["React Developer", "MERN Stack", "QA Tester", "Frontend Intern"].map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="quick-chip"
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-icon purple"><BriefcaseBusiness size={18} /></span>
                <span className="stat-label">Jobs found</span>
              </div>
              <div className="stat-value">{jobs.length}</div>
              <div className="stat-foot">Across connected sources</div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-icon blue"><Bookmark size={18} /></span>
                <span className="stat-label">Saved jobs</span>
              </div>
              <div className="stat-value">{savedJobs.length}</div>
              <div className="stat-foot">Your shortlist</div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-icon green"><ClipboardList size={18} /></span>
                <span className="stat-label">Applications</span>
              </div>
              <div className="stat-value">0</div>
              <div className="stat-foot">Applications tracked</div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-icon orange"><Users size={18} /></span>
                <span className="stat-label">Contacts</span>
              </div>
              <div className="stat-value">—</div>
              <div className="stat-foot">Hunter API available</div>
            </div>
          </section>

          <section className="jobs-section">
            <div className="jobs-header">
              <div>
                <div className="section-title-row">
                  <h2>{activePage === "Saved Jobs" ? "Saved opportunities" : "Recommended jobs"}</h2>
                  <span className="results-badge">{filteredJobs.length} results</span>
                </div>
                <p>
                  {searched
                    ? `Results for ${query} in ${location}`
                    : "Search to discover matching opportunities"}
                </p>
              </div>

              <div className="job-controls">
                <label className="source-select">
                  <SlidersHorizontal size={16} />
                  <select
                    value={sourceFilter}
                    onChange={(event) => setSourceFilter(event.target.value)}
                  >
                    <option>All sources</option>
                    {[...new Set(jobs.map((job) => job.source).filter(Boolean))].map((source) => (
                      <option key={source}>{source}</option>
                    ))}
                  </select>
                </label>
                <label className="remote-toggle">
                  <input
                    type="checkbox"
                    checked={remoteOnly}
                    onChange={(event) => setRemoteOnly(event.target.checked)}
                  />
                  Remote
                </label>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {!searched && !loading && (
              <div className="empty-state">
                <div className="empty-icon"><Search size={28} /></div>
                <h3>Ready to find your next role?</h3>
                <p>Enter a job title and location above, then click Search jobs.</p>
                <button className="secondary-button" onClick={() => searchJobs()}>
                  Search React jobs in Noida <ArrowUpRight size={16} />
                </button>
              </div>
            )}

            {loading && (
              <div className="loading-state">
                <RefreshCw size={24} className="spin" />
                <span>Finding opportunities...</span>
              </div>
            )}

            {!loading && searched && filteredJobs.length === 0 && !error && (
              <div className="empty-state">
                <div className="empty-icon"><BriefcaseBusiness size={28} /></div>
                <h3>No matching jobs found</h3>
                <p>Try another keyword, location, or remove a filter.</p>
              </div>
            )}

            <div className="job-list">
              {!loading && filteredJobs.map((job, index) => {
                const isSaved = savedJobs.some((saved) => saved.url === job.url);

                return (
                  <article className="job-card" key={`${job.url}-${index}`}>
                    <div className="company-logo">
                      {(job.company || "C").slice(0, 1).toUpperCase()}
                    </div>

                    <div className="job-main">
                      <div className="job-title-row">
                        <h3>{job.title || "Job title unavailable"}</h3>
                        {job.remote && <span className="remote-tag">Remote</span>}
                      </div>
                      <div className="company-name">{job.company || "Company not listed"}</div>

                      <div className="job-meta">
                        <span><MapPin size={14} /> {job.location || "Location not listed"}</span>
                        <span><Clock3 size={14} /> {formatDate(job.postedAt)}</span>
                        {job.salary && <span className="salary-text">{job.salary}</span>}
                      </div>

                      <div className="job-card-bottom">
                        <span className="source-tag">{job.source || "Job board"}</span>
                        {job.api && <span className="source-origin">via {job.api}</span>}
                      </div>
                    </div>

                    <div className="job-actions">
                      <button
                        className={`save-button ${isSaved ? "saved" : ""}`}
                        onClick={() => toggleSave(job)}
                        aria-label={isSaved ? "Remove saved job" : "Save job"}
                        title={isSaved ? "Remove saved job" : "Save job"}
                      >
                        <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                      </button>
                      <a
                        className="apply-button"
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Apply <ExternalLink size={15} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <footer className="footer">
            <span>AI Job Hunter <span className="footer-dot">•</span> Career workspace</span>
            <span>Built to make your job search easier.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
