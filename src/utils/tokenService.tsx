// utils/tokenService.ts
const REFRESH_THRESHOLD = 12 * 60 * 1000; // 12 minutes (refresh before 15 min expiration)

export const getTokenExpiration = (token: string): number | null => {
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch (e) {
    console.error('Error parsing token:', e);
    return null;
  }
};

export const shouldRefreshToken = (token: string): boolean => {
  const expiration = getTokenExpiration(token);
  if (!expiration) return false;
  
  const now = Date.now();
  return expiration - now < REFRESH_THRESHOLD;
};

// When first receiving tokens (after login/refresh)
export const storeTokens = (tokens: { accessToken: string, refreshToken: string }) => {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

// When clearing tokens (on logout)
export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};