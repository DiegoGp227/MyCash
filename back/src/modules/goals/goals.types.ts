export type GoalStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";

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

export interface IContribution {
  id: string;
  amount: number;
  note: string | null;
  createdAt: Date;
}

export interface IGoalResponse {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  startDate: Date;
  endDate: Date | null;
  status: GoalStatus;
  icon: string | null;
  contributions: IContribution[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IGoalFilters {
  status?: GoalStatus;
}
