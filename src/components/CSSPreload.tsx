'use client';

import { useEffect } from 'react';

export default function CSSPreload() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/_next/static/css/app/layout.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null;
}
