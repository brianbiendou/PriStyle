"""
Scraper Afro-Elegance.com
-------------------------
Récupère toutes les images des vêtements (homme / femme) organisées par catégorie
et sous-catégorie, puis les optimise pour le web (WebP, max 1200 px de large).

On exclut : bijoux, décoration, accessoires, chaussures, sacs.

Site = Shopify -> on utilise l'endpoint public /collections/<handle>/products.json
"""

from __future__ import annotations

import io
import json
import re
import time
import unicodedata
from pathlib import Path
from typing import Iterable

import requests
import urllib3
from PIL import Image

# Certains environnements (proxy d'entreprise, antivirus) injectent un certificat
# auto-signé. On tente d'abord une requête normale, puis en fallback on désactive
# la vérification SSL pour ne pas bloquer le scraping.
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
SSL_VERIFY = False  # mis à False car l'environnement présente un certificat d'entreprise

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

BASE_URL = "https://afro-elegance.com"

# Catégorie principale -> { sous-catégorie: handle-de-collection-Shopify }
CATEGORIES: dict[str, dict[str, str]] = {
    "homme": {
        "boubou": "boubou-africain-homme",
        "ensemble": "ensemble-africain-homme",
        "chemise": "chemise-africaine-homme",
        "t-shirt-dashiki": "t-shirt-africain",
    },
    "femme": {
        "boubou": "boubou-africain-femme",
        "robe": "robe-africaine-femme",
        "pantalon": "pantalon-africain-femme",
        "ensemble": "ensemble-africain-femme",
    },
}

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "images"
MAX_WIDTH = 1200          # redimensionnement max (px)
WEBP_QUALITY = 82         # qualité WebP (80-85 = sweet spot web)
REQUEST_TIMEOUT = 30
MAX_RETRIES = 3
SLEEP_BETWEEN_REQUESTS = 0.3  # courtoisie

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0 Safari/537.36"
    ),
    "Accept": "application/json,text/html;q=0.9,*/*;q=0.8",
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slugify(value: str) -> str:
    """Nom de fichier sûr, en ASCII minuscules, tirets."""
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower()
    return value or "image"


def http_get(url: str, params: dict | None = None) -> requests.Response | None:
    """GET avec retries + fallback SSL."""
    last_exc: Exception | None = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            return requests.get(
                url,
                params=params,
                headers=HEADERS,
                timeout=REQUEST_TIMEOUT,
                verify=SSL_VERIFY,
            )
        except requests.RequestException as exc:
            last_exc = exc
            time.sleep(0.8 * attempt)
    print(f"    [!] Echec après {MAX_RETRIES} tentatives : {last_exc}")
    return None


def fetch_collection_products(handle: str) -> list[dict]:
    """Récupère tous les produits d'une collection Shopify (paginé)."""
    products: list[dict] = []
    page = 1
    while True:
        url = f"{BASE_URL}/collections/{handle}/products.json"
        resp = http_get(url, params={"limit": 250, "page": page})
        if resp is None:
            break

        if resp.status_code != 200:
            print(f"    [!] HTTP {resp.status_code} sur {resp.url}")
            break

        try:
            data = resp.json()
        except json.JSONDecodeError:
            print(f"    [!] JSON invalide page {page}")
            break

        batch = data.get("products", [])
        if not batch:
            break
        products.extend(batch)
        if len(batch) < 250:
            break
        page += 1
        time.sleep(SLEEP_BETWEEN_REQUESTS)
    return products


def iter_product_image_urls(product: dict) -> Iterable[str]:
    """Retourne les URLs sources des images d'un produit (sans paramètre de taille)."""
    for img in product.get("images", []):
        src = img.get("src")
        if not src:
            continue
        # on enlève d'éventuels paramètres _NNNxNNN ajoutés par Shopify
        src = re.sub(r"_\d+x\d*(?=\.)", "", src)
        yield src


def download_image(url: str) -> bytes | None:
    resp = http_get(url)
    if resp is None:
        return None
    if resp.status_code != 200:
        print(f"        [!] HTTP {resp.status_code} -> {url}")
        return None
    return resp.content


def optimize_and_save(raw: bytes, destination: Path) -> bool:
    """Redimensionne + convertit en WebP optimisé pour le web."""
    try:
        with Image.open(io.BytesIO(raw)) as im:
            if im.mode in ("P", "LA"):
                im = im.convert("RGBA")
            elif im.mode not in ("RGB", "RGBA"):
                im = im.convert("RGB")

            if im.width > MAX_WIDTH:
                ratio = MAX_WIDTH / im.width
                new_size = (MAX_WIDTH, int(im.height * ratio))
                im = im.resize(new_size, Image.Resampling.LANCZOS)

            destination.parent.mkdir(parents=True, exist_ok=True)
            im.save(
                destination,
                format="WEBP",
                quality=WEBP_QUALITY,
                method=6,       # meilleur compresseur
            )
        return True
    except Exception as exc:  # noqa: BLE001
        print(f"        [!] Erreur optimisation : {exc}")
        return False


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def scrape() -> None:
    report: dict[str, dict[str, int]] = {}
    total_images = 0

    for category, sub_map in CATEGORIES.items():
        report[category] = {}
        print(f"\n=== Catégorie : {category.upper()} ===")
        for sub_name, handle in sub_map.items():
            print(f"  -> {sub_name} (collection={handle})")
            products = fetch_collection_products(handle)
            print(f"     {len(products)} produit(s) trouvé(s)")

            sub_dir = OUTPUT_DIR / category / sub_name
            saved_here = 0

            for product in products:
                title = product.get("title", "produit")
                product_slug = slugify(title)
                for idx, img_url in enumerate(iter_product_image_urls(product), start=1):
                    filename = f"{product_slug}-{idx:02d}.webp"
                    dest = sub_dir / filename
                    if dest.exists():
                        saved_here += 1
                        continue
                    raw = download_image(img_url)
                    if raw is None:
                        continue
                    if optimize_and_save(raw, dest):
                        saved_here += 1
                        size_kb = dest.stat().st_size / 1024
                        print(f"        ✓ {filename}  ({size_kb:.0f} Ko)")
                    time.sleep(SLEEP_BETWEEN_REQUESTS)

            report[category][sub_name] = saved_here
            total_images += saved_here

    # ---- Résumé ----
    print("\n" + "=" * 60)
    print("RESUMÉ")
    print("=" * 60)
    for category, subs in report.items():
        print(f"\n{category.upper()}")
        for sub, n in subs.items():
            print(f"  - {sub:20s} : {n:4d} images")
    print(f"\nTotal : {total_images} images")
    print(f"Dossier : {OUTPUT_DIR}")


if __name__ == "__main__":
    scrape()
