"use client"

import { useState, useEffect } from 'react';
// Using a relative path is a safe bet for JSON in some TS environments
import dashboardData from '../data/mockup-db.json';

export function useDashboardData() {
  const [data, setData] = useState(dashboardData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(dashboardData);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
}