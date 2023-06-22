export function extractTokenFromSignedCookie(cookie) {
  return cookie.split('=')[1].split('s%3A')[1].split('.').slice(0, -1).join('.')
}
