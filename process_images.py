import sys
from PIL import Image, ImageOps

def pad_to_target_size(image_path, output_path, target_size=None):
    img = Image.open(image_path)
    img = img.convert("RGB")

    inverted = ImageOps.invert(img)
    gray = inverted.convert("L")
    bbox = gray.point(lambda p: p > 10 and 255).getbbox()

    if bbox:
        img = img.crop(bbox)

    if target_size:
        img = ImageOps.pad(img, target_size, method=Image.Resampling.LANCZOS, color=(0, 0, 0))

    img.save(output_path, quality=95)
    print(f"Saved {output_path}")

new_img = "/Users/abimbolaolaitan/.gemini/antigravity-ide/brain/3353add0-5657-4191-9724-112b3b51e2a7/media__1779764756771.jpg"
pad_to_target_size(new_img, "public/images/blog/post-geo-vs-seo-infographic.jpg", (1200, 675))
