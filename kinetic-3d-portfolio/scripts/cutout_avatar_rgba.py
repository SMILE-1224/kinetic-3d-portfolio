#!/usr/bin/env python3
"""
Clean RGBA cutout extractor for 3D portraits and studio props rendered on
solid dark (#08080A) or light (#FFFFFF) backgrounds without edge halos.

Usage:
    python cutout_avatar_rgba.py input.jpg output.png [--tolerance 34] [--feather 14]
"""

import argparse
from collections import deque
from PIL import Image


def sample_corner_bg(px, w, h):
    """Estimate background RGB color by averaging the 4 image corners."""
    samples = []
    margin = max(2, min(12, w // 30, h // 30))
    coords = [
        (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
        (margin, 0), (w - 1 - margin, 0), (0, margin), (w - 1, margin),
    ]
    for x, y in coords:
        r, g, b = px[x, y][:3]
        samples.append((r, g, b))
    n = len(samples)
    return tuple(sum(c[i] for c in samples) / n for i in range(3))


def color_dist(rgb, bg):
    return ((rgb[0] - bg[0]) ** 2 + (rgb[1] - bg[1]) ** 2 + (rgb[2] - bg[2]) ** 2) ** 0.5


def extract_rgba(src_path, dst_path, tolerance=32.0, feather=14.0):
    im = Image.open(src_path).convert("RGBA")
    w, h = im.size
    px = im.load()
    bg = sample_corner_bg(px, w, h)

    # Flood-fill from all border pixels so enclosed highlights/eyes stay untouched.
    visited = [[False] * h for _ in range(w)]
    bg_mask = [[False] * h for _ in range(w)]
    q = deque()

    def try_seed(x, y):
        if not visited[x][y] and color_dist(px[x, y][:3], bg) <= tolerance:
            visited[x][y] = True
            q.append((x, y))

    for x in range(w):
        try_seed(x, 0)
        try_seed(x, h - 1)
    for y in range(h):
        try_seed(0, y)
        try_seed(w - 1, y)

    while q:
        x, y = q.popleft()
        bg_mask[x][y] = True
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
                visited[nx][ny] = True
                if color_dist(px[nx, ny][:3], bg) <= tolerance + feather:
                    q.append((nx, ny))

    # Apply soft alpha feathering & trim stray halos around the flood perimeter.
    for x in range(w):
        for y in range(h):
            r, g, b, a = px[x, y]
            if bg_mask[x][y]:
                d = color_dist((r, g, b), bg)
                if d <= tolerance:
                    px[x, y] = (0, 0, 0, 0)
                else:
                    ratio = min(1.0, max(0.0, (d - tolerance) / max(1.0, feather)))
                    px[x, y] = (r, g, b, int(255 * (ratio ** 1.35)))

    bbox = im.getbbox()
    if bbox:
        pad = 6
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad),
        )
        im = im.crop(crop_box)

    im.save(dst_path, "PNG")
    return im.size, bg


def main():
    parser = argparse.ArgumentParser(description="Clean RGBA cutout extractor for 3D studio renders.")
    parser.add_argument("input", help="Input image path")
    parser.add_argument("output", help="Output PNG path")
    parser.add_argument("--tolerance", type=float, default=32.0, help="Background color distance threshold")
    parser.add_argument("--feather", type=float, default=14.0, help="Soft edge transition width")
    args = parser.parse_args()

    size, bg = extract_rgba(args.input, args.output, args.tolerance, args.feather)
    print(f"Saved clean RGBA cutout: {args.output} size={size} bg_key={tuple(round(v, 1) for v in bg)}")


if __name__ == "__main__":
    main()
