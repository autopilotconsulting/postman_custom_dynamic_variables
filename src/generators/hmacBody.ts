export function hmacBody(algorithm: string, secret: string): string {
  const hmacFunction = (CryptoJS as any)[`Hmac${algorithm}`];

  const body = (pm.request.body || {}).raw || '';
  return hmacFunction(body, secret).toString();
}
