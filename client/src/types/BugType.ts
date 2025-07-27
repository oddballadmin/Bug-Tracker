export interface BugType {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  reported_by: number; // User ID of the reporter
  assigned_to?: number; // User ID of the assignee, optional
}