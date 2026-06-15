import os
import json
import re
import datetime
from PIL import Image

def to_title_case(text):
    preserve = {'GBP', 'AI', 'AEO', 'GEO', 'SEO', 'NAP', 'CPC', 'CPA', 'CRM', 'DSO', 'AICC', 'AIO', 'LLMO', 'YELP', 'NYC', 'PDF', 'SMS', 'ADA'}
    words = text.split()
    capitalized = []
    for w in words:
        clean_w = w.strip('.,/#!$%^&*;:{}=\-_`~()')
        if clean_w.upper() in preserve:
            capitalized.append(w.upper())
        else:
            capitalized.append(w.capitalize())
    return ' '.join(capitalized)

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

def resize_and_contain(img, target_width, target_height):
    w, h = img.size
    aspect_target = target_width / target_height
    aspect_current = w / h

    if aspect_current > aspect_target:
        new_width = target_width
        new_height = int(target_width / aspect_current)
    else:
        new_height = target_height
        new_width = int(target_height * aspect_current)

    resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

    # Sample background color from top-left pixel
    bg_color = img.getpixel((0, 0))
    if isinstance(bg_color, int):
        bg_color = (bg_color, bg_color, bg_color)
    elif len(bg_color) > 3:
        bg_color = bg_color[:3]

    canvas = Image.new("RGB", (target_width, target_height), bg_color)
    x = (target_width - new_width) // 2
    y = (target_height - new_height) // 2
    canvas.paste(resized_img, (x, y))
    return canvas

def get_existing_frontmatter(mdx_path):
    if not os.path.exists(mdx_path):
        return {}
    with open(mdx_path, 'r', encoding='utf-8') as f:
        content = f.read()
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return {}
    fm_text = match.group(1)
    fm = {}
    for line in fm_text.split('\n'):
        if ':' in line:
            k, v = line.split(':', 1)
            fm[k.strip()] = v.strip().strip('"\'')
    return fm

def convert_draft_to_mdx(slug, source_path, dest_path, date_str, output_dir=None, is_original=False):
    if not os.path.exists(source_path):
        print(f"Source file {source_path} does not exist.")
        return False

    existing_fm = {}
    if is_original:
        existing_fm = get_existing_frontmatter(dest_path)
        if 'date' in existing_fm:
            date_str = existing_fm['date']

    with open(source_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    title = ""
    category_line = ""
    meta_desc = ""
    stakes_line = ""

    body_start_idx = 0
    for i, line in enumerate(lines):
        if line.startswith('# '):
            title = line[2:].strip()
        elif line.startswith('**Category:**'):
            category_line = line.strip()
        elif line.startswith('**Meta description:**') or line.startswith('**Meta Description:**'):
            meta_desc = line.strip()
        elif line.startswith('**Estimated revenue at stake:**'):
            stakes_line = line.strip()
        elif line.strip() == '---' and i > 2:
            body_start_idx = i + 1
            break

    # Parse tag & industry
    tag = 'All Industries'
    industry = 'All Industries'
    if category_line:
        cat_match = re.search(r'\*\*Category:\*\*\s*(.*?)\s*·\s*(.*)', category_line)
        if cat_match:
            tag = cat_match.group(1).strip()
            industry = cat_match.group(2).strip()

    # Parse description
    description = ""
    if meta_desc:
        desc_match = re.search(r'\*\*Meta [Dd]escription:\*\*\s*(.*)', meta_desc)
        if desc_match:
            description = desc_match.group(1).strip()

    # Parse stakes
    stakes = ""
    if stakes_line:
        stakes_match = re.search(r'\*\*Estimated revenue at stake:\*\*\s*(.*)', stakes_line)
        if stakes_match:
            stakes = stakes_match.group(1).strip()
            # Clean up the stakes text (remove the explanation part)
            if ' in ' in stakes:
                stakes = stakes.split(' in ')[0].strip()
            elif ' for ' in stakes:
                stakes = stakes.split(' for ')[0].strip()

    meta_title = title.split(':')[0].split('?')[0].split('—')[0].split(' - ')[0].strip()

    # Check if infographic exists in draft directory
    has_infographic = False
    if output_dir:
        infographic_src_png = os.path.join(output_dir, 'assets', 'infographic.png')
        infographic_src_jpg = os.path.join(output_dir, 'assets', 'infographic.jpg')
        if os.path.exists(infographic_src_png) or os.path.exists(infographic_src_jpg):
            has_infographic = True

    # Body lines
    body_lines = lines[body_start_idx:]

    # Find where the Image Descriptions starts and truncate the body there
    desc_start_idx = -1
    for i, line in enumerate(body_lines):
        if line.strip().startswith('## Image Descriptions') or line.strip().startswith('## Image Description'):
            desc_start_idx = i
            break
    if desc_start_idx != -1:
        body_lines = body_lines[:desc_start_idx]

    # Strip trailing whitespace and dividers from the end of the body lines
    while body_lines and (body_lines[-1].strip() == "" or body_lines[-1].strip() == "---" or body_lines[-1].strip().startswith("*Sovereign X Audits")):
        body_lines.pop()

    # Now parse the remaining lines into MDX, handling Findings and Checklist
    mdx_lines = []
    in_finding = False
    pending_finding = False
    pending_label = ""

    # Action Checklist block parsing
    in_checklist = False
    checklist_section = "" # 'thisWeek' or 'thisMonth'
    this_week_items = []
    this_month_items = []

    WORD_TO_NUM = {
        'one': '01', 'two': '02', 'three': '03', 'four': '04', 'five': '05', 'six': '06',
        'seven': '07', 'eight': '08', 'nine': '09', 'ten': '10',
        '1': '01', '2': '02', '3': '03', '4': '04', '5': '05', '6': '06', '7': '07', '8': '08', '9': '09', '10': '10',
        '01': '01', '02': '02', '03': '03', '04': '04', '05': '05', '06': '06', '07': '07', '08': '08', '09': '09', '10': '10'
    }

    for line in body_lines:
        striped = line.strip()

        # If we are looking for the title of a standalone finding header
        if pending_finding:
            if striped == "":
                continue
            if striped.startswith('#'):
                finding_title = striped.lstrip('#').strip()
                finding_title = to_title_case(finding_title)
                mdx_lines.append(f'<Finding label="{pending_label}" title="{finding_title}">\n')
                in_finding = True
                pending_finding = False
                continue
            else:
                finding_title = to_title_case(striped)
                mdx_lines.append(f'<Finding label="{pending_label}" title="{finding_title}">\n')
                in_finding = True
                pending_finding = False
                continue

        # Check for Action Checklist header
        if striped.startswith('## Action Checklist') or striped.startswith('## Action checklist'):
            if in_finding:
                mdx_lines.append("</Finding>\n\n")
                in_finding = False
            if has_infographic:
                mdx_lines.append(f'![{meta_title} Infographic](/images/blog/post-{slug}-infographic.jpg)\n\n')
            in_checklist = True
            continue

        if in_checklist:
            if striped.startswith('**Week'):
                # Extract text after '**Week X:**'
                item_content = re.sub(r'^\*\*Week\s+\d+:\*\*\s*', '', striped).strip()
                item_content = re.sub(r'^\*\*Week\s+\d+:\s*', '', item_content).strip()
                match_num = re.search(r'\d+', striped)
                week_num = match_num.group(0) if match_num else "1"
                item_text = f"Week {week_num}: {item_content}"
                if week_num in ('1', '2'):
                    this_week_items.append(item_text)
                else:
                    this_month_items.append(item_text)
                continue
            elif striped.startswith('**'):
                if not this_week_items:
                    checklist_section = 'thisWeek'
                else:
                    checklist_section = 'thisMonth'
                continue
            elif striped.startswith('-') or striped.startswith('*'):
                item = striped[1:].strip()
                if checklist_section == 'thisWeek':
                    this_week_items.append(item)
                elif checklist_section == 'thisMonth':
                    this_month_items.append(item)
                continue
            elif striped.startswith('---') or striped.startswith('##') or striped.startswith('*Sovereign X Audits'):
                # End of checklist block
                in_checklist = False
                # Output ActionChecklist component
                mdx_lines.append("<ActionChecklist \n")
                mdx_lines.append("  thisWeek={[\n")
                for item in this_week_items:
                    escaped_item = item.replace('"', '\\"')
                    mdx_lines.append(f'    "{escaped_item}",\n')
                if this_week_items:
                    mdx_lines[-1] = mdx_lines[-1].rstrip(',\n') + '\n'
                mdx_lines.append("  ]}\n")
                mdx_lines.append("  thisMonth={[\n")
                for item in this_month_items:
                    escaped_item = item.replace('"', '\\"')
                    mdx_lines.append(f'    "{escaped_item}",\n')
                if this_month_items:
                    mdx_lines[-1] = mdx_lines[-1].rstrip(',\n') + '\n'
                mdx_lines.append("  ]}\n")
                mdx_lines.append("/>\n\n")

                if striped.startswith('##'):
                    # We hit another header, let's keep parsing it
                    pass
                else:
                    # It was a divider or footer, output it
                    if striped.startswith('---'):
                        mdx_lines.append("---\n\n")
                    continue
            else:
                # empty line or non-list line inside checklist, ignore or continue
                continue

        # Parse Finding headers
        finding_match = re.match(r'^FINDING\s+(\w+)(?:\s+[-—–]\s+(.*))?$', striped, re.IGNORECASE)
        if finding_match:
            if in_finding:
                mdx_lines.append("</Finding>\n\n")
                in_finding = False

            finding_num = finding_match.group(1).lower()
            num_str = WORD_TO_NUM.get(finding_num, finding_num.zfill(2))
            label = f"FINDING {num_str}"

            if finding_match.group(2):
                finding_title = to_title_case(finding_match.group(2).strip())
                mdx_lines.append(f'<Finding label="{label}" title="{finding_title}">\n')
                in_finding = True
            else:
                pending_finding = True
                pending_label = label
            continue

        # Parse standard divider
        if striped == '---':
            if in_finding:
                mdx_lines.append("</Finding>\n\n")
                in_finding = False
            mdx_lines.append("---\n\n")
            continue

        # Parse headers
        if striped.startswith('## '):
            if in_finding:
                mdx_lines.append("</Finding>\n\n")
                in_finding = False
            mdx_lines.append(line + "\n")
            continue

        # Replace book audit link
        if '[Book the Audit' in striped:
            mdx_lines.append("<AuditCTA />\n\n")
            continue

        # Add normal lines
        if in_finding:
            if striped == "":
                # We don't output double newlines inside Finding tag if they are empty
                continue
            mdx_lines.append(striped + "\n\n")
        else:
            mdx_lines.append(line)

    # Close any open tag at the end
    if in_finding:
        mdx_lines.append("</Finding>\n")
    if in_checklist:
        mdx_lines.append("<ActionChecklist \n")
        mdx_lines.append("  thisWeek={[\n")
        for item in this_week_items:
            escaped_item = item.replace('"', '\\"')
            mdx_lines.append(f'    "{escaped_item}",\n')
        if this_week_items:
            mdx_lines[-1] = mdx_lines[-1].rstrip(',\n') + '\n'
        mdx_lines.append("  ]}\n")
        mdx_lines.append("  thisMonth={[\n")
        for item in this_month_items:
            escaped_item = item.replace('"', '\\"')
            mdx_lines.append(f'    "{escaped_item}",\n')
        if this_month_items:
            mdx_lines[-1] = mdx_lines[-1].rstrip(',\n') + '\n'
        mdx_lines.append("  ]}\n")
        mdx_lines.append("/>\n")

    # Build MDX Content
    mdx_content = "---\n"
    mdx_content += f'title: "{existing_fm.get("title", title)}"\n'
    mdx_content += f'metaTitle: "{existing_fm.get("metaTitle", meta_title)}"\n'
    mdx_content += f'description: "{existing_fm.get("description", description)}"\n'
    mdx_content += f'date: "{existing_fm.get("date", date_str)}"\n'
    mdx_content += f'industry: "{existing_fm.get("industry", industry)}"\n'
    mdx_content += f'stakes: "{existing_fm.get("stakes", stakes)}"\n'
    mdx_content += f'tag: "{existing_fm.get("tag", tag)}"\n'

    hero_val = existing_fm.get("heroImage", f"/images/blog/post-{slug}-hero.jpg")
    og_val = existing_fm.get("ogImage", f"/images/blog/post-{slug}-og.jpg")

    mdx_content += f'heroImage: "{hero_val}"\n'
    mdx_content += f'ogImage: "{og_val}"\n'
    mdx_content += "---\n\n"

    mdx_content += "".join(mdx_lines)

    # Ensure there's a clean ending and no double empty lines
    mdx_content = re.sub(r'\n{3,}', '\n\n', mdx_content)

    # Always ensure AuditCTA is present at the end if not already added
    if "<AuditCTA" not in mdx_content:
        mdx_content += "\n<AuditCTA />\n"

    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(mdx_content)
    print(f"Generated MDX for {slug}")
    return True

def process_images(slug, organized_assets_dir, public_images_dir, is_original=False):
    hero_src = os.path.join(organized_assets_dir, 'assets', 'hero.png')
    og_src = os.path.join(organized_assets_dir, 'assets', 'og.png')
    infographic_src_png = os.path.join(organized_assets_dir, 'assets', 'infographic.png')
    infographic_src_jpg = os.path.join(organized_assets_dir, 'assets', 'infographic.jpg')

    hero_dest = os.path.join(public_images_dir, f'post-{slug}-hero.jpg')
    og_dest = os.path.join(public_images_dir, f'post-{slug}-og.jpg')
    infographic_dest = os.path.join(public_images_dir, f'post-{slug}-infographic.jpg')

    processed = False

    if not is_original and os.path.exists(hero_src):
        try:
            img = Image.open(hero_src)
            img = img.convert("RGB")
            # Resize and crop to 1440x810
            img_resized = resize_and_crop(img, 1440, 810)
            img_resized.save(hero_dest, "JPEG", quality=95)
            processed = True
        except Exception as e:
            print(f"Error processing hero image for {slug}: {e}")

    if not is_original and os.path.exists(og_src):
        try:
            img = Image.open(og_src)
            img = img.convert("RGB")
            # Resize and crop to 1024x540
            img_resized = resize_and_crop(img, 1024, 540)
            img_resized.save(og_dest, "JPEG", quality=95)
            processed = True
        except Exception as e:
            print(f"Error processing og image for {slug}: {e}")

    # Process infographic
    if os.path.exists(infographic_src_png):
        try:
            img = Image.open(infographic_src_png)
            img = img.convert("RGB")
            # Resize and contain (with side-padding) to 1200x675
            img_resized = resize_and_contain(img, 1200, 675)
            img_resized.save(infographic_dest, "JPEG", quality=95)
            processed = True
        except Exception as e:
            print(f"Error processing infographic PNG for {slug}: {e}")
    elif os.path.exists(infographic_src_jpg):
        try:
            img = Image.open(infographic_src_jpg)
            img = img.convert("RGB")
            # Resize and contain (with side-padding) to 1200x675
            img_resized = resize_and_contain(img, 1200, 675)
            img_resized.save(infographic_dest, "JPEG", quality=95)
            processed = True
        except Exception as e:
            print(f"Error processing infographic JPG for {slug}: {e}")

    return processed

def main():
    workspace_dir = '/Users/abimbolaolaitan/Desktop/SXA'
    posted_dir = os.path.join(workspace_dir, 'content/blog')
    manifest_path = os.path.join(workspace_dir, 'SXAblogs/organized-posts/manifest.json')
    public_images_dir = os.path.join(workspace_dir, 'public/images/blog')

    # 15 originally posted slugs that we do not want to overwrite/regenerate
    original_posted_slugs = {
        '30-minute-ai-presence-audit',
        'ai-visibility-vs-website-traffic',
        'ai-voice-agent-vs-live-receptionist',
        'beautiful-website-nobody-finds',
        'difference-between-known-and-findable',
        'digital-sovereignty-for-small-business',
        'fix-visibility-before-running-ads',
        'free-audit-tools-vs-paid-audit',
        'google-suspended-20-year-old-business',
        'how-to-become-the-answer-not-just-a-link',
        'indexed-by-google-vs-trusted-by-ai',
        'stop-googling-your-own-business',
        'what-happens-after-the-audit',
        'why-competitor-showing-up-chatgpt',
        'why-most-audits-deliver-pdf-and-disappear'
    }

    # Load manifest
    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    # Process all manifest items
    print(f"Found {len(manifest)} blog drafts in manifest to process.")

    # Stagger dates in June 2026 for unposted items
    start_date = datetime.date(2026, 6, 1)

    processed_count = 0
    for idx, item in enumerate(manifest):
        slug = item['slug']
        source = item['source']
        output_dir = item['output']
        is_original = slug in original_posted_slugs

        # Calculate date (only used if not preserving an existing date)
        date_str = (start_date + datetime.timedelta(days=idx)).isoformat()

        dest_mdx_path = os.path.join(posted_dir, f"{slug}.mdx")

        # Convert MD to MDX
        success = convert_draft_to_mdx(slug, source, dest_mdx_path, date_str, output_dir, is_original)
        if success:
            # Process Images
            process_images(slug, output_dir, public_images_dir, is_original)
            processed_count += 1

    print(f"\nSuccessfully processed {processed_count} blogs!")

if __name__ == "__main__":
    main()
