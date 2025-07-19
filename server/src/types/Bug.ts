export type BugType = {
    id?: number; // Optional for new bugs
    title: string;
    description: string;
    status: 'open' | 'in-progress' | 'closed';
    created_at?: Date; // Optional, will be set by the server
    updated_at?: Date; // Optional, will be set by the server
    reported_by: string; // Username of the user who reported the bug
    assigned_to?: string; // Username of the user assigned to the bug
}