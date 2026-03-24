import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Project = {
  title: string;
  desc: string;
  tags: string[];
  type: "GAME" | "WEB" | "ML" | "APP";
  wip?: boolean;
};

export default function ProjectPage() {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const projects: Project[] = [
    {
      title: "Pokémon Battle",
      desc: "2D turn-based battle system inspired by classic Pokémon combat.",
      tags: ["2D", "Turn-based"],
      type: "GAME",
    },
    {
      title: "3D Obstacle Course",
      desc: "Navigate through a 3D world filled with obstacles.",
      tags: ["3D", "Platformer"],
      type: "GAME",
    },
    {
      title: "Minesweeper",
      desc: "Classic Minesweeper built with Python and Tkinter.",
      tags: ["Python", "Tkinter"],
      type: "GAME",
    },
    {
      title: "Story RPG",
      desc: "Top-down RPG with NPC interactions and quests.",
      tags: ["2D", "Top-down", "RPG"],
      type: "GAME",
    },
    {
      title: "Chicken Boss",
      desc: "Collect items and fight a chaotic chicken boss.",
      tags: ["2D", "Combat"],
      type: "GAME",
    },
    {
      title: "2D Platformer",
      desc: "Classic side-scrolling platformer.",
      tags: ["2D", "Platformer"],
      type: "GAME",
    },
    {
      title: "Space Dodger",
      desc: "Dodge incoming obstacles in deep space.",
      tags: ["2D", "Arcade"],
      type: "GAME",
    },
    {
      title: "Health City Builder",
      desc: "City grows based on real-life health habits.",
      tags: ["Simulation"],
      type: "GAME",
      wip: true,
    },

    {
      title: "Form Builder",
      desc: "Drag-and-drop responsive form builder.",
      tags: ["React", "Responsive"],
      type: "WEB",
    },
    {
      title: "Circuit Simulator",
      desc: "Interactive digital circuit simulator.",
      tags: ["Simulation"],
      type: "WEB",
    },
    {
      title: "Arcade Hub",
      desc: "Mini-games website with playable games.",
      tags: ["Web", "Games"],
      type: "WEB",
    },
    {
      title: "Browser-in-a-Browser",
      desc: "Navigate pages inside a web app.",
      tags: ["Web", "Meta"],
      type: "WEB",
    },
    {
      title: "Cryptic Hunt",
      desc: "Treasure hunt app with real-world navigation.",
      tags: ["App", "Geolocation"],
      type: "APP",
    },

    {
      title: "Weather Forecast Model",
      desc: "LSTM-based forecasting model.",
      tags: ["Python", "LSTM"],
      type: "ML",
    },
    {
      title: "Indian Vehicle Classifier",
      desc: "Computer vision classification model.",
      tags: ["CV"],
      type: "ML",
    },
  ];

  const filters = ["ALL", "GAME", "WEB", "APP", "ML"];

  const filtered =
    filter === "ALL" ? projects : projects.filter((p) => p.type === filter);
  const navigate = useNavigate();
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



        .top-bar {
  margin-bottom: 32px;
}

.back-btn {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 8px 14px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  color: var(--text);
  border-color: var(--muted);
  transform: translateX(-2px);
}
        .projects {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 120px 48px 80px;
        }

        /* HEADER */
        .projects-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 1;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease;
        }
        .projects-title.show {
          opacity: 1;
          transform: translateY(0);
        }

        .projects-stats {
          display: flex;
          gap: 40px;
          margin-bottom: 40px;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* FILTERS (reuse nav style logic) */
        .filters {
          display: flex;
          gap: 12px;
          margin-bottom: 48px;
        }

        .filter-btn {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 8px 16px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          color: var(--text);
          border-color: var(--muted);
            transform: translateY(-1px);

        }

        .filter-btn.active {
  border-color: var(--accent);
  color: var(--bg);
  background: var(--accent);
}




        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
        /* CARD */
        .card {
        position: relative;
          padding: 28px;
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--surface);
          transition: all 0.25s ease;

            opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.5s ease forwards;

        }

        .card:hover {
  background: rgba(255,255,255,0.04);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

        .card-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .badge {
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 10px;
          border: 1px solid var(--border);
          color: var(--muted);
        }

        .badge.wip {
          color: var(--accent);
          border-color: rgba(200,240,117,0.4);
          background: rgba(200,240,117,0.05);
        }

        .card-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 10px;
  transition: color 0.2s;
}

.card:hover .card-title {
  color: var(--accent);
}

.card:nth-child(4n) {
  background: linear-gradient(
    135deg,
    rgba(123,110,246,0.06),
    rgba(18,18,26,1)
  );
}

.card:nth-child(4n+1) {
  background: linear-gradient(
    135deg,
    rgba(200,240,117,0.05),
    rgba(18,18,26,1)
  );
}

        .card-desc {
          font-size: 0.82rem;
          font-family: var(--font-mono);
          line-height: 1.8;
          color: var(--muted);
          margin-bottom: 16px;
        }

        /* TAGS (reuse your tag style) */
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          font-size: 0.7rem;
          font-family: var(--font-mono);
          letter-spacing: 0.12em;
          padding: 5px 10px;
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--muted);
          background: rgba(255,255,255,0.02);
        }

        




        /* MOBILE */
        @media (max-width: 768px) {
          .projects {
            padding: 100px 24px;
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main className="projects">
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
        <h1 className={`projects-title ${visible ? "show" : ""}`}>
          Things I've built.
        </h1>

        <div className="filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid">
          {filtered.map((p, i) => (
            <div
              key={i}
              className="card"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="card-top">
                <span className="badge">{p.type}</span>
                {p.wip && <span className="badge wip">WIP</span>}
              </div>

              <div className="card-title">{p.title}</div>
              <div className="card-desc">{p.desc}</div>

              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
