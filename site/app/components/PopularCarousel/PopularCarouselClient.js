"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./PopularCarousel.module.css";

// Fisher-Yates shuffle
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function PopularCarouselClient({ items }) {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray(items);
    // Dupliquer pour la boucle infinie seamless
    setCarouselItems([...shuffled, ...shuffled]);
  }, [items]);

  if (carouselItems.length === 0) return null;

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselTrack}>
        {carouselItems.map((item, index) => (
          <div key={`${item.filename}-${index}`} className={styles.carouselItem}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.src}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 250px, 350px"
                className={styles.image}
                style={{ objectFit: "cover" }}
              />
              <div className={styles.overlay}>
                <a
                  href="https://wa.me/33XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaBtn}
                >
                  ✦ Commander sur mesure
                </a>
              </div>
            </div>
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
