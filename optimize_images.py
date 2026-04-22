import os
from pathlib import Path
from PIL import Image

def optimize_large_images(directory, threshold_kb=200, max_dimension=1080):
    directory_path = Path(directory)
    extensions = {'.webp', '.jpg', '.jpeg', '.png'}
    
    optimized_count = 0
    saved_bytes = 0
    
    for filepath in directory_path.rglob('*'):
        if filepath.is_file() and filepath.suffix.lower() in extensions:
            original_size = filepath.stat().st_size
            size_kb = original_size / 1024
            
            if size_kb > threshold_kb:
                try:
                    with Image.open(filepath) as img:
                        # Calculate new size maintaining aspect ratio
                        width, height = img.size
                        if width > max_dimension or height > max_dimension:
                            if width > height:
                                new_width = max_dimension
                                new_height = int((max_dimension / width) * height)
                            else:
                                new_height = max_dimension
                                new_width = int((max_dimension / height) * width)
                                
                            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                        
                        # Save optimized version
                        # We save it to a temporary file first to ensure we don't end up with a larger file
                        temp_path = filepath.with_name(filepath.stem + "_temp" + filepath.suffix)
                        
                        if filepath.suffix.lower() == '.webp':
                            img.save(temp_path, 'WEBP', quality=80, method=6)
                        elif filepath.suffix.lower() in {'.jpg', '.jpeg'}:
                            if img.mode in ('RGBA', 'P'):
                                img = img.convert('RGB')
                            img.save(temp_path, 'JPEG', quality=80, optimize=True)
                        else:
                            img.save(temp_path, 'PNG', optimize=True)
                            
                        new_size = temp_path.stat().st_size
                        
                        if new_size < original_size:
                            temp_path.replace(filepath)
                            saved_bytes += (original_size - new_size)
                            optimized_count += 1
                            print(f"Optimized: {filepath.name} ({size_kb:.1f}KB -> {new_size/1024:.1f}KB)")
                        else:
                            temp_path.unlink() # discard if not smaller
                            
                except Exception as e:
                    print(f"Error optimizing {filepath.name}: {e}")
                    
    print(f"\nOptimization complete. Optimized {optimized_count} images.")
    print(f"Total space saved: {saved_bytes / (1024*1024):.2f} MB")

if __name__ == '__main__':
    target_dir = r"d:\MatricxConsulting\PriStyle\sublime-wax"
    optimize_large_images(target_dir)
