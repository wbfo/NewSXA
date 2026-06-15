import os
from PIL import Image

def resize_and_crop(img, target_width, target_height):
    w, h = img.size
    aspect_target = target_width / target_height
    aspect_current = w / h

    if aspect_current > aspect_target:
        new_width = int(h * aspect_target)
        left = (w - new_width) // 2
        top = 0
        right = left + new_width
        bottom = h
    else:
        new_height = int(w / aspect_target)
        left = 0
        top = (h - new_height) // 2
        right = w
        bottom = top + new_height

    cropped_img = img.crop((left, top, right, bottom))
    resized_img = cropped_img.resize((target_width, target_height), Image.Resampling.LANCZOS)
    return resized_img

def main():
    public_dir = '/Users/abimbolaolaitan/Desktop/SXA/public/images/blog'
    files_to_resize = [
        'post-law-firm-og.jpg',
        'post-geo-vs-seo-og.jpg',
        'post-gbp-reinstatement-og.jpg',
        'post-missed-calls-og.jpg'
    ]

    for filename in files_to_resize:
        filepath = os.path.join(public_dir, filename)
        if os.path.exists(filepath):
            try:
                img = Image.open(filepath)
                resized_img = resize_and_crop(img, 1024, 540)
                resized_img.save(filepath, "JPEG", quality=95)
                print(f"Resized {filename} to 1024x540 in-place.")
            except Exception as e:
                print(f"Failed to resize {filename}: {e}")
        else:
            print(f"File {filename} does not exist.")

if __name__ == "__main__":
    main()
