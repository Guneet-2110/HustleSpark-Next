"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./HustleForm.module.css";

const EXAMPLES = ["gaming & streaming", "art & design", "fitness & sports", "coding & tech", "fashion & style"];

export default function HustleForm({ onSubmit, loading, session }) {
  const [interests, setInterests] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!interests.trim()) return;
    onSubmit(interests);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>What are you into?</label>
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. design, pets, tech"
            required
            disabled={loading}
          />
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              "Generate →"
            )}
          </button>
        </div>
      </form>

      <div className={styles.examples}>
        <span className={styles.examplesLabel}>Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            className={styles.chip}
            onClick={() => setInterests(ex)}
            type="button"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
