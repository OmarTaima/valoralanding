// Utilities for generating/normalizing English-friendly slugs for projects.
export const EN_SLUG_MAP = {
  'فالورا-قطيني': 'valora-qutteeny',
  'فالورا-البطرويشي': 'valora-elbatraweeshy',
};

export function slugify(text) {
  if (!text) return '';
  return String(text)
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

// Return an English slug for a project object.
// Priority: EN_SLUG_MAP override -> project.name.en -> project.title -> project._id -> original slug
export function getEnSlug(project) {
  if (!project) return '';
  const original = project.slug || project._id || '';
  if (EN_SLUG_MAP[original]) return EN_SLUG_MAP[original];
  const enName = project.name?.en || project.title || project.name?.en || '';
  if (enName) {
    const s = slugify(enName);
    if (s) return s;
  }
  // Final fallback: use id (never use Arabic slug as URL)
  return String(project._id || original || '').replace(/[^a-z0-9-]/gi, '-');
}
