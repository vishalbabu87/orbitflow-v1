import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://orbitflow.io';

export const usePageMeta = () => {
  const location = useLocation();

  useEffect(() => {
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `${BASE_URL}${location.pathname}`);
  }, [location]);
};
