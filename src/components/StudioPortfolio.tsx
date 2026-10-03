import Image from "next/image";
import Link from "next/link";
import Certificates from "@/components/sections/Certificates";
import StudioThemeToggle from "./StudioThemeToggle";
import styles from "./StudioPortfolio.module.css";

function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}<Arrow /></a>;
}
function FieldNote({ title, children }: { title: string; children: React.ReactNode }) {
  return <details className={styles.note}>
    <summary>{title}<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></summary>
    <div className={styles.noteBody}>{children}</div>
  </details>;
}

export default function StudioPortfolio() {
  return <div className={styles.studio} id="home">
    <a className={styles.skip} href="#main">Skip to work</a>
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.identity}>
          <a className={styles.name} href="#home">Klyrhon Aurel</a>
          <p className={styles.role}>Software developer</p>
        </div>
        <p className={styles.intro}>I build web and mobile apps.<br /> Currently working on tools for personal finance, résumés, and learning to code.</p>
        <nav className={styles.nav} aria-label="Main navigation"><a href="#projects">Selected work</a><a href="#about">About me</a><a href="#contact">Get in touch</a></nav>
        <div className={styles.sidebarBottom}>
          <p>Pasig City, Philippines</p>
          <div className={styles.sidebarLinks}><Link href="/resume">Résumé<Arrow /></Link><ExternalLink href="https://github.com/KlyrhonMiko">GitHub</ExternalLink></div>
          <a href="https://creative.klyrhon.me" className={styles.creativeLink}>Creative version<Arrow /></a>
          <StudioThemeToggle />
        </div>
      </aside>
      <main id="main" className={styles.main}>
        <section id="projects" aria-labelledby="work-title">
          <header className={styles.sectionHeader}><h1 id="work-title">Selected work</h1><p>A few things I’ve built.</p></header>
          <article className={styles.project} aria-labelledby="koin-title">
            <div className={styles.projectHeader}><div className={styles.projectIdentity}><Image className={styles.appIcon} src="/projects/koin/icon.png" width={44} height={44} alt="" sizes="44px" /><div><h2 id="koin-title">Koin</h2><p>Personal finance tracker</p></div></div><ExternalLink href="https://koin.klyrhon.me">Visit project</ExternalLink></div>
            <div className={styles.koinVisual}>
              <Image className={styles.lightScreenshot} src="/projects/koin/home-light.png" width={1080} height={2400} alt="Koin home screen with balance and spending overview" sizes="(max-width: 600px) 29vw, 176px" priority />
              <Image className={styles.darkScreenshot} src="/projects/koin/home-dark.png" width={1080} height={2400} alt="Koin home screen with balance and spending overview" sizes="(max-width: 600px) 29vw, 176px" priority />
              <Image className={styles.lightScreenshot} src="/projects/koin/activity-light.png" width={1080} height={2400} alt="Koin expense history" sizes="(max-width: 600px) 29vw, 176px" priority />
              <Image className={styles.darkScreenshot} src="/projects/koin/activity-dark.png" width={1080} height={2400} alt="Koin expense history" sizes="(max-width: 600px) 29vw, 176px" priority />
              <Image className={styles.lightScreenshot} src="/projects/koin/budgets-light.png" width={1080} height={2400} alt="Koin category budgets" sizes="(max-width: 600px) 29vw, 176px" priority />
              <Image className={styles.darkScreenshot} src="/projects/koin/budgets-dark.png" width={1080} height={2400} alt="Koin category budgets" sizes="(max-width: 600px) 29vw, 176px" priority />
            </div>
            <p className={styles.description}>Expenses, budgets, and spending patterns in one app, with automated categorization and interactive analytics.</p>
            <div className={styles.projectMeta}><p>Flutter · Dart · Riverpod · SQLite · NLP · Voice recognition</p><ExternalLink href="https://github.com/KlyrhonMiko/koin">Source</ExternalLink></div>
            <FieldNote title="Build notes"><p>Flutter handles the interface, Riverpod manages application state, and SQLite provides local storage. NLP and voice recognition support expense entry.</p><p>Activity history, category budgets, and analytics connect individual transactions to the bigger picture.</p></FieldNote>
          </article>
          <article className={styles.project} aria-labelledby="pars-title">
            <div className={styles.projectHeader}><div className={styles.projectIdentity}><Image className={styles.appIcon} src="/projects/pars/icon.png" width={44} height={44} alt="" sizes="44px" /><div><h2 id="pars-title">pars.</h2><p>AI-assisted résumé builder</p></div></div><ExternalLink href="https://pars.klyrhon.me">Visit project</ExternalLink></div>
            <div className={styles.parsVisual}><Image src="/projects/pars/main-view.jpeg" width={1600} height={1000} sizes="(max-width: 800px) 95vw, 720px" alt="pars. editor with resume fields alongside a live document preview" /></div>
            <p className={styles.description}>Write your résumé alongside a live preview, then refine bullet points with AI assistance.</p>
            <div className={styles.projectMeta}><p>Next.js · TypeScript · Tailwind CSS · Groq · Supabase · React PDF</p></div>
            <FieldNote title="Build notes"><p>The live preview connects each edit to the document. Groq-powered suggestions help refine bullet points, while React PDF handles the résumé output.</p></FieldNote>
          </article>
          <article className={styles.project} aria-labelledby="nulll-title">
            <div className={styles.projectHeader}><div><h2 id="nulll-title">nulll</h2><p>Python execution visualizer</p></div><ExternalLink href="https://nulll.klyrhon.me">Visit project</ExternalLink></div>
            <div className={styles.codeVisual}>
              <pre aria-label="Python example"><code><span>numbers = [4, 2, 8, 1]</span>{'\n'}<span>for n in numbers:</span>{'\n'}<span className={styles.activeLine}>    print(n)</span></code></pre>
              <div className={styles.execution}><p>Current value: n = 2</p><div className={styles.cells}><span>4</span><span className={styles.activeCell}>2</span><span>8</span><span>1</span></div></div>
              <p className={styles.previewCaption}>Illustration of stepping through a list</p>
            </div>
            <p className={styles.description}>An in-browser Python environment for stepping through code and visualizing algorithms and data structures.</p>
            <div className={styles.projectMeta}><p>Next.js · TypeScript · Pyodide · Web Workers · D3.js · Framer Motion</p><ExternalLink href="https://github.com/KlyrhonMiko/nulll">Source</ExternalLink></div>
            <FieldNote title="Build notes"><p>Pyodide provides the Python runtime, with Web Workers for execution and D3.js for visualization. Learners can inspect execution one step at a time.</p></FieldNote>
          </article>
          <div className={styles.otherWork}><h2>Other projects</h2>
            <article className={styles.indexRow}><div><h3>Kly Skills Installer</h3><p>A guided CLI for finding and installing AI agent skills.</p><p className={styles.indexTech}>Node.js · @clack/prompts · CLI</p></div><div className={styles.indexLinks}><ExternalLink href="https://skills.klyrhon.me">Visit</ExternalLink><ExternalLink href="https://github.com/KlyrhonMiko/kly-skills">Source</ExternalLink></div></article>
            <article className={styles.indexRow}><div><h3>P.A.C.E</h3><p>Connecting Pasig City alumni with jobs and career opportunities through machine learning.</p><p className={styles.indexTech}>Next.js · Supabase · Python · FastAPI · Machine learning</p></div><ExternalLink href="https://github.com/KlyrhonMiko/pace">Source</ExternalLink></article>
          </div>
        </section>
        <section id="about" className={styles.about} aria-labelledby="about-title"><h2 id="about-title">About me</h2><p>I’m a freelance full stack developer and Information Technology student based in Pasig City. I work across web and mobile, from personal finance tools to interactive learning environments.</p>
          <div id="experience" className={styles.experience}><div><h3>Freelance Full Stack Developer</h3><p>Independent · Remote</p><span>2025 — Present</span></div><div><h3>B.S. Information Technology</h3><p>Pamantasan ng Lungsod ng Pasig</p><span>2023 — Present</span></div></div>
          <Link className={styles.resume} href="/resume">View résumé<Arrow /></Link><Certificates />
        </section>
        <section id="contact" className={styles.contact} aria-labelledby="contact-title"><h2 id="contact-title">Get in touch</h2><p>Available for freelance projects and collaboration.</p><a className={styles.email} href="mailto:aurelklyrhonmiko@gmail.com">aurelklyrhonmiko@gmail.com<Arrow /></a><div className={styles.socials}><ExternalLink href="https://github.com/KlyrhonMiko">GitHub</ExternalLink><ExternalLink href="https://www.linkedin.com/in/klyrhon/">LinkedIn</ExternalLink><ExternalLink href="https://www.facebook.com/aurelklyrhon">Facebook</ExternalLink></div></section>
        <footer className={styles.footer}><span>© {new Date().getFullYear()} Klyrhon Aurel</span><a href="#home">Back to top</a></footer>
      </main>
    </div>
  </div>;
}

