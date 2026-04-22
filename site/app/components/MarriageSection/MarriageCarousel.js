"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./MarriageSection.module.css";

// Fisher-Yates shuffle + pick N
function shuffleAndPick(arr, count) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

const WA_NUMBER = "33644814218";

function buildWaLink(imageSrc) {
  const msg = `Bonjour, je suis intéressé(e) par ce modèle de robe : ${imageSrc}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function MarriageCarousel({ allImages }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const picked = shuffleAndPick(allImages, 50);
    // Dupliquer pour boucle infinie seamless
    setItems([...picked, ...picked]);
  }, [allImages]);

  if (items.length === 0) {
    return <div className={styles.carouselOuter} style={{ minHeight: "360px" }} />;
  }

  return (
    <div className={styles.carouselOuter}>
      <div className={styles.carouselTrack}>
        {items.map((img, i) => (
          <div key={i} className={styles.marriageCard}>
            <Image
              src={img.src}
              alt={`Tenue de mariage ${(i % (items.length / 2)) + 1}`}
              fill
              className={styles.marriageImage}
              sizes="300px"
            />
            <div className={styles.marriageOverlay} />
            {img.isBestSeller && (
              <span className={styles.goldBadge}>Best-seller</span>
            )}
            <a
              href={buildWaLink(img.src)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.marriageCta}
              onClick={(e) => e.stopPropagation()}
            >
              ✦ Commander sur mesure
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
