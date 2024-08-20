export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export enum Status {
  All = "all",
  Completed = "completed",
  Active = "active"
}
