import Link from "next/link";
import StudioThemeToggle from "@/components/StudioThemeToggle";
import styles from "./resume.module.css";
export const metadata = {
  title: 'Resume | Klyrhon Miko R. Aurel',
  description: 'View the resume of Klyrhon Miko R. Aurel, a Software Engineer and AI Programmer specializing in full-stack web development with React, Next.js, Python, and Flutter.',
  openGraph: {
    title: "Resume | Klyrhon Miko R. Aurel",
    description: "View the resume of Klyrhon Miko R. Aurel, a Software Engineer and AI Programmer specializing in full-stack web development with React, Next.js, Python, and Flutter.",
    url: "/resume",
    siteName: "Klyrhon Aurel Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Klyrhon Miko R. Aurel",
    description: "View the resume of Klyrhon Miko R. Aurel, a Software Engineer and AI Programmer specializing in full-stack web development with React, Next.js, Python, and Flutter.",
  },
  alternates: {
    canonical: "/resume",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Klyrhon Miko R. Aurel",
  "jobTitle": "Software Engineer & AI Programmer",
  "url": "https://klyrhon.me",
  "email": "aurelklyrhonmiko@gmail.com",
  "telephone": "+639361090745",
  "sameAs": [
    "https://github.com/KlyrhonMiko",
    "https://www.linkedin.com/in/klyrhon/",
    "https://www.facebook.com/aurelklyrhon"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Pamantasan ng Lungsod ng Pasig"
  }
};


export default function ResumePage() {
 return <div className={styles.page}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  <a className={styles.skip} href="#resume-content">Skip to résumé</a>
  <div className={styles.layout}>
   <aside className={styles.sidebar}>
    <Link className={styles.back} href="/">Back to portfolio</Link>
    <p className={styles.sidebarName}>Klyrhon Aurel</p><p className={styles.sidebarRole}>Software developer</p>
    <a className={styles.download} href="/resume.pdf" download="Klyrhon_Miko_Aurel_Resume.pdf">Download PDF<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2v8m-3-3 3 3 3-3M3 11v3h10v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
    <StudioThemeToggle />
   </aside>
   <main id="resume-content" className={styles.document}>
    <header className={styles.heading}>
     <h1>Klyrhon Miko R. Aurel</h1><p className={styles.title}>Software Engineer &amp; AI Programmer</p>
     <div className={styles.contact}><a href="mailto:aurelklyrhonmiko@gmail.com">aurelklyrhonmiko@gmail.com</a><a href="tel:+639361090745">+63 936 109 0745</a><a href="https://klyrhon.me" target="_blank" rel="noopener noreferrer">klyrhon.me</a><a href="https://github.com/KlyrhonMiko" target="_blank" rel="noopener noreferrer">github.com/KlyrhonMiko</a></div>
    </header>
            {/* Skills */}
            <section>
              <h2>Skills</h2>

              <div>
                <p><span>Frontend:</span> React, Next.js, TypeScript, HTML, CSS, Tailwind CSS, GSAP, Framer Motion, Lenis, Three.js</p>
                <p><span>Backend:</span> Node.js, Express, FastAPI, Python</p>
                <p><span>DevOps & Tools:</span> Docker, Git</p>
                <p><span>Mobile:</span> Flutter, Dart, Riverpod</p>
                <p><span>Databases:</span> Supabase, PostgreSQL, SQLite</p>
              </div>
            </section>

            {/* Education & Certifications */}
            <section>
              <h2>Education & Certifications</h2>


              <div>
                <p><span>BS in Information Technology</span> | Pamantasan ng Lungsod ng Pasig | <em>Expected 2027</em></p>
                <p><span>Harvard CS50:</span> <a href="https://certificates.cs50.io/ef106f39-6c3f-43b2-95ba-bc4662d9207d.pdf" target="_blank" rel="noopener noreferrer">Intro to Computer Science</a> & <a href="https://cs50.harvard.edu/certificates/63025dc0-e506-4ebc-ab38-e66466d52d34" target="_blank" rel="noopener noreferrer">Artificial Intelligence</a> | <em>2026</em></p>
                <p><span>FreeCodeCamp:</span> <a href="https://www.freecodecamp.org/certification/klyrhon/responsive-web-design-v9" target="_blank" rel="noopener noreferrer">Responsive Web Design</a> & <a href="https://www.freecodecamp.org/certification/klyrhon/python-v9" target="_blank" rel="noopener noreferrer">Python Developer Certifications</a> | <em>2026</em></p>
                <p><span>Cisco Networking Academy:</span> <a href="https://www.credly.com/badges/50250e7d-dd3f-45b8-944a-0322efdd0456/public_url" target="_blank" rel="noopener noreferrer">Prompt Like an Engineer</a> | <em>2026</em></p>
                <p><span>Anthropic:</span> <a href="https://academy.claude.com/verify/83c44c290f581e8592c3004d2d411b0a" target="_blank" rel="noopener noreferrer">Code 101</a>, <a href="https://academy.claude.com/verify/7cb02c174aa6aba045a28d0b4b191976" target="_blank" rel="noopener noreferrer">Code in Action</a>, <a href="https://verify.skilljar.com/c/b95cnb4w5bda" target="_blank" rel="noopener noreferrer">Frameworks</a>, <a href="https://verify.skilljar.com/c/c45jzpz2c3y9" target="_blank" rel="noopener noreferrer">Capabilities</a>, <a href="https://verify.skilljar.com/c/2vzhg7kjzxxg" target="_blank" rel="noopener noreferrer">Agent Skills</a>, <a href="https://verify.skilljar.com/c/nsbroi9399oc" target="_blank" rel="noopener noreferrer">Subagents</a> | <em>2026</em></p>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2>Experience</h2>


              <div>
                <div>
                  <h3>Freelance</h3>
                  <span> | Full Stack Developer | 2025 - Present</span>
                </div>
                <ul>
                  <li>Built modular, responsive web apps for clients using <strong>React</strong>, <strong>Next.js</strong>, and <strong>Tailwind CSS</strong>.</li>
                  <li>Architected robust backends (<strong>Node.js</strong>, <strong>FastAPI</strong>) and optimized load times via <strong>code-splitting</strong>.</li>
                </ul>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2>Projects</h2>


              <div>
                <div>
                  <h3>Pars.</h3>
                  <span> | Live URL: <a href="https://pars.klyrhon.me" target="_blank" rel="noopener noreferrer">pars.klyrhon.me</a></span>
                </div>
                <ul>
                  <li>Built a modern ATS-friendly resume builder utilizing <strong>Next.js</strong> and <strong>TypeScript</strong>, integrating a live preview editor that dynamically renders user data using <strong>React PDF</strong> for high-fidelity document generation.</li>
                  <li>Engineered an AI-powered bullet point optimization engine leveraging <strong>Groq</strong> to provide instant, context-aware suggestions that enhance resume impact and readability.</li>
                  <li>Implemented secure authentication and real-time data persistence using <strong>Supabase</strong>, coupled with a highly responsive, minimalist user interface styled with <strong>Tailwind CSS</strong>.</li>
                </ul>
              </div>

              <div>
                <div>
                  <h3>Koin</h3>
                  <span> | Github: <a href="https://github.com/KlyrhonMiko/koin" target="_blank" rel="noopener noreferrer">github.com/KlyrhonMiko/koin</a> | Live URL: <a href="https://koin.klyrhon.me" target="_blank" rel="noopener noreferrer">koin.klyrhon.me</a></span>
                </div>
                <ul>
                  <li>Constructed an offline-first personal finance mobile application using <strong>Flutter</strong> and <strong>Dart</strong>, managing complex app state with <strong>Riverpod</strong> and ensuring reliable local data storage via <strong>SQLite</strong>.</li>
                  <li>Integrated <strong>Natural Language Processing (NLP)</strong> and <strong>voice recognition</strong> to allow users to quickly and intuitively log expenses hands-free.</li>
                  <li>Designed a modern, responsive UI utilizing <strong>Flutter Material</strong> for interactive data visualizations to give users clear, actionable insights into their financial habits.</li>
                </ul>
              </div>

              <div>
                <div>
                  <h3>Nulll</h3>
                  <span> | Github: <a href="https://github.com/KlyrhonMiko/nulll" target="_blank" rel="noopener noreferrer">github.com/KlyrhonMiko/nulll</a> | Live URL: <a href="https://nulll.klyrhon.me" target="_blank" rel="noopener noreferrer">nulll.klyrhon.me</a></span>
                </div>
                <ul>
                  <li>Formulated an interactive algorithm visualization platform and code execution sandbox using <strong>Next.js</strong> and <strong>TypeScript</strong> to make complex data structures intuitive.</li>
                  <li>Structured a client-side execution engine leveraging <strong>WebAssembly (Pyodide)</strong> in a background <strong>Web Worker</strong> to capture real-time stack frames and variable states without blocking the UI.</li>
                  <li>Integrated step-by-step visual debugging and <strong>dynamic data structure rendering</strong> using <strong>D3.js</strong> and <strong>Framer Motion</strong> with granular execution controls.</li>
                </ul>
              </div>
            </section>


    <footer className={styles.footer}><Link href="/">Back to portfolio</Link><a href="/resume.pdf" download="Klyrhon_Miko_Aurel_Resume.pdf">Download PDF</a></footer>
   </main>
  </div>
 </div>;
}
