import { useCallback, useState } from "react";
import { fetcher } from "@/utils/utils";
import { StatsURL } from "@/shared/constants/urls";
import { IDashboardSummary, IDashboardResponse } from "../types/dashboard.types";

export function useDashboardStats() {
  const [summary, setSummary] = useState<IDashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetcher<IDashboardResponse>(StatsURL.toString());
      setSummary(response.summary);
      return response.summary;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar el dashboard");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { summary, isLoading, error, fetchSummary };
}
