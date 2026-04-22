"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./EnfantSection.module.css";

function shuffleAndPick(arr, count) {
  // Exclure les fausses paires (front == back = image unique)
  const valid = arr.filter(p => p.front !== p.back);
  const pool = valid.length >= count ? valid : arr;
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

export default function EnfantGrid({ allPairs }) {
  const [pairs, setPairs] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [tapped, setTapped] = useState({});

  useEffect(() => {
    setPairs(shuffleAndPick(allPairs, 4));
  }, [allPairs]);

  function handleTap(i) {
    setTapped(prev => ({ ...prev, [i]: !prev[i] }));
  }

  if (pairs.length === 0) return null;

  return (
    <div className={styles.grid}>
      {pairs.map((pair, i) => {
        const showBack = hovered === i || tapped[i];
        return (
          <div
            key={i}
            className={styles.card}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleTap(i)}
            role="button"
            aria-label="Voir l'autre angle"
          >
            {/* Image de base (face avant) */}
            <Image
              src={pair.front}
              alt="Tenue enfant wax"
              fill
              className={`${styles.cardImage} ${showBack ? styles.cardImageHidden : ""}`}
              sizes="(max-width: 600px) 90vw, 350px"
            />
            {/* Image de face arrière — apparaît au hover */}
            <Image
              src={pair.back}
              alt="Tenue enfant wax — autre angle"
              fill
              className={`${styles.cardImage} ${styles.cardImageBack} ${showBack ? styles.cardImageBackVisible : ""}`}
              sizes="(max-width: 600px) 90vw, 350px"
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardHint}>
              <span>{showBack ? "← Retour" : "Voir l\u2019autre angle →"}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
