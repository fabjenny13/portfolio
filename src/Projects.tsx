import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Category = "games" | "websites" | "other";
type Status = "complete" | "in-dev";

interface Project {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  status: Status;
  icon: string;
  category?: Category;
}

const ALL_PROJECTS: Record<Category, Project[]> = {
  games: [
    {
      id: "g1",
      title: "Pokémon Battle Engine",
      desc: "A 2D turn-based battle system inspired by Pokémon. Features move selection, HP tracking, and battle logic built from scratch.",
      tags: ["2D", "Turn-Based", "Battle System"],
      status: "complete",
      icon: "⚔",
    },
    {
      id: "g2",
      title: "3D Obstacle Course",
      desc: "A 3D obstacle course game — navigate through platforms, dodge hazards, and reach the finish line.",
      tags: ["3D", "Platformer", "Physics"],
      status: "complete",
      icon: "◈",
    },
    {
      id: "g3",
      title: "Minesweeper",
      desc: "Classic Minesweeper reimplemented in Python with a Tkinter GUI. Custom grid sizes and mine counts.",
      tags: ["Python", "Tkinter", "Puzzle"],
      status: "complete",
      icon: "⊞",
    },
    {
      id: "g4",
      title: "Top-Down Story Game",
      desc: "A gentle top-down RPG set on a lush, green world. Talk to characters, complete small tasks, and explore.",
      tags: ["2D", "Top-Down", "Narrative"],
      status: "complete",
      icon: "◉",
    },
    {
      id: "g5",
      title: "Chicken Boss Brawler",
      desc: "Collect armor and power-ups scattered across the map, then face off against a surprisingly dangerous chicken boss.",
      tags: ["2D", "Top-Down", "Action"],
      status: "complete",
      icon: "⚡",
    },
    {
      id: "g6",
      title: "2D Platformer",
      desc: "A side-scrolling 2D platformer with level design, movement mechanics, and obstacle challenges.",
      tags: ["2D", "Platformer"],
      status: "complete",
      icon: "▲",
    },
    {
      id: "g7",
      title: "Space Rocket Dodge",
      desc: "Pilot a rocket through endless space debris. Fast-paced, reflex-driven, and infinitely replayable.",
      tags: ["2D", "Space", "Endless"],
      status: "complete",
      icon: "⊹",
    },
    {
      id: "g8",
      title: "City Builder: Life Mode",
      desc: "Build and maintain a city whose health is directly tied to your real-life wellness habits. Complete health tasks to keep your city thriving.",
      tags: ["City Builder", "Wellness", "Simulation"],
      status: "in-dev",
      icon: "⌗",
    },
  ],
  websites: [
    {
      id: "w1",
      title: "Responsive Form Builder",
      desc: "Contributed to a drag-and-drop form builder with live preview, custom field types, and full responsiveness.",
      tags: ["Collaboration", "UI", "Web App"],
      status: "complete",
      icon: "☐",
    },
    {
      id: "w2",
      title: "Digital Circuit Simulator",
      desc: "Helped develop an interactive logic gate simulator — place components, wire them up, and watch the circuit evaluate in real time.",
      tags: ["Collaboration", "Simulation", "Education"],
      status: "complete",
      icon: "⊛",
    },
    {
      id: "w3",
      title: "Arcade Hub",
      desc: "A mini-games portal bringing multiple browser-based games under one roof with a unified UI and leaderboard.",
      tags: ["Games", "Frontend", "Web App"],
      status: "complete",
      icon: "◎",
    },
    {
      id: "w4",
      title: "In-Browser Navigator",
      desc: "A website that emulates a browser experience — navigate between internal pages and open external URLs via a built-in search bar.",
      tags: ["Collaboration", "Browser", "Navigation"],
      status: "complete",
      icon: "⌬",
    },
    {
      id: "w5",
      title: "Cryptic Hunt App",
      desc: "Contributed to a mobile-first treasure hunt app where players solve clues to progress through real-world locations.",
      tags: ["Collaboration", "Mobile", "App"],
      status: "complete",
      icon: "◈",
    },
  ],
  other: [
    {
      id: "o1",
      title: "Weather Forecast LSTM",
      desc: "A deep learning model using Long Short-Term Memory networks to predict weather patterns from historical time-series data.",
      tags: ["Python", "LSTM", "ML", "Time Series"],
      status: "complete",
      icon: "⋈",
    },
    {
      id: "o2",
      title: "Indian Vehicle Classifier",
      desc: "A computer vision model trained to classify Indian vehicle types from images — covering bikes, autos, trucks, and more.",
      tags: ["Python", "CV", "Deep Learning", "AI"],
      status: "complete",
      icon: "◫",
    },
  ],
};

type FilterKey = "all" | Category;

interface FilterCategory {
  key: FilterKey;
  label: string;
}

const CATEGORIES: FilterCategory[] = [
  { key: "all", label: "All" },
  { key: "games", label: "Games" },
  { key: "websites", label: "Websites & Apps" },
  { key: "other", label: "Other" },
];

export default function Projects() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<FilterKey>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filtered: Project[] =
    activeCategory === "all"
      ? (Object.entries(ALL_PROJECTS) as [Category, Project[]][]).flatMap(
          ([cat, items]) => items.map((p) => ({ ...p, category: cat })),
        )
      : (ALL_PROJECTS[activeCategory] ?? []).map((p) => ({
          ...p,
          category: activeCategory,
        }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0a0a0f;
          --surface: #12121a;
          --border: #2a2a3a;
          --accent: #c8f075;
          --accent2: #7b6ef6;
          --text: #e8e8f0;
          --muted: #6b6b80;
          --font-display: 'DM Serif Display', serif;
          --font-mono: 'DM Mono', monospace;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-mono);
          min-height: 100vh;
          overflow-x: hidden;
        }

        .noise {
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0;
        }

        .grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(200,240,117,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,240,117,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none; z-index: 0;
        }

        .glow-orb {
          position: fixed; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(123,110,246,0.1) 0%, transparent 70%);
          top: -100px; right: -100px; pointer-events: none; z-index: 0;
        }
        .glow-orb-2 {
          position: fixed; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(200,240,117,0.06) 0%, transparent 70%);
          bottom: 100px; left: -50px; pointer-events: none; z-index: 0;
        }

        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 48px;
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(12px);
          background: rgba(10,10,15,0.7);
        }
        .nav-logo {
          font-family: var(--font-display); font-size: 1.2rem;
          color: var(--accent); letter-spacing: 0.02em; cursor: pointer;
        }
        .nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
        .nav-link {
          font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--muted); cursor: pointer; transition: color 0.2s; position: relative;
        }
        .nav-link:hover, .nav-link.active { color: var(--text); }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 1px; background: var(--accent); transition: width 0.3s;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .page {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 140px 48px 80px;
        }

        .page-header { margin-bottom: 64px; }
        .page-eyebrow {
          font-size: 0.72rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 16px;
        }
        .page-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 1; margin-bottom: 20px;
        }
        .page-title em { font-style: italic; color: var(--accent2); }
        .page-subtitle {
          font-size: 0.88rem; line-height: 1.8; color: var(--muted); max-width: 500px;
        }

        .filter-row {
          display: flex; gap: 0; margin-bottom: 56px;
          border: 1px solid var(--border); border-radius: 3px;
          overflow: hidden; width: fit-content;
        }
        .filter-btn {
          font-family: var(--font-mono); font-size: 0.72rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 10px 22px; background: transparent;
          color: var(--muted); border: none;
          border-right: 1px solid var(--border);
          cursor: pointer; transition: background 0.2s, color 0.2s;
        }
        .filter-btn:last-child { border-right: none; }
        .filter-btn:hover { color: var(--text); background: rgba(255,255,255,0.03); }
        .filter-btn.active {
          background: rgba(200,240,117,0.08);
          color: var(--accent);
        }

        .count-line {
          font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 32px;
        }
        .count-line span { color: var(--accent); }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        .project-card {
          background: var(--surface);
          padding: 32px 28px;
          cursor: pointer;
          position: relative;
          display: flex; flex-direction: column; gap: 16px;
          overflow: hidden;
        }
        .project-card:hover::before { opacity: 1; }
        .project-card:hover { background: #15151f; }

        .card-top {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
        }
        .card-icon {
          font-size: 1.5rem; color: var(--accent2); line-height: 1;
          flex-shrink: 0; width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(123,110,246,0.2);
          border-radius: 2px;
          background: rgba(123,110,246,0.06);
        }
        .card-badges { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }

        .badge-cat {
          font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 2px;
          border: 1px solid rgba(200,240,117,0.2);
          color: var(--accent); background: rgba(200,240,117,0.05);
        }
        .badge-dev {
          font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 2px;
          border: 1px solid rgba(123,110,246,0.3);
          color: var(--accent2); background: rgba(123,110,246,0.08);
        }

        .card-title {
          font-family: var(--font-display);
          font-size: 1.25rem; line-height: 1.2; color: var(--text);
        }
        .card-desc {
          font-size: 0.8rem; line-height: 1.75; color: var(--muted); flex: 1;
        }
        .card-tags {
          display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto;
        }
        .card-tag {
          font-size: 0.64rem; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 10px; border: 1px solid var(--border);
          color: var(--muted); border-radius: 2px;
          background: rgba(255,255,255,0.01);
        }

        .card-arrow {
          position: absolute; bottom: 24px; right: 24px;
          font-size: 0.75rem; color: var(--accent); opacity: 0;
          transform: translateX(-6px); transition: opacity 0.2s, transform 0.2s;
        }
        .project-card:hover .card-arrow { opacity: 1; transform: translateX(0); }

        footer {
          position: relative; z-index: 1;
          border-top: 1px solid var(--border);
          padding: 28px 48px;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 0.72rem; letter-spacing: 0.08em; color: var(--muted);
          max-width: 1100px; margin: 0 auto;
        }

        /* ANIMATIONS */
        .anim {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .anim.show { opacity: 1; transform: translateY(0); }
        .anim-d1 { transition-delay: 0.1s; }
        .anim-d2 { transition-delay: 0.2s; }
        .anim-d3 { transition-delay: 0.35s; }
        .anim-d4 { transition-delay: 0.5s; }

        /* card stagger via inline style */
        .project-card {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.2s;
        }
        .project-card.show { opacity: 1; transform: translateY(0); }
        .project-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(200,240,117,0.04), transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }

        @media (max-width: 768px) {
          nav { padding: 16px 24px; }
          .page { padding: 120px 24px 60px; }
          .filter-row { flex-wrap: wrap; width: 100%; }
          .filter-btn { flex: 1; }
          footer { padding: 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <div className="noise" />
      <div className="grid-bg" />
      <div className="glow-orb" />
      <div className="glow-orb-2" />

      <nav>
        <span className="nav-logo" onClick={() => navigate("/")}>
          Portfolio
        </span>
        <ul className="nav-links">
          <li className="nav-link" onClick={() => navigate("/")}>
            About
          </li>
          <li className="nav-link active">Projects</li>
          <li className="nav-link">Contact</li>
        </ul>
      </nav>

      <div className="page">
        <header className={`page-header anim ${visible ? "show" : ""}`}>
          <p className="page-eyebrow">// Work</p>
          <h1 className="page-title">
            Things I've
            <br />
            <em>built.</em>
          </h1>
          <p className="page-subtitle">
            A mix of games, web apps, and ML experiments — each one a chance to
            learn something new and ship something real.
          </p>
        </header>

        <div className={`filter-row anim anim-d1 ${visible ? "show" : ""}`}>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`filter-btn ${activeCategory === c.key ? "active" : ""}`}
              onClick={() => setActiveCategory(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className={`count-line anim anim-d2 ${visible ? "show" : ""}`}>
          Showing <span>{filtered.length}</span> project
          {filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="projects-grid">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`project-card ${visible ? "show" : ""}`}
              style={{
                transitionDelay: visible ? `${0.45 + i * 0.06}s` : "0s",
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="card-top">
                <div className="card-icon">{project.icon}</div>
                <div className="card-badges">
                  <span className="badge-cat">{project.category}</span>
                  {project.status === "in-dev" && (
                    <span className="badge-dev">In Dev</span>
                  )}
                </div>
              </div>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-desc">{project.desc}</p>
              <div className="card-tags">
                {project.tags.map((t) => (
                  <span key={t} className="card-tag">
                    {t}
                  </span>
                ))}
              </div>
              <span className="card-arrow">→</span>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <span>Jennifer — Portfolio {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
