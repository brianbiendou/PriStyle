"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { label: "Accueil", href: "#" },
  { label: "Collections", href: "#collections" },
  { label: "Femme", href: "#femme" },
  { label: "Homme", href: "#homme" },
  { label: "Mariage", href: "#mariage" },
  { label: "À propos", href: "#apropos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setHeroVisible(window.scrollY < window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${
          heroVisible && !scrolled ? styles.heroVisible : ""
        }`}
        id="navbar"
      >
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo} id="nav-logo">
            <Image
              src={scrolled ? "/images/logos/logotextonly.png" : "/images/logos/logoclaire.png"}
              alt="Sublime Wax"
              width={120}
              height={45}
              className={styles.logoImage}
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </Link>

          <div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.navLink}
                onClick={closeMenu}
                id={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/33XXXXXXXXXX"
              className={`btn btn-primary ${styles.navCta}`}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-contact-btn"
            >
              Nous contacter
            </a>
          </div>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={toggleMenu}
            aria-label="Menu de navigation"
            id="nav-hamburger"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div
        className={`${styles.overlay} ${menuOpen ? styles.show : ""}`}
        onClick={closeMenu}
      />
    </>
  );
}
