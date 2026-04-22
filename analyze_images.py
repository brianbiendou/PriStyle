import os
from pathlib import Path
from PIL import Image

def analyze_root_images(directory, threshold_kb=200):
    directory_path = Path(directory)
    extensions = {'.webp', '.jpg', '.jpeg', '.png'}
    
    large_images = []
    
    # Use glob('*') to only get files in the current directory (non-recursive)
    for filepath in directory_path.glob('*'):
        if filepath.is_file() and filepath.suffix.lower() in extensions:
            size_mb = filepath.stat().st_size / (1024 * 1024)
            size_kb = filepath.stat().st_size / 1024
            
            if size_kb > threshold_kb:
                try:
                    with Image.open(filepath) as img:
                        large_images.append({
                            'name': filepath.name,
                            'path': filepath,
                            'size_mb': size_mb,
                            'size_kb': size_kb,
                            'dimensions': img.size
                        })
                except Exception as e:
                    print(f"Error reading {filepath.name}: {e}")
                    
    large_images.sort(key=lambda x: x['size_kb'], reverse=True)
    
    print(f"Found {len(large_images)} images larger than {threshold_kb}KB in root.")
    print("Images to optimize:")
    for img in large_images:
        print(f"- {img['name']}: {img['size_mb']:.2f} MB ({img['size_kb']:.2f} KB), Dimensions: {img['dimensions'][0]}x{img['dimensions'][1]}")

if __name__ == '__main__':
    target_dir = r"d:\MatricxConsulting\PriStyle"
    analyze_root_images(target_dir)
