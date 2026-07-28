const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Next.js prefixes routes and framework assets automatically when `basePath`
 * is set, but files served directly from `public/` need the prefix explicitly.
 */
export function withBasePath(path: string) {
  if (!basePath || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}
