import { useCallback, useState } from "react";
import { goalsService } from "../services/goalsService";
import {
  IGoal,
  ICreateGoal,
  IUpdateGoal,
  ICreateContribution,
  GoalStatus,
} from "../types/goals.types";

export function useGoals() {
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async (status?: GoalStatus) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await goalsService.getGoals(status);
      setGoals(response.goals);
      return response.goals;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error fetching goals";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createGoal = useCallback(async (data: ICreateGoal) => {
    setIsCreating(true);
    setError(null);
    try {
      const response = await goalsService.createGoal(data);
      setGoals((prev) => [response.goal, ...prev]);
      return response.goal;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error creating goal";
      setError(msg);
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, []);

  const updateGoal = useCallback(async (goalId: string, data: IUpdateGoal) => {
    setIsUpdating(true);
    setError(null);
    try {
      const response = await goalsService.updateGoal(goalId, data);
      setGoals((prev) => prev.map((g) => (g.id === goalId ? response.goal : g)));
      return response.goal;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error updating goal";
      setError(msg);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const deleteGoal = useCallback(async (goalId: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      await goalsService.deleteGoal(goalId);
      setGoals((prev) => prev.filter((g) => g.id !== goalId));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error deleting goal";
      setError(msg);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const addContribution = useCallback(
    async (goalId: string, data: ICreateContribution) => {
      setError(null);
      try {
        const response = await goalsService.addContribution(goalId, data);
        setGoals((prev) => prev.map((g) => (g.id === goalId ? response.goal : g)));
        return response.goal;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error adding contribution";
        setError(msg);
        throw err;
      }
    },
    [],
  );

  const deleteContribution = useCallback(
    async (goalId: string, contributionId: string) => {
      setError(null);
      try {
        const response = await goalsService.deleteContribution(goalId, contributionId);
        setGoals((prev) => prev.map((g) => (g.id === goalId ? response.goal : g)));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error deleting contribution";
        setError(msg);
        throw err;
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    goals,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    addContribution,
    deleteContribution,
    clearError,
  };
}
