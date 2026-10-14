"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./StudioPortfolio.module.css";

const screens = [
  { id: "activity", label: "Activity", alt: "Koin expense history" },
  { id: "home", label: "Overview", alt: "Koin balance and spending overview" },
  { id: "budgets", label: "Budgets", alt: "Koin category budgets" },
];

export function KoinShowcase() {
  const [selected, setSelected] = useState("home");

  return <div>
    <div className={styles.koinVisual} id="koin-screens">
      {screens.map((screen) => <figure key={screen.id} className={styles.phone} data-screen={screen.id} data-selected={selected === screen.id}>
        <Image className={styles.lightScreenshot} src={`/projects/koin/${screen.id}-light.png`} width={1080} height={2400} alt={screen.alt} sizes="(max-width: 600px) 230px, 210px" priority={screen.id === "home"} />
        <Image className={styles.darkScreenshot} src={`/projects/koin/${screen.id}-dark.png`} width={1080} height={2400} alt={screen.alt} sizes="(max-width: 600px) 230px, 210px" priority={screen.id === "home"} />
        <figcaption>{screen.label}</figcaption>
      </figure>)}
    </div>
    <div className={styles.screenControls} role="group" aria-label="Koin screens">
      {[screens[1], screens[0], screens[2]].map((screen) => <button key={screen.id} type="button" aria-pressed={selected === screen.id} aria-controls="koin-screens" onClick={() => setSelected(screen.id)}>{screen.label}</button>)}
    </div>
  </div>;
}

const numbers = [4, 2, 8, 1];

export function CodeShowcase() {
  const [step, setStep] = useState(0);
  const complete = step === numbers.length * 2;
  const index = Math.floor(step / 2);
  const current = complete ? null : numbers[index];
  const output = numbers.slice(0, index);

  return <div className={styles.codeVisual}>
    <div>
      <pre aria-label="Python example"><code><span className={styles.codeMuted}>numbers = </span><span>[4, 2, 8, 1]</span>{"\n"}<span className={!complete && step % 2 === 0 ? styles.activeLine : styles.codeMuted}>for n in numbers:</span>{"\n"}<span className={!complete && step % 2 === 1 ? styles.activeLine : styles.codeMuted}>{"    print(n)"}</span></code></pre>
      <p className={styles.previewCaption}>A small example. One step at a time.</p>
    </div>
    <div className={styles.execution}>
      <p aria-live="polite" aria-atomic="true">{complete ? "Loop complete" : `${step % 2 === 0 ? "Current value" : "Ready to print"}: n = ${current}`}</p>
      <div className={styles.cells} aria-label="List values">{numbers.map((value, cell) => <span key={cell} className={!complete && cell === index ? styles.activeCell : undefined}>{value}</span>)}</div>
      <div className={styles.codeOutput}><span>Output</span><samp aria-label={`Printed output: ${output.join(", ") || "none yet"}`}>{output.length ? output.join("  ") : "—"}</samp></div>
    </div>
    <div className={styles.demoFooter}>
      <span>Interactive illustration</span>
      <button type="button" className={styles.stepButton} onClick={() => setStep(complete ? 0 : step + 1)}>
        {complete ? "Run again" : "Step through"}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  </div>;
}
