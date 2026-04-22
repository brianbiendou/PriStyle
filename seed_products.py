import os
import requests
import uuid
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

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

HEADERS = {
    "apikey": SUPABASE_SERVICE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

def get_subcategories():
    url = f"{SUPABASE_URL}/rest/v1/subcategories?select=id,slug"
    res = requests.get(url, headers=HEADERS, verify=False)
    res.raise_for_status()
    data = res.json()
    return {item['slug']: item['id'] for item in data}

def main():
    print("Fetching subcategories...")
    subcategories = get_subcategories()
    
    # Mapping custom folder names to our subcategory slugs
    folder_to_slug = {
        "boubou-femme": "boubou-femme",
        "robes": "robes",
        "robes-africaines": "robes",
        "Modele special": "robes",
        "jupes": "jupes",
        "vestes-bombers": "vestes-bombers",
        "hauts": "hauts",
        "pantalons": "pantalons",
        "boubou-homme": "boubou-homme",
        "chemises": "chemises",
        "ensemble-homme": "ensemble-homme",
        "tenues": "tenues", # enfant
        "tenue-mariage": "tenues-couple" # root folder for mariage
    }

    base_dir = r"d:\MatricxConsulting\PriStyle\sublime-wax"
    
    products_to_insert = []
    images_to_insert = []
    
    print("Scanning images...")
    product_counter = {}
    
    for root, _, files in os.walk(base_dir):
        # Determine mapping based on folder
        folder_name = os.path.basename(root)
        if root == os.path.join(base_dir, "tenue-mariage"):
            slug = "tenues-couple"
        elif folder_name in folder_to_slug:
            slug = folder_to_slug[folder_name]
        else:
            # Skip if unknown
            continue
            
        sub_id = subcategories.get(slug)
        if not sub_id:
            print(f"Subcategory ID not found for slug {slug} (folder {folder_name})")
            continue
            
        if slug not in product_counter:
            product_counter[slug] = 1
            
        for file in files:
            if not file.endswith('.webp'):
                continue
                
            product_id = str(uuid.uuid4())
            name = f"{slug.replace('-', ' ').title()} {product_counter[slug]}"
            prod_slug = f"{slug}-{product_counter[slug]}"
            
            products_to_insert.append({
                "id": product_id,
                "subcategory_id": sub_id,
                "name": name,
                "slug": prod_slug,
                "is_active": True
            })
            
            # calculate storage path (relative to sublime-wax)
            storage_path = os.path.relpath(os.path.join(root, file), base_dir).replace("\\", "/")
            
            images_to_insert.append({
                "product_id": product_id,
                "image_url": storage_path,
                "is_primary": True,
                "display_order": 1
            })
            
            product_counter[slug] += 1

    print(f"Found {len(products_to_insert)} products to insert.")
    
    # Bulk insert in batches to avoid payload size issues
    BATCH_SIZE = 100
    
    # Clear existing data to avoid duplicates if run multiple times
    print("Clearing old products/images...")
    requests.delete(f"{SUPABASE_URL}/rest/v1/product_images?product_id=not.is.null", headers=HEADERS, verify=False)
    requests.delete(f"{SUPABASE_URL}/rest/v1/products?id=not.is.null", headers=HEADERS, verify=False)
    
    print("Inserting products...")
    for i in range(0, len(products_to_insert), BATCH_SIZE):
        batch = products_to_insert[i:i+BATCH_SIZE]
        res = requests.post(f"{SUPABASE_URL}/rest/v1/products", headers=HEADERS, json=batch, verify=False)
        if res.status_code not in (200, 201):
            print(f"Error inserting products: {res.text}")
    
    print("Inserting product images...")
    for i in range(0, len(images_to_insert), BATCH_SIZE):
        batch = images_to_insert[i:i+BATCH_SIZE]
        res = requests.post(f"{SUPABASE_URL}/rest/v1/product_images", headers=HEADERS, json=batch, verify=False)
        if res.status_code not in (200, 201):
            print(f"Error inserting images: {res.text}")

    print("Database seeding completed successfully!")

if __name__ == "__main__":
    main()
