"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { label: "Accueil", href: "#" },
  { label: "Collections", href: "#collections" },
  { label: "Femme", href: "/femme" },
  { label: "Homme", href: "/homme" },
  { label: "Mariage", href: "/mariage" },
  { label: "À propos", href: "#apropos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Sur les pages de collection, la navbar est TOUJOURS opaque
  const [scrolled, setScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      setHeroVisible(false);
      return;
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setHeroVisible(window.scrollY < window.innerHeight * 0.7);
    };
    handleScroll(); // vérifier au montage
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

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
              src={scrolled ? "/images/logos/logotextonly.png" : "/images/logos/logoimagetexte.png"}
              alt="Sublime Wax"
              width={256}
              height={96}
              className={styles.logoImage}
              style={{ width: "auto" }}
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
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour, je souhaite vous contacter pour une création PriStyle')}`}
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
