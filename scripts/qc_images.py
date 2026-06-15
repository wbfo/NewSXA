import os
import re
from PIL import Image

def get_frontmatter_value(content, key):
    match = re.search(fr'^{key}:\s*["\']?(.*?)["\']?$', content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    return None

def main():
    workspace_dir = '/Users/abimbolaolaitan/Desktop/SXA'
    blog_dir = os.path.join(workspace_dir, 'content/blog')
    public_dir = os.path.join(workspace_dir, 'public')

    if not os.path.exists(blog_dir):
        print(f"Blog directory {blog_dir} does not exist.")
        return

    blog_files = [f for f in os.listdir(blog_dir) if f.endswith('.mdx')]
    print(f"Found {len(blog_files)} blog posts in content/blog/\n")

    errors = []
    success_count = 0

    for filename in sorted(blog_files):
        filepath = os.path.join(blog_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        hero_image_path = get_frontmatter_value(content, 'heroImage')
        og_image_path = get_frontmatter_value(content, 'ogImage')

        post_ok = True

        # 1. Check Hero Image
        if not hero_image_path:
            errors.append(f"[{filename}] Missing 'heroImage' frontmatter field.")
            post_ok = False
        else:
            # Resolve physical path
            relative_path = hero_image_path.lstrip('/')
            full_hero_path = os.path.join(public_dir, relative_path)

            if not os.path.exists(full_hero_path):
                errors.append(f"[{filename}] Hero image file not found at {hero_image_path}")
                post_ok = False
            else:
                try:
                    with Image.open(full_hero_path) as img:
                        w, h = img.size
                        if (w, h) != (1440, 810):
                            errors.append(f"[{filename}] Hero image dimensions {w}x{h} do not match expected 1440x810 (at {hero_image_path})")
                            post_ok = False
                except Exception as e:
                    errors.append(f"[{filename}] Fails to open hero image {hero_image_path}: {e}")
                    post_ok = False

        # 2. Check OG Image
        if not og_image_path:
            errors.append(f"[{filename}] Missing 'ogImage' frontmatter field.")
            post_ok = False
        else:
            relative_path = og_image_path.lstrip('/')
            full_og_path = os.path.join(public_dir, relative_path)

            if not os.path.exists(full_og_path):
                errors.append(f"[{filename}] OG image file not found at {og_image_path}")
                post_ok = False
            else:
                try:
                    with Image.open(full_og_path) as img:
                        w, h = img.size
                        if (w, h) != (1024, 540):
                            errors.append(f"[{filename}] OG image dimensions {w}x{h} do not match expected 1024x540 (at {og_image_path})")
                            post_ok = False
                except Exception as e:
                    errors.append(f"[{filename}] Fails to open OG image {og_image_path}: {e}")
                    post_ok = False

        # 3. Check Infographic Image (if referenced in body)
        infographic_match = re.search(r'!\[.*?\]\((/images/blog/post-.*?-infographic\.jpg)\)', content)
        if infographic_match:
            infographic_path = infographic_match.group(1)
            relative_path = infographic_path.lstrip('/')
            full_info_path = os.path.join(public_dir, relative_path)

            if not os.path.exists(full_info_path):
                errors.append(f"[{filename}] Infographic image file not found at {infographic_path}")
                post_ok = False
            else:
                try:
                    with Image.open(full_info_path) as img:
                        w, h = img.size
                        if (w, h) != (1200, 675):
                            errors.append(f"[{filename}] Infographic dimensions {w}x{h} do not match expected 1200x675 (at {infographic_path})")
                            post_ok = False
                except Exception as e:
                    errors.append(f"[{filename}] Fails to open infographic image {infographic_path}: {e}")
                    post_ok = False

        if post_ok:
            success_count += 1

    print(f"--- Quality Control Results ---")
    print(f"Successfully validated posts: {success_count}/{len(blog_files)}")
    print(f"Total validation issues found: {len(errors)}")
    if errors:
        print("\nDetails of Issues:")
        for err in errors:
            print(f"- {err}")
    else:
        print("\nAll blog images exist and have correct dimensions!")

if __name__ == "__main__":
    main()
