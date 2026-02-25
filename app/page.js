"use client";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HustleForm from "@/components/HustleForm";
import Results from "@/components/Results";
import PricingModal from "@/components/PricingModal";
import styles from "./page.module.css";

export default function Home() {
  const { data: session } = useSession();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) setSuccess(true);
  }, []);

  const handleSubmit = async (interests) => {
    if (!session) {
      signIn("google");
      return;
    }
    setLoading(true);
    setError("");
    setIdeas([]);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests }),
      });
      if (res.status === 401) { signIn("google"); return; }
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setIdeas(data.ideas || []);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      {success && (
        <div className={styles.successBanner}>
          🎉 Payment successful! You're on HustleSpark Pro.
        </div>
      )}

      <Header session={session} onUpgrade={() => setShowPricing(true)} />

      <section className={styles.hero}>
        <div className={styles.badge}>AI-Powered · For Teens · Start Today</div>
        <h1 className={styles.title}>
          Turn Your <span className={styles.accent}>Passion</span>
          <br />Into Profit
        </h1>
        <p className={styles.subtitle}>
          Tell us what you love. We'll find your hustle.
        </p>
      </section>

      <HustleForm onSubmit={handleSubmit} loading={loading} session={session} />

      {error && <p className={styles.error}>{error}</p>}

      {ideas.length > 0 && (
        <Results ideas={ideas} onUpgrade={() => setShowPricing(true)} />
      )}

      {!session && (
        <section className={styles.cta}>
          <p>Sign in with Google to generate your hustle ideas — it's free.</p>
          <button className={styles.ctaBtn} onClick={() => signIn("google")}>
            Get Started Free →
          </button>
        </section>
      )}

      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
    </main>
  );
}
