import cv2
import numpy as np
import os

def vectorize_image(image_path, svg_path, num_colors=64):
    print(f"Vectorizing {image_path}...")
    img = cv2.imread(image_path)
    if img is None:
        print(f"Error loading {image_path}")
        return

    h, w, c = img.shape

    # 1. Color Quantization using K-Means
    Z = img.reshape((-1, 3))
    Z = np.float32(Z)

    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 15, 1.0)
    ret, label, center = cv2.kmeans(Z, num_colors, None, criteria, 5, cv2.KMEANS_RANDOM_CENTERS)

    center = np.uint8(center)
    res = center[label.flatten()]
    res2 = res.reshape((img.shape))

    # 2. Build SVG header
    svg_header = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">\n'
    svg_header += f'  <rect width="100%" height="100%" fill="#000000" />\n' # Baseline dark canvas to ensure clean background transitions
    svg_footer = '</svg>\n'

    svg_paths = []

    # Trace contours for each unique quantized color
    for color_idx in range(num_colors):
        color = center[color_idx]
        b, g, r = int(color[0]), int(color[1]), int(color[2])

        # Skip completely black pixels since they are already covered by our baseline rect
        if r < 10 and g < 10 and b < 10:
            continue

        hex_color = f"#{r:02x}{g:02x}{b:02x}"

        # Create a mask for this color
        mask = cv2.inRange(res2, color, color)

        # Find contours
        contours, hierarchy = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        for contour in contours:
            # Simplify contour to reduce points and file size
            epsilon = 0.0008 * cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, epsilon, True)

            if len(approx) < 3:
                continue

            path_d = ""
            for i, point in enumerate(approx):
                x, y = point[0]
                if i == 0:
                    path_d += f"M {x} {y} "
                else:
                    path_d += f"L {x} {y} "
            path_d += "Z"

            # Use small stroke width to blend edge gaps
            svg_paths.append(f'  <path d="{path_d}" fill="{hex_color}" stroke="{hex_color}" stroke-width="0.8" stroke-linejoin="round" />\n')

    # Write SVG
    with open(svg_path, 'w') as f:
        f.write(svg_header)
        for p in svg_paths:
            f.write(p)
        f.write(svg_footer)

    print(f"Saved vectorized SVG to {svg_path} (size: {os.path.getsize(svg_path) / 1024:.2f} KB)")

# File pairs to process
jobs = [
    # Missed Calls Blog
    ("public/images/blog/post-missed-calls-hero.jpg", "public/images/blog/post-missed-calls-hero.svg", 64),
    ("public/images/blog/post-missed-calls-infographic.jpg", "public/images/blog/post-missed-calls-infographic.svg", 96),
    ("public/images/blog/post-missed-calls-og.jpg", "public/images/blog/post-missed-calls-og.svg", 64),

    # Law Firm Blog
    ("public/images/blog/post-law-firm-hero.jpg", "public/images/blog/post-law-firm-hero.svg", 64),
    ("public/images/blog/post-law-firm-infographic.jpg", "public/images/blog/post-law-firm-infographic.svg", 96),
    ("public/images/blog/post-law-firm-og.jpg", "public/images/blog/post-law-firm-og.svg", 64),
]

for src, dest, colors in jobs:
    if os.path.exists(src):
        vectorize_image(src, dest, colors)
    else:
        print(f"Source file {src} does not exist.")
