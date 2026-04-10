export function matchesProtect(patterns: (string | RegExp)[], pathname: string): boolean {
  return patterns.some((p) =>
    p instanceof RegExp
      ? p.test(pathname)
      : p === "/" || pathname === p || pathname.startsWith(p + "/")
  );
}
