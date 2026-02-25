"use client";
import { useState } from "react";
import styles from "./PricingModal.module.css";

export default function PricingModal({ onClose }) {
  const [loading, setLoading] = useState(null);

  const handleCheckout = async (plan) => {
    setLoading(plan);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(null);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>

        <div className={styles.badge}>Upgrade HustleSpark</div>
        <h2 className={styles.title}>Find your perfect plan</h2>
        <p className={styles.sub}>Start free, upgrade when you're ready to hustle harder.</p>

        <div className={styles.plans}>
          <div className={styles.plan}>
            <div className={styles.planName}>Starter</div>
            <div className={styles.planPrice}>$4<span>.99</span></div>
            <div className={styles.planPer}>one-time</div>
            <ul className={styles.planFeatures}>
              <li>✓ 10 AI generations</li>
              <li>✓ All hustle categories</li>
              <li>✓ Export ideas</li>
            </ul>
            <button
              className={styles.planBtn}
              onClick={() => handleCheckout("starter")}
              disabled={!!loading}
            >
              {loading === "starter" ? "Redirecting..." : "Get Starter"}
            </button>
          </div>

          <div className={`${styles.plan} ${styles.planFeatured}`}>
            <div className={styles.planBadge}>Most Popular</div>
            <div className={styles.planName}>Pro</div>
            <div className={styles.planPrice}>$9<span>.99</span></div>
            <div className={styles.planPer}>one-time</div>
            <ul className={styles.planFeatures}>
              <li>✓ Unlimited generations</li>
              <li>✓ All hustle categories</li>
              <li>✓ Export ideas</li>
              <li>✓ Priority support</li>
            </ul>
            <button
              className={`${styles.planBtn} ${styles.planBtnFeatured}`}
              onClick={() => handleCheckout("pro")}
              disabled={!!loading}
            >
              {loading === "pro" ? "Redirecting..." : "Get Pro"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
