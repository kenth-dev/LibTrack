from __future__ import annotations

import re


def slugify_title(title: str) -> str:
    slug = title.strip().lower()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = re.sub(r"-+", "-", slug)
    return slug.strip("-")


def cover_image_path(title: str) -> str:
    return f"/static/books/{slugify_title(title)}.jpg"
