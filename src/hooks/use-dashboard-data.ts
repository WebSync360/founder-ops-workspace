import { useState, useEffect } from 'react';
import db from '@/data/mock-db.json';

export function useDashboardData() {
  const [data, setData] = useState(db);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay for a premium "skeleton" loading feel
    const timer = setTimeout(() => {
      setData(db);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
}