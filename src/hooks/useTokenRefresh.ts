// hooks/useTokenRefresh.ts
import { useEffect } from 'react';
import { shouldRefreshToken } from '../utils/tokenService';
import { refreshToken } from '../api/userAuth'
import { useSetSelected } from './useSetSelected';

const useTokenRefresh = () => {
  const setSelected = useSetSelected();
  
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('authToken');
      if (token && shouldRefreshToken(token)) {
        try {
          await refreshToken((newToken) => {
            setSelected("refreshToken", newToken);
          });
        } catch (error) {
          console.error('Background token refresh failed:', error);
        }
      }
    };

    // Check immediately
    checkToken();

    // Set up interval to check every 3s minutes
    const interval = setInterval(checkToken, 3 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
};

export default useTokenRefresh;