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

/** Static page directories need a trailing slash before query/hash suffixes. */
export function staticPageHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const [, pathname, suffix] = href.match(/^([^?#]*)(.*)$/)!;
  const pagePath = pathname.endsWith("/") || /\.[^/]+$/.test(pathname)
    ? pathname
    : `${pathname}/`;
  return withBasePath(pagePath) + suffix;
}
