import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const projectCategories = [
    { label: "Websites", path: "/projects/websites", icon: "⌗" },
    { label: "Games", path: "/projects/games", icon: "◈" },
    { label: "Other", path: "/projects/other", icon: "◎" },
  ];

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
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(200, 240, 117, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 240, 117, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .glow-orb {
          position: fixed;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(123,110,246,0.12) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          pointer-events: none;
          z-index: 0;
        }

        .glow-orb-2 {
          position: fixed;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,240,117,0.07) 0%, transparent 70%);
          bottom: 0;
          left: 100px;
          pointer-events: none;
          z-index: 0;
        }

        /* NAV */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(12px);
          background: rgba(10,10,15,0.7);
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.2rem;
          color: var(--accent);
          letter-spacing: 0.02em;
          cursor: pointer;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
        }

        .nav-link {
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          cursor: pointer;
          transition: color 0.2s;
          position: relative;
        }
        .nav-link:hover { color: var(--text); }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        /* PROJECTS DROPDOWN */
        .projects-nav {
          position: relative;
        }

        .projects-dropdown {
          position: absolute;
          top: calc(100% + 16px);
          right: 0;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
          min-width: 180px;
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .projects-dropdown.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          border-bottom: 1px solid var(--border);
        }
        .dropdown-item:last-child { border-bottom: none; }
        .dropdown-item:hover {
          background: rgba(200,240,117,0.06);
          color: var(--accent);
        }

        .dropdown-icon {
          font-size: 1rem;
          color: var(--accent2);
        }

        /* HERO */
        .hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 48px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .hero-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .hero-eyebrow.show { opacity: 1; transform: translateY(0); }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(4rem, 8vw, 8rem);
          line-height: 0.95;
          color: var(--text);
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s;
        }
        .hero-name.show { opacity: 1; transform: translateY(0); }

        .hero-name em {
          font-style: italic;
          color: var(--accent2);
        }

        .hero-desc {
          font-size: 0.9rem;
          line-height: 1.8;
          color: var(--muted);
          max-width: 520px;
          margin-bottom: 52px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }
        .hero-desc.show { opacity: 1; transform: translateY(0); }

        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 52px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.45s, transform 0.8s ease 0.45s;
        }
        .hero-tags.show { opacity: 1; transform: translateY(0); }

        .tag {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border: 1px solid var(--border);
          border-radius: 2px;
          color: var(--muted);
          background: rgba(255,255,255,0.02);
        }
        .tag.accent {
          border-color: rgba(200,240,117,0.3);
          color: var(--accent);
          background: rgba(200,240,117,0.05);
        }
        .tag.accent2 {
          border-color: rgba(123,110,246,0.3);
          color: var(--accent2);
          background: rgba(123,110,246,0.05);
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          align-items: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
        }
        .hero-cta.show { opacity: 1; transform: translateY(0); }

        .btn-primary {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 14px 28px;
          background: var(--accent);
          color: var(--bg);
          border: none;
          border-radius: 2px;
          cursor: pointer;
          font-weight: 500;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200,240,117,0.2);
        }

        .btn-ghost {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 14px 28px;
          background: transparent;
          color: var(--muted);
          border: 1px solid var(--border);
          border-radius: 2px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .btn-ghost:hover {
          color: var(--text);
          border-color: var(--muted);
        }

        /* SCROLL INDICATOR */
        .scroll-hint {
          position: absolute;
          bottom: 36px;
          left: 48px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          opacity: 0;
          transition: opacity 0.8s ease 1s;
        }
        .scroll-hint.show { opacity: 1; }

        .scroll-line {
          width: 40px;
          height: 1px;
          background: var(--border);
          position: relative;
          overflow: hidden;
        }
        .scroll-line::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: var(--accent);
          animation: scan 2s ease-in-out infinite;
        }
        @keyframes scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        /* ABOUT STRIP */
        .about-strip {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--border);
          padding: 80px 48px;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .section-label {
          font-size: 0.68rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 20px;
        }

        .about-heading {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .about-body {
          font-size: 0.85rem;
          line-height: 1.9;
          color: var(--muted);
        }

        .stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        .stat-cell {
          background: var(--surface);
          padding: 28px 24px;
        }

        .stat-num {
          font-family: var(--font-display);
          font-size: 2.5rem;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* FOOTER LINE */
        footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--border);
          padding: 28px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: var(--muted);
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          nav { padding: 16px 24px; }
          .hero { padding: 0 24px; }
          .hero-name { font-size: 3.5rem; }
          .about-strip { grid-template-columns: 1fr; gap: 40px; padding: 60px 24px; }
          footer { padding: 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <div className="noise" />
      <div className="grid-bg" />
      <div className="glow-orb" />
      <div className="glow-orb-2" />

      {/* NAV */}
      <nav>
        <span className="nav-logo">Portfolio</span>
        <ul className="nav-links">
          <li className="nav-link">About</li>
          <li
            className={`nav-link projects-nav`}
            onClick={() => setProjectsOpen((o) => !o)}
          >
            Projects ↓
            <div className={`projects-dropdown ${projectsOpen ? "open" : ""}`}>
              {projectCategories.map((c) => (
                <div
                  key={c.path}
                  className="dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(c.path);
                    setProjectsOpen(false);
                  }}
                >
                  <span className="dropdown-icon">{c.icon}</span>
                  {c.label}
                </div>
              ))}
            </div>
          </li>
          <li className="nav-link">Contact</li>
        </ul>
      </nav>

      {/* HERO */}
      <main>
        <section className="hero">
          <p className={`hero-eyebrow ${visible ? "show" : ""}`}>
            Available for opportunities
          </p>
          <h1 className={`hero-name ${visible ? "show" : ""}`}>
            Jennifer.
            <br />
            <em>Engineer</em>
            <br />
            &amp; Creator.
          </h1>
          <p className={`hero-desc ${visible ? "show" : ""}`}>
            Aspiring software engineer with a passion for building things — from
            polished web experiences to handcrafted game worlds. I write code
            that works and worlds that breathe.
          </p>
          <div className={`hero-tags ${visible ? "show" : ""}`}>
            <span className="tag accent">Software Engineering</span>
            <span className="tag accent2">Game Development</span>
            <span className="tag">UI / UX</span>
            <span className="tag">React</span>
            <span className="tag">TypeScript</span>
          </div>
          <div className={`hero-cta ${visible ? "show" : ""}`}>
            <button
              className="btn-primary"
              onClick={() => setProjectsOpen(true)}
            >
              View Projects
            </button>
            <button className="btn-ghost">Get in Touch</button>
          </div>
        </section>

        {/* ABOUT STRIP */}
        <section className="about-strip">
          <div>
            <p className="section-label">// About Me</p>
            <h2 className="about-heading">
              Code by day,
              <br />
              games by night.
            </h2>
            <p className="about-body">
              I'm Jennifer — a software engineer in the making who loves turning
              ideas into real, tangible things. Whether it's a clean web app or
              an indie game built from scratch, I'm happiest when I'm creating.
              Game dev isn't just a hobby; it's where I sharpen my
              problem-solving instincts and experiment freely.
            </p>
          </div>
          <div className="stat-grid">
            <div className="stat-cell">
              <div className="stat-num">∞</div>
              <div className="stat-label">Lines of code written</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">3+</div>
              <div className="stat-label">Project categories</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">01</div>
              <div className="stat-label">Aspiring engineer</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">♟</div>
              <div className="stat-label">Game dev hobbyist</div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>Jennifer — Portfolio {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
