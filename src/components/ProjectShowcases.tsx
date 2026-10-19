"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./StudioPortfolio.module.css";

const screens = [
  { id: "home", label: "Overview", detail: "Balances, accounts, and what’s coming up.", alt: "Koin balance and spending overview" },
  { id: "activity", label: "Activity", detail: "See where your money goes, week by week.", alt: "Koin spending activity and weekly chart" },
  { id: "budgets", label: "Budgets", detail: "Set a limit. Keep each category in view.", alt: "Koin monthly category budgets" },
];

export function KoinShowcase() {
  const [selected, setSelected] = useState("home");

  return <div className={styles.koinShowcase}>
    <div className={styles.koinIndex}>
      <h3>Your money,<br /> in view.</h3>
      <div className={styles.koinControls} role="group" aria-label="Choose a Koin screen">
        {screens.map((screen) => <button key={screen.id} type="button" aria-pressed={selected === screen.id} aria-controls="koin-screens" onClick={() => setSelected(screen.id)}>
          <span>{screen.label}</span>
          <span className={styles.screenDetail}>{screen.detail}</span>
        </button>)}
      </div>
      <p className={styles.koinFootnote}>Stored on your device.<br />Available offline.</p>
    </div>
    <div className={styles.koinStage} id="koin-screens">
      {screens.map((screen) => <figure key={screen.id} className={styles.koinScreen} hidden={selected !== screen.id}>
        <Image className={styles.lightScreenshot} src={`/projects/koin/${screen.id}-light.png`} width={1080} height={2400} alt={screen.alt} sizes="(max-width: 500px) 220px, 240px" />
        <Image className={styles.darkScreenshot} src={`/projects/koin/${screen.id}-dark.png`} width={1080} height={2400} alt={screen.alt} sizes="(max-width: 500px) 220px, 240px" />
      </figure>)}
    </div>
  </div>;
}

const parsViews = [
  { id: "editor", label: "Editor", src: "main-view.jpeg", alt: "The pars. editor with personal details beside the live résumé preview", caption: "Edit your experience. See the page take shape." },
  { id: "review", label: "Résumé review", src: "resume-grading.jpeg", alt: "The pars. résumé review with feedback on impact and clarity", caption: "Review feedback on impact, clarity, and wording." },
];

export function ParsShowcase() {
  const [selected, setSelected] = useState("editor");
  const view = parsViews.find((item) => item.id === selected)!;

  return <div className={styles.parsShowcase}>
    <div className={styles.parsToolbar}>
      <div className={styles.parsControls} role="group" aria-label="Choose a pars. preview">
        {parsViews.map((item) => <button key={item.id} type="button" aria-pressed={selected === item.id} aria-controls="pars-preview" onClick={() => setSelected(item.id)}>{item.label}</button>)}
      </div>
      <a href={`/projects/pars/${view.src}`} target="_blank" rel="noopener noreferrer">Full size <span aria-hidden="true">↗</span></a>
    </div>
    <figure className={styles.parsPreview} id="pars-preview">
      <div className={styles.parsImageViewport} tabIndex={0} role="region" aria-label="Product screenshot. Scroll horizontally on small screens to explore.">
      <a className={styles.parsImageLink} href={`/projects/pars/${view.src}`} target="_blank" rel="noopener noreferrer" aria-label={`View full-size pars. ${view.label} screenshot`}>
        <Image key={view.id} src={`/projects/pars/${view.src}`} width={1763} height={860} alt={view.alt} sizes="(max-width: 800px) 100vw, 720px" />
      </a>
      </div>
      <figcaption aria-live="polite">{view.caption}</figcaption>
    </figure>
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
