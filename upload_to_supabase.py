import os
import requests
import mimetypes
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Supabase configuration
SUPABASE_URL = "https://hycvllacbcyetrvogpdl.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5Y3ZsbGFjYmN5ZXRydm9ncGRsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njc2Mzc2MCwiZXhwIjoyMDkyMzM5NzYwfQ.4JWpbWZIphqvC9dXB_FOUQr5BN30iy4iVFwk7uZkCes"

HEADERS = {
    "apikey": SUPABASE_SERVICE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
}

def create_bucket_if_not_exists(bucket_name, public=True):
    print(f"Checking bucket: {bucket_name}")
    url = f"{SUPABASE_URL}/storage/v1/bucket/{bucket_name}"
    response = requests.get(url, headers=HEADERS, verify=False)
    
    if response.status_code == 200:
        print(f"Bucket {bucket_name} already exists.")
        return
        
    print(f"Creating bucket {bucket_name}...")
    create_url = f"{SUPABASE_URL}/storage/v1/bucket"
    payload = {
        "id": bucket_name,
        "name": bucket_name,
        "public": public
    }
    res = requests.post(create_url, headers=HEADERS, json=payload, verify=False)
    if res.status_code == 200:
        print(f"Successfully created bucket {bucket_name}")
    else:
        print(f"Error creating bucket {bucket_name}: {res.status_code} - {res.text}")

def upload_directory(base_path, bucket_name, prefix=""):
    print(f"\nScanning directory {base_path} for bucket {bucket_name}...")
    success_count = 0
    error_count = 0
    
    for root, _, files in os.walk(base_path):
        for file in files:
            # Skip non-optimized files if we're in the catalog
            if bucket_name == 'catalog-media' and not file.endswith('.webp'):
                continue
                
            file_path = os.path.join(root, file)
            # Calculate relative path to use as object key
            rel_path = os.path.relpath(file_path, base_path).replace("\\", "/")
            object_name = f"{prefix}{rel_path}" if prefix else rel_path
            
            content_type, _ = mimetypes.guess_type(file_path)
            if not content_type:
                content_type = 'application/octet-stream'
                
            upload_headers = HEADERS.copy()
            upload_headers["Content-Type"] = content_type
            
            url = f"{SUPABASE_URL}/storage/v1/object/{bucket_name}/{object_name}"
            
            with open(file_path, 'rb') as f:
                res = requests.post(url, headers=upload_headers, data=f, verify=False)
                
            if res.status_code in (200, 201):
                success_count += 1
                if success_count % 50 == 0:
                    print(f"Uploaded {success_count} files...")
            elif res.status_code == 400 and "Duplicate" in res.text:
                # Already exists
                success_count += 1
            else:
                print(f"Error uploading {object_name}: {res.status_code} - {res.text}")
                error_count += 1
                
    print(f"Done uploading to {bucket_name}. Success: {success_count}, Errors: {error_count}")

if __name__ == "__main__":
    # Create buckets
    create_bucket_if_not_exists("site-assets")
    create_bucket_if_not_exists("catalog-media")
    
    # Upload site assets (logos, hero, etc.)
    site_images_path = r"d:\MatricxConsulting\PriStyle\site\public\images"
    upload_directory(site_images_path, "site-assets")
    
    # Upload catalog images (sublime-wax directory)
    catalog_path = r"d:\MatricxConsulting\PriStyle\sublime-wax"
    print("\nStarting mass upload for catalog media... This might take a few minutes.")
    upload_directory(catalog_path, "catalog-media")
