import {
  Github,
  Linkedin,
  Facebook,
  Heart,
  ArrowUp,
  Mail,
  MapPin,
  Code2,
} from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/KlyrhonMiko", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/klyrhon/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/aurelklyrhon", label: "Facebook" },
];

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border-light bg-surface-elevated/50">
      {/* Animated gradient top line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Subtle animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-20 top-1/2 h-[250px] w-[250px] -translate-y-1/2 opacity-12"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary-light), var(--color-accent-teal))",
            animation:
              "blob 16s ease-in-out infinite, float-2 24s ease-in-out infinite",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -right-16 top-1/2 h-[220px] w-[220px] -translate-y-1/2 opacity-10"
          style={{
            background:
              "linear-gradient(200deg, var(--color-accent), var(--color-primary))",
            animation:
              "blob 13s ease-in-out infinite reverse, float-3 20s ease-in-out infinite reverse",
            borderRadius: "50% 60% 40% 70% / 40% 70% 50% 60%",
            filter: "blur(45px)",
          }}
        />
      </div>

      {/* Main footer content */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area — 3 columns */}
        <div className="grid gap-8 sm:gap-10 border-b border-border-light/60 py-10 sm:py-14 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-1">
            <a
              href="#home"
              className="mb-4 inline-flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-heading"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/25">
                <Code2 size={18} />
              </div>
              <span className="text-gradient-animated">&lt;Klyrhon /&gt;</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Building scalable web applications with modern technologies.
              Passionate about clean code, great UX, and continuous learning.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border-light bg-surface text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20"
                >
                  <social.icon
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links column */}
          <div className="md:col-span-1">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-heading">
              Quick Links
            </h4>
            <nav>
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-primary"
                    >
                      <span className="h-px w-3 bg-border-light transition-all duration-300 group-hover:w-5 group-hover:bg-primary" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact info column */}
          <div className="md:col-span-1">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-heading">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:aurelklyrhonmiko@gmail.com"
                  className="group flex items-center gap-3 text-sm text-muted transition-colors duration-300 hover:text-primary"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light/60 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/20">
                    <Mail size={14} />
                  </div>
                  <span className="truncate">aurelklyrhonmiko@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light/60 text-primary">
                  <MapPin size={14} />
                </div>
                <span>Pasig City, Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 py-5 sm:flex-row sm:py-6">
          <a
            href="#home"
            className="group inline-flex items-center gap-2 rounded-full border border-border-light bg-surface px-4 py-2 text-xs font-medium text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md hover:shadow-primary/10"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
