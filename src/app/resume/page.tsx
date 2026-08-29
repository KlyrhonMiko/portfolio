import React from 'react';
import { ResumeBackButton, DynamicDomainLink, ResumeScaler } from '@/components/ui/ResumeClientLogic';
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
        <div className="w-full max-w-[794px] mx-auto mb-6 flex justify-between items-center">
          <ResumeBackButton />
          <a
            href="/resume.pdf"
            download="Klyrhon_Miko_Aurel_Resume.pdf"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2 rounded shadow-md transition-colors font-semibold text-sm sm:text-base"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            Download PDF
          </a>
        </div>

        {/* A4 Paper Container */}
        <ResumeScaler>
          <div className="w-[794px] min-h-[1123px] mx-auto bg-white p-12 shadow-lg text-[13px] leading-relaxed">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-[26px] font-bold mb-1 tracking-tight">Klyrhon Miko R. Aurel</h1>
              <p className="text-[12px]">
                aurelklyrhonmiko@gmail.com | +63936 109 0745 |{' '}
                <DynamicDomainLink path="" className="hover:underline" />{' '}
                |{' '}
                <a href="https://github.com/KlyrhonMiko" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/KlyrhonMiko</a>
              </p>
              <p className="text-[13px] mt-1 text-gray-700 font-medium">Software Engineer & AI Programmer</p>
            </div>

            {/* Skills */}
            <section className="mb-6">
              <h2 className="text-[18px] font-bold">Skills</h2>
              <hr className="border-t-[1.5px] border-black my-1" />
              <div className="space-y-1">
                <p><span className="font-bold">Frontend:</span> React, Next.js, TypeScript, HTML, CSS, Tailwind CSS, GSAP, Framer Motion, Lenis, Three.js</p>
                <p><span className="font-bold">Backend:</span> Node.js, Express, FastAPI, Python</p>
                <p><span className="font-bold">DevOps & Tools:</span> Docker, Git</p>
                <p><span className="font-bold">Mobile:</span> Flutter, Dart, Riverpod</p>
                <p><span className="font-bold">Databases:</span> Supabase, PostgreSQL, SQLite</p>
              </div>
            </section>

            {/* Education & Certifications */}
            <section className="mb-6">
              <h2 className="text-[18px] font-bold">Education & Certifications</h2>
              <hr className="border-t-[1.5px] border-black my-1" />

              <div className="mt-2 space-y-1 text-[13px]">
                <p><span className="font-bold">BS in Information Technology</span> | Pamantasan ng Lungsod ng Pasig | <em>Expected 2027</em></p>
                <p><span className="font-bold">Harvard CS50:</span> <a href="https://certificates.cs50.io/ef106f39-6c3f-43b2-95ba-bc4662d9207d.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Intro to Computer Science</a> & <a href="https://cs50.harvard.edu/certificates/63025dc0-e506-4ebc-ab38-e66466d52d34" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Artificial Intelligence</a> | <em>2026</em></p>
                <p><span className="font-bold">FreeCodeCamp:</span> <a href="https://www.freecodecamp.org/certification/klyrhon/responsive-web-design-v9" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Responsive Web Design</a> & <a href="https://www.freecodecamp.org/certification/klyrhon/python-v9" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Python Developer Certifications</a> | <em>2026</em></p>
                <p><span className="font-bold">Anthropic Claude Certifications:</span> <a href="https://verify.skilljar.com/c/wgk9ewiuyn66" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Claude 101</a>, <a href="https://verify.skilljar.com/c/i6x6r67puy7o" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Code 101</a>, <a href="https://verify.skilljar.com/c/zzv6mqrbqzj2" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Code in Action</a> | <em>2026</em></p>
                <p><span className="font-bold">Anthropic AI Fluency:</span> <a href="https://verify.skilljar.com/c/b95cnb4w5bda" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Frameworks</a>, <a href="https://verify.skilljar.com/c/c45jzpz2c3y9" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Capabilities & Limitations</a>, <a href="https://verify.skilljar.com/c/2vzhg7kjzxxg" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Agent Skills</a>, <a href="https://verify.skilljar.com/c/nsbroi9399oc" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Subagents</a> | <em>2026</em></p>
              </div>
            </section>

            {/* Experience */}
            <section className="mb-6">
              <h2 className="text-[18px] font-bold">Experience</h2>
              <hr className="border-t-[1.5px] border-black my-1" />

              <div className="mt-2">
                <div className="mb-2">
                  <h3 className="font-bold text-[15px] inline">Freelance</h3>
                  <span className="text-[13px]"> | Full Stack Developer | 2025 - Present</span>
                </div>
                <ul className="pl-6 space-y-1 list-disc">
                  <li>Built modular, responsive web apps for clients using <strong>React</strong>, <strong>Next.js</strong>, and <strong>Tailwind CSS</strong>.</li>
                  <li>Architected robust backends (<strong>Node.js</strong>, <strong>FastAPI</strong>) and optimized load times via <strong>code-splitting</strong>.</li>
                </ul>
              </div>
            </section>

            {/* Projects */}
            <section className="mb-6">
              <h2 className="text-[18px] font-bold">Projects</h2>
              <hr className="border-t-[1.5px] border-black my-1" />

              <div className="mt-2 mb-4">
                <div className="mb-2">
                  <h3 className="font-bold text-[15px] inline">Pars.</h3>
                  <span className="text-[13px]"> | Live URL: <a href="https://usepars.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">usepars.vercel.app</a></span>
                </div>
                <ul className="pl-6 space-y-1 list-disc">
                  <li>Architected a modern ATS-friendly resume builder utilizing <strong>Next.js</strong> and <strong>TypeScript</strong>, integrating a live preview editor that dynamically renders user data using <strong>React PDF</strong> for high-fidelity document generation.</li>
                  <li>Engineered an AI-powered bullet point optimization engine leveraging <strong>Groq</strong> to provide instant, context-aware suggestions that enhance resume impact and readability.</li>
                  <li>Implemented secure authentication and real-time data persistence using <strong>Supabase</strong>, coupled with a highly responsive, minimalist user interface styled with <strong>Tailwind CSS</strong>.</li>
                </ul>
              </div>

              <div className="mb-4">
                <div className="mb-2">
                  <h3 className="font-bold text-[15px] inline">Koin</h3>
                  <span className="text-[13px]"> | Github: <a href="https://github.com/KlyrhonMiko/koin" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">github.com/KlyrhonMiko/koin</a> | Live URL: <DynamicDomainLink path="/koin" className="text-blue-700 hover:underline" /></span>
                </div>
                <ul className="pl-6 space-y-1 list-disc">
                  <li>Constructed an offline-first personal finance mobile application using <strong>Flutter</strong> and <strong>Dart</strong>, managing complex app state with <strong>Riverpod</strong> and ensuring reliable local data storage via <strong>SQLite</strong>.</li>
                  <li>Integrated <strong>Natural Language Processing (NLP)</strong> and <strong>voice recognition</strong> to allow users to quickly and intuitively log expenses hands-free.</li>
                  <li>Designed a modern, responsive UI utilizing <strong>Flutter Material</strong> for interactive data visualizations to give users clear, actionable insights into their financial habits.</li>
                </ul>
              </div>

              <div className="mb-4">
                <div className="mb-2">
                  <h3 className="font-bold text-[15px] inline">Nulll</h3>
                  <span className="text-[13px]"> | Github: <a href="https://github.com/KlyrhonMiko/nulll" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">github.com/KlyrhonMiko/nulll</a> | Live URL: <DynamicDomainLink path="/nulll" className="text-blue-700 hover:underline" /></span>
                </div>
                <ul className="pl-6 space-y-1 list-disc">
                  <li>Formulated an interactive algorithm visualization platform and code execution sandbox using <strong>Next.js</strong> and <strong>TypeScript</strong> to make complex data structures intuitive.</li>
                  <li>Structured a client-side execution engine leveraging <strong>WebAssembly (Pyodide)</strong> in a background <strong>Web Worker</strong> to capture real-time stack frames and variable states without blocking the UI.</li>
                  <li>Integrated step-by-step visual debugging and <strong>dynamic data structure rendering</strong> using <strong>D3.js</strong> and <strong>Framer Motion</strong> with granular execution controls.</li>
                </ul>
              </div>
            </section>

          </div>
        </ResumeScaler>
      </div>
    </>
  );
}
