const attempts = new Map<string, { count: number; resetAt: number }>();

export function checkLoginRateLimit(
  ip: string,
  max = 5,
  windowMs = 15 * 60 * 1000
): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

export function resetLoginAttempts(ip: string): void {
  attempts.delete(ip);
}
