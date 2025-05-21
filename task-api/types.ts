export interface Task {
  id: string;
  created: Date,
  title: string;
  description: string;
  completed: boolean;
  due?: Date
}
