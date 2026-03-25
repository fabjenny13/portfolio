import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate sending — wire up to your backend/Formspree/EmailJS here
    await new Promise((res) => setTimeout(res, 1400));
    setStatus("sent");
  };

  const socials = [
    {
      label: "Email",
      value: "jenn10fav@email.com",
      href: "mailto:jenn10fav@email.com",
      icon: "✉",
      hint: "Fastest way to reach me",
    },
    {
      label: "GitHub",
      value: "github.com/fabjenny13",
      href: "https://github.com/fabjenny13",
      icon: "◈",
      hint: "See my code",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/jennifer-anand",
      href: "https://linkedin.com/in/jennifer-anand-256022334",
      icon: "⊹",
      hint: "Let's connect",
    },
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

        /* NAV */
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

        /* PAGE */
        .page {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 140px 48px 80px;
        }

        /* ANIMATIONS */
        .anim {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .anim.show { opacity: 1; transform: translateY(0); }
        .anim-d1 { transition-delay: 0.1s; }
        .anim-d2 { transition-delay: 0.25s; }
        .anim-d3 { transition-delay: 0.4s; }

        /* HEADER */
        .page-header { margin-bottom: 72px; }
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
          font-size: 0.88rem; line-height: 1.8; color: var(--muted); max-width: 480px;
        }

        /* LAYOUT */
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 48px;
          align-items: start;
        }

        /* SOCIALS COLUMN */
        .socials-col { display: flex; flex-direction: column; gap: 12px; }

        .section-label {
          font-size: 0.68rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 8px;
        }

        .social-card {
          display: flex; align-items: center; gap: 16px;
          padding: 20px 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 3px;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          position: relative; overflow: hidden;
        }
        .social-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(200,240,117,0.04), transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .social-card:hover::before { opacity: 1; }
        .social-card:hover {
          border-color: rgba(200,240,117,0.25);
          background: #15151f;
          transform: translateX(4px);
        }

        .social-icon {
          width: 36px; height: 36px; border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; color: var(--accent2);
          background: rgba(123,110,246,0.08);
          border: 1px solid rgba(123,110,246,0.2);
          flex-shrink: 0;
        }
        .social-info { flex: 1; min-width: 0; }
        .social-label {
          font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 3px;
        }
        .social-value {
          font-size: 0.78rem; color: var(--text);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .social-hint {
          font-size: 0.62rem; letter-spacing: 0.08em;
          color: var(--muted); margin-top: 2px;
        }
        .social-arrow {
          font-size: 0.75rem; color: var(--accent);
          opacity: 0; transform: translateX(-4px);
          transition: opacity 0.2s, transform 0.2s;
        }
        .social-card:hover .social-arrow { opacity: 1; transform: translateX(0); }

        /* AVAILABILITY */
        .availability {
          margin-top: 28px;
          padding: 18px 20px;
          border: 1px solid rgba(200,240,117,0.2);
          border-radius: 3px;
          background: rgba(200,240,117,0.04);
          display: flex; align-items: center; gap: 12px;
        }
        .avail-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent); flex-shrink: 0;
          box-shadow: 0 0 8px rgba(200,240,117,0.6);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        .avail-text {
          font-size: 0.75rem; line-height: 1.6; color: var(--muted);
        }
        .avail-text strong { color: var(--accent); font-weight: 500; }

        /* FORM */
        .form-col {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        .form-header {
          padding: 24px 28px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
        }
        .form-title {
          font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--muted);
        }
        .form-dots { display: flex; gap: 6px; }
        .form-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--border);
        }
        .form-dot:nth-child(1) { background: #ff5f57; }
        .form-dot:nth-child(2) { background: #febc2e; }
        .form-dot:nth-child(3) { background: #28c840; }

        .form-body { padding: 28px; display: flex; flex-direction: column; gap: 18px; }

        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }

        .field { display: flex; flex-direction: column; gap: 8px; }
        .field-label {
          font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--muted); transition: color 0.2s;
        }
        .field.focused .field-label { color: var(--accent); }

        .field-input, .field-textarea {
          font-family: var(--font-mono); font-size: 0.82rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 2px;
          color: var(--text);
          padding: 12px 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          width: 100%;
        }
        .field-input::placeholder, .field-textarea::placeholder { color: var(--muted); }
        .field-input:focus, .field-textarea:focus {
          border-color: rgba(200,240,117,0.4);
          background: rgba(200,240,117,0.03);
        }
        .field-textarea { resize: vertical; min-height: 130px; line-height: 1.7; }

        .form-footer {
          padding: 0 28px 28px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
        }
        .form-note {
          font-size: 0.68rem; letter-spacing: 0.08em; color: var(--muted); line-height: 1.6;
        }

        .btn-submit {
          font-family: var(--font-mono); font-size: 0.78rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 13px 28px;
          background: var(--accent); color: var(--bg);
          border: none; border-radius: 2px;
          cursor: pointer; font-weight: 500; flex-shrink: 0;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          position: relative; overflow: hidden;
        }
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200,240,117,0.2);
        }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* SENT STATE */
        .sent-state {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 60px 28px; text-align: center; gap: 16px;
        }
        .sent-icon {
          font-size: 2.5rem; color: var(--accent);
          animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .sent-title {
          font-family: var(--font-display); font-size: 1.8rem; color: var(--text);
        }
        .sent-body { font-size: 0.82rem; color: var(--muted); line-height: 1.7; max-width: 320px; }
        .btn-ghost {
          font-family: var(--font-mono); font-size: 0.75rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 11px 24px; background: transparent;
          color: var(--muted); border: 1px solid var(--border);
          border-radius: 2px; cursor: pointer;
          transition: color 0.2s, border-color 0.2s; margin-top: 8px;
        }
        .btn-ghost:hover { color: var(--text); border-color: var(--muted); }

        /* FOOTER */
        footer {
          position: relative; z-index: 1;
          border-top: 1px solid var(--border);
          padding: 28px 48px;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 0.72rem; letter-spacing: 0.08em; color: var(--muted);
          max-width: 1100px; margin: 0 auto;
        }

        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr; }
          .field-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          nav { padding: 16px 24px; }
          .page { padding: 120px 24px 60px; }
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
          <li className="nav-link" onClick={() => navigate("/projects")}>
            Projects
          </li>
          <li className="nav-link active">Contact</li>
        </ul>
      </nav>

      <div className="page">
        <header className={`page-header anim ${visible ? "show" : ""}`}>
          <p className="page-eyebrow">// Contact</p>
          <h1 className="page-title">
            Let's
            <br />
            <em>talk.</em>
          </h1>
          <p className="page-subtitle">
            Whether it's an opportunity, a collaboration, or just a hello — my
            inbox is open.
          </p>
        </header>

        <div className="contact-layout">
          {/* LEFT — socials + availability */}
          <div className={`anim anim-d1 ${visible ? "show" : ""}`}>
            <p className="section-label">// Reach me at</p>
            <div className="socials-col">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="social-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="social-icon">{s.icon}</div>
                  <div className="social-info">
                    <div className="social-label">{s.label}</div>
                    <div className="social-value">{s.value}</div>
                    <div className="social-hint">{s.hint}</div>
                  </div>
                  <span className="social-arrow">→</span>
                </a>
              ))}
            </div>

            <div className="availability">
              <div className="avail-dot" />
              <p className="avail-text">
                <strong>Available for opportunities.</strong> Open to
                internships, freelance projects, and full-time roles.
              </p>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className={`form-col anim anim-d2 ${visible ? "show" : ""}`}>
            {status === "sent" ? (
              <div className="sent-state">
                <div className="sent-icon">✓</div>
                <h2 className="sent-title">Message sent!</h2>
                <p className="sent-body">
                  Thanks for reaching out. I'll read your message and get back
                  to you shortly.
                </p>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                <div className="form-header">
                  <span className="form-title">// New message</span>
                  <div className="form-dots">
                    <div className="form-dot" />
                    <div className="form-dot" />
                    <div className="form-dot" />
                  </div>
                </div>

                <div className="form-body">
                  <div className="field-row">
                    <div
                      className={`field ${focused === "name" ? "focused" : ""}`}
                    >
                      <label className="field-label">Name</label>
                      <input
                        className="field-input"
                        name="name"
                        value={form.name}
                        placeholder="Your name"
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div
                      className={`field ${focused === "email" ? "focused" : ""}`}
                    >
                      <label className="field-label">Email</label>
                      <input
                        className="field-input"
                        name="email"
                        type="email"
                        value={form.email}
                        placeholder="your@email.com"
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>

                  <div
                    className={`field ${focused === "subject" ? "focused" : ""}`}
                  >
                    <label className="field-label">Subject</label>
                    <input
                      className="field-input"
                      name="subject"
                      value={form.subject}
                      placeholder="What's this about?"
                      onChange={handleChange}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <div
                    className={`field ${focused === "message" ? "focused" : ""}`}
                  >
                    <label className="field-label">Message</label>
                    <textarea
                      className="field-textarea"
                      name="message"
                      value={form.message}
                      placeholder="Tell me what's on your mind..."
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                <div className="form-footer">
                  <p className="form-note">
                    I typically respond
                    <br />
                    within 1–2 days.
                  </p>
                  <button
                    className="btn-submit"
                    disabled={
                      status === "sending" ||
                      !form.name ||
                      !form.email ||
                      !form.message
                    }
                    onClick={handleSubmit}
                  >
                    {status === "sending" ? "Sending..." : "Send Message →"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <footer>
        <span>Jennifer — Portfolio {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
