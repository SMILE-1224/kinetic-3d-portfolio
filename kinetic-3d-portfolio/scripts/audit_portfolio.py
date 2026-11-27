#!/usr/bin/env python3
"""
Static integrity, asset (.png/.jpg/.webp/.svg) & layout-redline audit for Kinetic 3D Portfolios.

Usage:
    python audit_portfolio.py ./project-root [--privacy-regex "pattern1|pattern2"]
"""

import argparse
import os
import re
import sys
import xml.etree.ElementTree as ET
from PIL import Image


REQUIRED_FILES = ["index.html", "styles.css", "app.js"]
REQUIRED_DOM_IDS = [
    "heroAvatarWrap",
    "sec-about",
    "sec-works",
    "sec-workflows",
    "sec-lab",
    "sec-contact",
    "quickFloatBar",
]


def verify_asset_file(fp):
    ext = os.path.splitext(fp)[1].lower()
    if ext == ".svg":
        with open(fp, "r", encoding="utf-8") as f:
            txt = f.read().strip()
        if not txt:
            raise ValueError("Empty SVG file")
        ET.fromstring(txt)
        return
    with Image.open(fp) as im:
        im.verify()


def audit(root, privacy_pattern=None):
    errors = []

    for fn in REQUIRED_FILES:
        if not os.path.exists(os.path.join(root, fn)):
            errors.append(f"Missing core file: {fn}")
    if errors:
        return errors

    with open(os.path.join(root, "index.html"), "r", encoding="utf-8") as f:
        html_txt = f.read()
    with open(os.path.join(root, "styles.css"), "r", encoding="utf-8") as f:
        css_txt = f.read()

    if 'id="preloader"' in html_txt:
        errors.append("Redline violation: #preloader black-curtain splash found in index.html")
    if "Kanit" not in html_txt:
        errors.append("Typography check: Google Font Kanit missing from index.html <head>")

    for dom_id in REQUIRED_DOM_IDS:
        if f'id="{dom_id}"' not in html_txt:
            errors.append(f"Missing required section/hook ID: #{dom_id}")

    if "overflow-x: hidden" in css_txt and "overflow-x: clip" not in css_txt:
        errors.append("Redline violation: styles.css uses overflow-x: hidden instead of overflow-x: clip (breaks sticky cards)")

    # Verify all relative ./assets/* paths in HTML, JS, CSS files
    asset_refs = set()
    for fn in os.listdir(root):
        if fn.endswith((".html", ".js", ".css")):
            with open(os.path.join(root, fn), "r", encoding="utf-8") as f:
                txt = f.read()
            for match in re.findall(r'\./assets/[^"\'\s\)]+', txt):
                asset_refs.add(match[2:])

    for rel in sorted(asset_refs):
        fp = os.path.join(root, rel)
        if not os.path.exists(fp):
            errors.append(f"Missing asset file: {rel}")
            continue
        try:
            verify_asset_file(fp)
        except Exception as exc:
            errors.append(f"Corrupted asset {rel}: {exc}")

    if privacy_pattern:
        rx = re.compile(privacy_pattern)
        for fn in os.listdir(root):
            if fn.endswith((".html", ".js", ".css")):
                with open(os.path.join(root, fn), "r", encoding="utf-8") as f:
                    hits = rx.findall(f.read())
                if hits:
                    errors.append(f"Privacy leak in {fn}: {sorted(set(hits))}")

    print(f"Audited {len(asset_refs)} visual assets in {root}")
    return errors


def main():
    parser = argparse.ArgumentParser(description="Audit Kinetic 3D Portfolio build.")
    parser.add_argument("root", nargs="?", default=".", help="Portfolio root directory")
    parser.add_argument("--privacy-regex", default=None, help="Optional regex of forbidden real names/school strings")
    args = parser.parse_args()

    errs = audit(os.path.abspath(args.root), args.privacy_regex)
    if errs:
        print("AUDIT FAILED:")
        for e in errs:
            print(" -", e)
        sys.exit(1)
    print("AUDIT PASSED: 0 errors, all assets valid, sticky & typography redlines clean.")


if __name__ == "__main__":
    main()
