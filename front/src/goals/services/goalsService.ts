import { fetcher, postFetcher, patchFetcher, deleteFetcher } from "@/utils/utils";
import { GoalsURL } from "@/shared/constants/urls";
import {
  IGoalsResponse,
  IGoalResponse,
  ICreateGoal,
  IUpdateGoal,
  ICreateContribution,
  GoalStatus,
} from "../types/goals.types";

export const goalsService = {
  async getGoals(status?: GoalStatus): Promise<IGoalsResponse> {
    const url = new URL(GoalsURL);
    if (status) url.searchParams.append("status", status);
    return fetcher<IGoalsResponse>(url.toString());
  },

  async createGoal(data: ICreateGoal): Promise<IGoalResponse> {
    return postFetcher<IGoalResponse>(GoalsURL.toString(), data);
  },

  async updateGoal(goalId: string, data: IUpdateGoal): Promise<IGoalResponse> {
    return patchFetcher<IGoalResponse>(`${GoalsURL.toString()}/${goalId}`, data);
  },

  async deleteGoal(goalId: string): Promise<void> {
    await deleteFetcher(`${GoalsURL.toString()}/${goalId}`);
  },

  async addContribution(goalId: string, data: ICreateContribution): Promise<IGoalResponse> {
    return postFetcher<IGoalResponse>(
      `${GoalsURL.toString()}/${goalId}/contributions`,
      data,
    );
  },

  async deleteContribution(goalId: string, contributionId: string): Promise<IGoalResponse> {
    return deleteFetcher(
      `${GoalsURL.toString()}/${goalId}/contributions/${contributionId}`,
    ) as Promise<IGoalResponse>;
  },
};
