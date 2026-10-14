"use client";

import { useEffect, useState } from "react";
import styles from "./StudioPortfolio.module.css";

const sections = [
  { id: "projects", label: "Selected work" },
  { id: "about", label: "About me" },
  { id: "contact", label: "Get in touch" },
];

export default function StudioNav() {
  const [active, setActive] = useState("projects");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.35;
        let current = "projects";
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element && element.getBoundingClientRect().top <= threshold) current = section.id;
        }
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = "contact";
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <nav className={styles.nav} aria-label="Main navigation">{sections.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>)}</nav>;
}
