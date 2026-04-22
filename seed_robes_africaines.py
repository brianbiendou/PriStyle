"""
seed_robes_africaines.py
------------------------
Ajoute les 4 sous-dossiers de robes-africaines comme sous-catégories
de la catégorie femme, upload les images avec des clés Supabase-safe
(sans accents, espaces, parenthèses), et insère les produits en DB.

Usage :
    python seed_robes_africaines.py
"""

import os
import re
import uuid
import unicodedata
import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ─── Config ──────────────────────────────────────────────────────────────────

# Charger .env si présent
_env_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(_env_path):
    with open(_env_path) as _f:
        for _line in _f:
            _line = _line.strip()
            if _line and not _line.startswith('#') and '=' in _line:
                _k, _v = _line.split('=', 1)
                os.environ.setdefault(_k.strip(), _v.strip())

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://hycvllacbcyetrvogpdl.supabase.co")
SUPABASE_SERVICE_KEY = os.environ["SUPABASE_SERVICE_KEY"]
BUCKET = "catalog-media"
BASE_DIR = r"d:\MatricxConsulting\PriStyle\sublime-wax\femme\robes-africaines"

REST_HEADERS = {
    "apikey": SUPABASE_SERVICE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}

# ─── Les 4 nouveaux dossiers → sous-catégories ───────────────────────────────

FOLDERS = [
    {
        "local_name": "Combinaison wax pantalon large élégante",
        "db_name": "Combinaison Wax Pantalon Large",
        "slug": "combinaison-wax-pantalon-large-elegante",
        "display_order": 10,
    },
    {
        "local_name": "Robe wax midi moulante asymétrique",
        "db_name": "Robe Wax Midi Moulante",
        "slug": "robe-wax-midi-moulante-asymetrique",
        "display_order": 11,
    },
    {
        "local_name": "Robes longues wax bi-matière élégantes",
        "db_name": "Robes Longues Wax Bi-Matière",
        "slug": "robes-longues-wax-bi-matiere-elegantes",
        "display_order": 12,
    },
    {
        "local_name": "Robes longues wax princesse volumineuses",
        "db_name": "Robes Longues Wax Princesse",
        "slug": "robes-longues-wax-princesse-volumineuses",
        "display_order": 13,
    },
]

# ─── Helpers ─────────────────────────────────────────────────────────────────


def _slugify(s: str) -> str:
    """Transforme une chaîne en slug ASCII sans accents ni caractères spéciaux."""
    normalized = unicodedata.normalize("NFD", s)
    ascii_str = normalized.encode("ascii", "ignore").decode("ascii")
    slugged = re.sub(r"[^a-zA-Z0-9._]+", "-", ascii_str)
    return re.sub(r"-+", "-", slugged).strip("-").lower()


def upload_image(local_path: str, storage_key: str) -> bool:
    """Upload un fichier webp vers Supabase Storage. Retourne True si OK."""
    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET}/{storage_key}"
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "image/webp",
    }
    with open(local_path, "rb") as f:
        res = requests.post(url, headers=headers, data=f, verify=False)
    if res.status_code in (200, 201):
        return True
    if res.status_code == 400 and "Duplicate" in res.text:
        return True  # déjà uploadé
    print(f"    ✗ Upload {storage_key}: {res.status_code} — {res.text[:120]}")
    return False


def get_or_create_subcategory(category_id: str, name: str, slug: str, display_order: int):
    """Récupère ou crée la sous-catégorie. Retourne l'id ou None."""
    check = requests.get(
        f"{SUPABASE_URL}/rest/v1/subcategories"
        f"?slug=eq.{slug}&category_id=eq.{category_id}&select=id",
        headers=REST_HEADERS,
        verify=False,
    )
    data = check.json()
    if data:
        print(f"  ℹ Sous-catégorie '{slug}' existe déjà (id={data[0]['id'][:8]}...)")
        return data[0]["id"]

    payload = {
        "category_id": category_id,
        "name": name,
        "slug": slug,
        "display_order": display_order,
        "is_active": True,
    }
    res = requests.post(
        f"{SUPABASE_URL}/rest/v1/subcategories",
        headers=REST_HEADERS,
        json=payload,
        verify=False,
    )
    if res.status_code in (200, 201):
        created_id = res.json()[0]["id"]
        print(f"  ✓ Sous-catégorie créée : {slug} (id={created_id[:8]}...)")
        return created_id
    print(f"  ✗ Création {slug}: {res.status_code} — {res.text[:120]}")
    return None


def subcategory_already_seeded(sub_id: str) -> bool:
    """Vérifie si des produits existent déjà pour cette sous-catégorie."""
    res = requests.get(
        f"{SUPABASE_URL}/rest/v1/products"
        f"?subcategory_id=eq.{sub_id}&select=id&limit=1",
        headers=REST_HEADERS,
        verify=False,
    )
    return bool(res.json())


def insert_product(sub_id: str, prod_slug: str, db_name: str, storage_key: str):
    """Insère 1 produit + 1 image_produit."""
    product_id = str(uuid.uuid4())

    prod_res = requests.post(
        f"{SUPABASE_URL}/rest/v1/products",
        headers=REST_HEADERS,
        json={
            "id": product_id,
            "subcategory_id": sub_id,
            "name": db_name,
            "slug": prod_slug,
            "is_active": True,
        },
        verify=False,
    )
    if prod_res.status_code not in (200, 201):
        print(f"    ✗ Produit {prod_slug}: {prod_res.status_code} — {prod_res.text[:80]}")
        return

    img_res = requests.post(
        f"{SUPABASE_URL}/rest/v1/product_images",
        headers=REST_HEADERS,
        json={
            "product_id": product_id,
            "image_url": storage_key,
            "is_primary": True,
            "display_order": 1,
        },
        verify=False,
    )
    if img_res.status_code not in (200, 201):
        print(f"    ✗ Image {storage_key}: {img_res.status_code} — {img_res.text[:80]}")


# ─── Main ─────────────────────────────────────────────────────────────────────


def main():
    # 1. Récupérer l'ID de la catégorie femme
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/categories?slug=eq.femme&select=id",
        headers=REST_HEADERS,
        verify=False,
    )
    femme_data = r.json()
    if not femme_data:
        print("ERREUR : catégorie 'femme' introuvable en base.")
        return
    femme_id = femme_data[0]["id"]
    print(f"Catégorie femme id={femme_id[:8]}...\n")

    for folder in FOLDERS:
        local_folder = os.path.join(BASE_DIR, folder["local_name"])
        if not os.path.isdir(local_folder):
            print(f"[IGNORÉ] Dossier introuvable : {local_folder}\n")
            continue

        print(f"══ {folder['slug']} ══")

        # 2. Créer la sous-catégorie
        sub_id = get_or_create_subcategory(
            femme_id, folder["db_name"], folder["slug"], folder["display_order"]
        )
        if not sub_id:
            continue

        # 3. Vérifier si déjà seedé
        if subcategory_already_seeded(sub_id):
            print(f"  ℹ Déjà seedé, on passe.\n")
            continue

        # 4. Lister les images locales et uploader
        files = sorted(f for f in os.listdir(local_folder) if f.endswith(".webp"))
        print(f"  {len(files)} images trouvées")

        success = 0
        for i, filename in enumerate(files, start=1):
            local_path = os.path.join(local_folder, filename)
            storage_key = f"femme/robes-africaines/{folder['slug']}/{folder['slug']}-{i:02d}.webp"
            prod_slug = f"{folder['slug']}-{i}"

            if upload_image(local_path, storage_key):
                insert_product(sub_id, prod_slug, folder["db_name"], storage_key)
                success += 1

        print(f"  ✓ {success}/{len(files)} produits créés\n")

    print("Script terminé.")


if __name__ == "__main__":
    main()
