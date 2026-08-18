import React from 'react';
import { ResumeBackButton, DynamicDomainLink } from '@/components/ui/ResumeClientLogic';
import { Download } from 'lucide-react';

export const metadata = {
  title: 'Resume | Klyrhon Miko R. Aurel',
  description: 'View and download the resume of Klyrhon Miko R. Aurel.',
};

export default function ResumePage() {
  return (
    <>
      <div className="min-h-screen bg-gray-200 py-8 px-4 sm:px-8 font-sans text-black">
        {/* Top Actions Area */}
        <div className="max-w-[21cm] mx-auto mb-6 flex justify-between items-center">
          <ResumeBackButton />
          <a
            href="/resume.pdf"
            download="Klyrhon_Miko_Aurel_Resume.pdf"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow-md transition-colors font-semibold"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </a>
        </div>

        {/* A4 Paper Container */}
        <div className="max-w-[21cm] mx-auto bg-white p-10 sm:p-14 shadow-lg text-[15px] leading-relaxed">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-[28px] font-bold mb-1 tracking-tight">Klyrhon Miko R. Aurel</h1>
            <p className="text-[14px]">
              aurelklyrhonmiko@gmail.com | +63936 109 0745 |{' '}
              <DynamicDomainLink path="" className="hover:underline" />{' '}
              |{' '}
              <a href="https://github.com/KlyrhonMiko" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/KlyrhonMiko</a>
            </p>
            <p className="text-[15px] mt-1 text-gray-700 font-medium">Software Engineer & AI Programmer</p>
          </div>

          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-[20px] font-bold">Skills</h2>
            <hr className="border-t-[1.5px] border-black my-1" />
            <div className="space-y-1">
              <p><span className="font-bold">Frontend:</span> React, Next.js, TypeScript, HTML, CSS, Tailwind CSS, GSAP, Framer Motion, Lenis, Three.js</p>
              <p><span className="font-bold">Backend:</span> Node.js, Express, FastAPI, Python</p>
              <p><span className="font-bold">DevOps & Tools:</span> Docker, Git</p>
              <p><span className="font-bold">Mobile:</span> Flutter, Dart, Riverpod</p>
              <p><span className="font-bold">Databases:</span> Supabase, PostgreSQL, SQLite</p>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-[20px] font-bold">Experience</h2>
            <hr className="border-t-[1.5px] border-black my-1" />

            <div className="mt-2">
              <h3 className="font-bold text-[16px]">Freelance</h3>
              <div className="flex justify-between text-[15px] mb-2">
                <span>Full Stack Developer</span>
                <span>2025 - Present</span>
              </div>
              <ul className="pl-6 space-y-1" style={{ listStyleType: 'circle' }}>
                <li>Built modular, responsive web apps for clients using <strong>React</strong>, <strong>Next.js</strong>, and <strong>Tailwind CSS</strong>.</li>
                <li>Architected robust backends (<strong>Node.js</strong>, <strong>FastAPI</strong>) and optimized load times via <strong>code-splitting</strong>.</li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-6">
            <h2 className="text-[20px] font-bold">Projects</h2>
            <hr className="border-t-[1.5px] border-black my-1" />

            <div className="mt-2 mb-4">
              <div className="mb-2">
                <h3 className="font-bold text-[16px] inline">P.A.C.E (Pasig Alumni Career & Employability)</h3>
                <span className="text-[15px]"> | Github: <a href="https://github.com/KlyrhonMiko/pace" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">github.com/KlyrhonMiko/pace</a></span>
              </div>
              <ul className="pl-6 space-y-1" style={{ listStyleType: 'circle' }}>
                <li>Spearheaded a comprehensive career platform using <strong>Next.js</strong> and <strong>Supabase</strong>, integrating external <strong>job market APIs</strong> to connect alumni with highly curated, localized employment opportunities.</li>
                <li>Programmed a real-time analytics dashboard using <strong>Python</strong> and <strong>FastAPI</strong>, leveraging <strong>machine learning algorithms</strong> to predict graduate career outcomes and give actionable insights.</li>
                <li>Established robust <strong>relational data tracking</strong> and <strong>dynamic visualization</strong>, enabling the monitoring of graduate career trajectories and optimizing institutional reporting.</li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="mb-2">
                <h3 className="font-bold text-[16px] inline">Koin</h3>
                <span className="text-[15px]"> | Github: <a href="https://github.com/KlyrhonMiko/koin" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">github.com/KlyrhonMiko/koin</a> | Live URL: <DynamicDomainLink path="/koin" className="text-blue-700 hover:underline" /></span>
              </div>
              <ul className="pl-6 space-y-1" style={{ listStyleType: 'circle' }}>
                <li>Constructed an offline-first personal finance mobile application using <strong>Flutter</strong> and <strong>Dart</strong>, managing complex app state with <strong>Riverpod</strong> and ensuring reliable local data storage via <strong>SQLite</strong>.</li>
                <li>Integrated <strong>Natural Language Processing (NLP)</strong> and <strong>voice recognition</strong> to allow users to quickly and intuitively log expenses hands-free.</li>
                <li>Designed a modern, responsive UI utilizing <strong>Flutter Material</strong> for interactive data visualizations to give users clear, actionable insights into their financial habits.</li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="mb-2">
                <h3 className="font-bold text-[16px] inline">Nulll</h3>
                <span className="text-[15px]"> | Github: <a href="https://github.com/KlyrhonMiko/nulll" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">github.com/KlyrhonMiko/nulll</a> | Live URL: <DynamicDomainLink path="/nulll" className="text-blue-700 hover:underline" /></span>
              </div>
              <ul className="pl-6 space-y-1" style={{ listStyleType: 'circle' }}>
                <li>Formulated an interactive algorithm visualization platform and code execution sandbox using <strong>Next.js</strong> and <strong>TypeScript</strong> to make complex data structures intuitive.</li>
                <li>Structured a client-side execution engine leveraging <strong>WebAssembly (Pyodide)</strong> in a background <strong>Web Worker</strong> to capture real-time stack frames and variable states without blocking the UI.</li>
                <li>Integrated step-by-step visual debugging and <strong>dynamic data structure rendering</strong> using <strong>D3.js</strong> and <strong>Framer Motion</strong> with granular execution controls.</li>
              </ul>
            </div>
          </section>

          {/* Education & Certifications */}
          <section className="mb-6">
            <h2 className="text-[20px] font-bold">Education & Certifications</h2>
            <hr className="border-t-[1.5px] border-black my-1" />

            <div className="mt-2 space-y-1 text-[15px]">
              <p><span className="font-bold">BS in Information Technology</span> | Pamantasan ng Lungsod ng Pasig | <em>Expected 2027</em></p>
              <p><span className="font-bold">Harvard CS50x:</span> Intro to Computer Science | <em>2026</em></p>
              <p><span className="font-bold">Anthropic Academy:</span> Claude & AI Fluency Suite (Agent Skills, Frameworks, Capabilities & Limitations) | <em>2026</em></p>
            </div>
          </section>


        </div>
      </div>
    </>
  );
}
