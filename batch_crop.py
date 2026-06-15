from PIL import Image
import os

def crop_center(image_path, target_width, target_height, output_path):
    if not os.path.exists(image_path):
        print(f"Error: Source image {image_path} not found.")
        return False
    try:
        img = Image.open(image_path)
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
        resized_img.save(output_path, "PNG")
        print(f"Cropped {image_path} to {target_width}x{target_height} -> {output_path}")
        return True
    except Exception as e:
        print(f"Failed to crop {image_path}: {e}")
        return False

# Mapping of generated brain images to destination files
jobs = [
    # post-why-competitor-showing-up-chatgpt
    ("/Users/abimbolaolaitan/.gemini/antigravity-ide/brain/3353add0-5657-4191-9724-112b3b51e2a7/competitor_chatgpt_hero_1779983765944.png", 1440, 810, "public/images/blog/post-why-competitor-showing-up-chatgpt-hero.png"),
    ("/Users/abimbolaolaitan/.gemini/antigravity-ide/brain/3353add0-5657-4191-9724-112b3b51e2a7/competitor_chatgpt_og_1779983786744.png", 1024, 540, "public/images/blog/post-why-competitor-showing-up-chatgpt-og.png"),

    # post-stop-googling-your-own-business
    ("/Users/abimbolaolaitan/.gemini/antigravity-ide/brain/3353add0-5657-4191-9724-112b3b51e2a7/stop_googling_hero_1779983818888.png", 1440, 810, "public/images/blog/post-stop-googling-your-own-business-hero.png"),
    ("/Users/abimbolaolaitan/.gemini/antigravity-ide/brain/3353add0-5657-4191-9724-112b3b51e2a7/stop_googling_og_1779983842154.png", 1024, 540, "public/images/blog/post-stop-googling-your-own-business-og.png"),
]

for src, tw, th, dest in jobs:
    crop_center(src, tw, th, dest)
