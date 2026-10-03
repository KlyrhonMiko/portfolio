import styles from "@/components/StudioPortfolio.module.css";
type Certificate = {
    title: string;
    issuer: string;
    date: string;
    link: string;
    description?: string;
    image?: string;
    target?: string;
};
const certificates: Certificate[] = [
    {
        title: "CS50x: Intro to Computer Science and the Art of Programming",
        issuer: "Harvard University",
        date: "2026",
        link: "https://certificates.cs50.io/ef106f39-6c3f-43b2-95ba-bc4662d9207d",
        image: "/certificates/cs50x.png",
        description: "A comprehensive introduction to the intellectual enterprises of computer science and the art of programming, covering C, Python, SQL, and web fundamentals."
    },
    {
        title: "CS50: Intro to Artificial Intelligence with Python",
        issuer: "Harvard University",
        date: "2026",
        link: "https://cs50.harvard.edu/certificates/63025dc0-e506-4ebc-ab38-e66466d52d34",
        image: "/certificates/cs50ai.png",
        description: "Explored fundamental concepts of artificial intelligence, including graph search algorithms, machine learning, and natural language processing using Python."
    },
    {
        title: "Responsive Web Design Developer Certification",
        issuer: "freeCodeCamp",
        date: "2026",
        link: "https://www.freecodecamp.org/certification/klyrhon/responsive-web-design-v9",
        image: "/certificates/responsive-web-design.png",
        description: "Mastered the foundations of modern web design, including HTML5, CSS3, Flexbox, CSS Grid, and responsive layout techniques."
    },
    {
        title: "Python Developer Certification",
        issuer: "freeCodeCamp",
        date: "2026",
        link: "https://www.freecodecamp.org/certification/klyrhon/python-v9",
        image: "/certificates/python-developer.png",
        description: "Developed proficiency in Python programming, covering data structures, object-oriented principles, and application development."
    },
    {
        title: "Prompt Like an Engineer",
        issuer: "Cisco Networking Academy",
        date: "2026",
        link: "https://www.credly.com/badges/50250e7d-dd3f-45b8-944a-0322efdd0456/public_url",
        image: "/certificates/prompt-engineering.png",
        description: "Gained expertise in advanced prompt engineering techniques, understanding how to effectively communicate with large language models to solve complex problems."
    },
    {
        title: "Claude 101",
        issuer: "Anthropic",
        date: "2026",
        link: "https://academy.claude.com/verify/6a704a07c0e2fe8aae12ac9c6140d1d8",
        image: "/certificates/claude-101.png",
        description: "Foundational certification covering Anthropic's Claude AI models, their capabilities, and ethical AI principles."
    },
    {
        title: "Claude Code 101",
        issuer: "Anthropic",
        date: "2026",
        link: "https://academy.claude.com/verify/83c44c290f581e8592c3004d2d411b0a",
        image: "/certificates/claude-code-101.png",
        description: "Learned the essentials of leveraging Claude for software development, code generation, and debugging."
    },
    {
        title: "Claude Code in Action",
        issuer: "Anthropic",
        date: "2026",
        link: "https://academy.claude.com/verify/7cb02c174aa6aba045a28d0b4b191976",
        image: "/certificates/claude-code-in-action.png",
        description: "Applied advanced techniques for using Claude in real-world coding scenarios, improving development workflows and productivity."
    },
    {
        title: "AI Fluency: Framework & Foundations",
        issuer: "Anthropic",
        date: "2026",
        link: "https://verify.skilljar.com/c/b95cnb4w5bda",
        image: "/certificates/ai-fluency-framework.png",
        description: "Explored the fundamental architecture, frameworks, and foundational concepts underlying modern generative AI systems."
    },
    {
        title: "Introduction to agent skills",
        issuer: "Anthropic",
        date: "2026",
        link: "https://verify.skilljar.com/c/2vzhg7kjzxxg",
        image: "/certificates/intro-to-agent-skills.png",
        description: "Learned the principles of designing and equipping AI agents with specialized skills to autonomously execute complex workflows."
    },
    {
        title: "Introduction to subagents",
        issuer: "Anthropic",
        date: "2026",
        link: "https://verify.skilljar.com/c/nsbroi9399oc",
        image: "/certificates/intro-to-subagents.png",
        description: "Mastered the concept of delegating tasks to specialized subagents for hierarchical problem-solving and efficient AI operations."
    },
    {
        title: "AI Fluency: Ai Capabilities & Limitations",
        issuer: "Anthropic",
        date: "2026",
        link: "https://verify.skilljar.com/c/c45jzpz2c3y9",
        image: "/certificates/ai-fluency-capabilities.png",
        description: "Gained a deep understanding of what current AI models can achieve, alongside their technical limitations and safety considerations."
    }
];
export default function Certificates() {
    return <section id="certificates" className={styles.credentials} aria-labelledby="certificates-title">
    <h3 id="certificates-title">Certificates <span>({certificates.length})</span></h3>
    <ul className={styles.credentialList}>{certificates.map(certificate => <li key={certificate.link}>
      <a href={certificate.link} target="_blank" rel="noopener noreferrer">{certificate.title} ↗</a>
      <small>{certificate.issuer} · {certificate.date}</small>
    </li>)}</ul>
  </section>;
}

