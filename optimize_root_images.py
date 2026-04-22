import os
from pathlib import Path
from PIL import Image

# Disable decompression bomb warning for the huge images
Image.MAX_IMAGE_PIXELS = None

def optimize_root_images(directory, threshold_kb=200, max_dimension=1920):
    directory_path = Path(directory)
    extensions = {'.webp', '.jpg', '.jpeg', '.png'}
    
    optimized_count = 0
    saved_bytes = 0
    
    for filepath in directory_path.glob('*'):
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
                        
                        # Save optimized version as WEBP since it's much more efficient
                        # We change extension to .webp if it's not already
                        if filepath.suffix.lower() != '.webp':
                            new_filepath = filepath.with_suffix('.webp')
                        else:
                            new_filepath = filepath
                            
                        temp_path = new_filepath.with_name(new_filepath.stem + "_temp" + new_filepath.suffix)
                        
                        # Handle RGBA/transparency
                        if img.mode == 'RGBA':
                            img.save(temp_path, 'WEBP', quality=85, method=6, lossless=False)
                        else:
                            if img.mode in ('P'):
                                img = img.convert('RGBA')
                            img.save(temp_path, 'WEBP', quality=85, method=6)
                            
                        new_size = temp_path.stat().st_size
                        
                        # If we changed format, we might always want to keep the new webp if it's smaller
                        # Or if we want to replace the original file
                        if new_size < original_size:
                            if filepath != new_filepath:
                                # We created a new .webp file, let's keep it and remove the old one
                                temp_path.replace(new_filepath)
                                filepath.unlink() # Delete original heavy PNG/JPG
                                print(f"Converted & Optimized: {filepath.name} ({original_size/1024/1024:.2f}MB -> {new_filepath.name} {new_size/1024:.1f}KB)")
                            else:
                                temp_path.replace(filepath)
                                print(f"Optimized: {filepath.name} ({size_kb:.1f}KB -> {new_size/1024:.1f}KB)")
                            
                            saved_bytes += (original_size - new_size)
                            optimized_count += 1
                        else:
                            temp_path.unlink() # discard if not smaller
                            print(f"Could not reduce size for {filepath.name}")
                            
                except Exception as e:
                    print(f"Error optimizing {filepath.name}: {e}")
                    
    print(f"\nOptimization complete. Optimized {optimized_count} images.")
    print(f"Total space saved: {saved_bytes / (1024*1024):.2f} MB")

if __name__ == '__main__':
    target_dir = r"d:\MatricxConsulting\PriStyle"
    optimize_root_images(target_dir)
