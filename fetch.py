import urllib.request
import re
import os

url = 'https://afro-elegance.com/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

images = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.IGNORECASE)
images += re.findall(r'data-src=["\']([^"\']+)["\']', html, re.IGNORECASE)

unique = list(set(images))
print(f"Found {len(unique)} images")

for img in unique:
    if 'homme' in img.lower() or 'femme' in img.lower() or 'lui' in img.lower() or 'elle' in img.lower() or 'bouton' in img.lower():
        print(img)
    elif '.jpg' in img.lower() or '.webp' in img.lower():
        print("IMG:", img)
