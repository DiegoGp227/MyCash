export type GoalStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";

export interface IContribution {
  id: string;
  amount: number;
  note: string | null;
  createdAt: string;
}

export interface IGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string | null;
  status: GoalStatus;
  icon: string | null;
  contributions: IContribution[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreateGoal {
  name: string;
  targetAmount: number;
  startDate?: string;
  endDate?: string | null;
  icon?: string;
}

export interface IUpdateGoal {
  name?: string;
  targetAmount?: number;
  endDate?: string | null;
  status?: GoalStatus;
  icon?: string;
}

export interface ICreateContribution {
  amount: number;
  note?: string;
}

export interface IGoalsResponse {
  goals: IGoal[];
}

export interface IGoalResponse {
  message: string;
  goal: IGoal;
}
