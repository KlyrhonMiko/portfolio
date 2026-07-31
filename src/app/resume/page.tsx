import React from 'react';
import { ResumeBackButton } from '@/components/ResumeClientLogic';

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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
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
            <a href="https://klyrhon.tech" target="_blank" rel="noopener noreferrer" className="hover:underline">klyrhon.tech</a>{' '}
            |{' '}
            <a href="https://github.com/KlyrhonMiko" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/KlyrhonMiko</a>
          </p>
        </div>

        <div className="mb-6">
          <p>
            I'm an aspiring software engineer with a passion for creating elegant, user-friendly web applications. 
            With a strong foundation in both frontend and backend technologies, I bring ideas to life through clean code 
            and thoughtful design.
          </p>
        </div>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-[20px] font-bold">Skills</h2>
          <hr className="border-t-[1.5px] border-black my-1" />
          <div className="space-y-1">
            <p><span className="font-bold">Frontend:</span> React, Next.js, TypeScript, HTML, CSS, Tailwind CSS</p>
            <p><span className="font-bold">Backend:</span> Node.js, Express, FastAPI</p>
            <p><span className="font-bold">DevOps & Tools:</span> Docker, Git</p>
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
              <li>Built modular UI components using React and Tailwind CSS</li>
              <li>Optimized page load times through code-splitting and lazy loading</li>
              <li>Built enterprise grade systems for companie</li>
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-[20px] font-bold">Projects</h2>
          <hr className="border-t-[1.5px] border-black my-1" />
          
          <div className="mt-2 mb-4">
            <h3 className="font-bold text-[16px]">P.A.C.E (Pasig Alumni Career & Employability)</h3>
            <div className="text-[15px] mb-2">
              Github: <a href="https://github.com/KlyrhonMiko/pace" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">https://github.com/KlyrhonMiko/pace</a>
            </div>
            <ul className="pl-6 space-y-1" style={{ listStyleType: 'circle' }}>
              <li>Developed a comprehensive career platform to connect alumni with highly curated employment opportunities.</li>
              <li>Engineered a dashboard providing institutions with actionable insights and real-time analytics on alumni employability.</li>
              <li>Implemented robust data tracking and visualization to monitor graduate career trajectories and optimize institutional reporting.</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-[16px]">Koin</h3>
            <div className="text-[15px] mb-2">
              Github: <a href="https://github.com/KlyrhonMiko/koin" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">https://github.com/KlyrhonMiko/koin</a>
            </div>
            <ul className="pl-6 space-y-1" style={{ listStyleType: 'circle' }}>
              <li>Developed an offline-first personal finance mobile application using Flutter, enabling seamless multi-account management and reliable local data storage.</li>
              <li>Integrated Natural Language Processing (NLP) and voice recognition to allow users to quickly and intuitively log expenses hands-free.</li>
              <li>Designed a modern, responsive UI featuring interactive data visualizations to give users clear, actionable insights into their financial habits.</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-[20px] font-bold">Education</h2>
          <hr className="border-t-[1.5px] border-black my-1" />
          
          <div className="mt-2">
            <h3 className="font-bold text-[16px]">Pamantasan ng Lungsod ng Pasig</h3>
            <p>Bachelor of Science in Information Technology</p>
            <p className="text-[14px]">2023 - Present • Pasig City, Philippines</p>
          </div>
        </section>
        
      </div>
    </div>
    </>
  );
}
