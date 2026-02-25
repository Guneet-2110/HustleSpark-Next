"use client";
import styles from "./Results.module.css";

const ICONS = ["🎯", "💡", "🚀"];

export default function Results({ ideas, onUpgrade }) {
  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Your Hustle Ideas</h2>
        <button className={styles.upgradeLink} onClick={onUpgrade}>
          Get unlimited ideas ✦
        </button>
      </div>

      <div className={styles.grid}>
        {ideas.map((idea, i) => {
          const clean = idea.replace(/^\d+\.\s*/, "");
          const colonIdx = clean.indexOf(":");
          const title = colonIdx > -1 ? clean.slice(0, colonIdx).trim() : `Idea ${i + 1}`;
          const desc = colonIdx > -1 ? clean.slice(colonIdx + 1).trim() : clean;

          return (
            <div className={styles.card} key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.cardIcon}>{ICONS[i] || "⚡"}</div>
              <div className={styles.cardNumber}>0{i + 1}</div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
