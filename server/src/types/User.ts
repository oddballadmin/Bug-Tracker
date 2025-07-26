export type UserType = {
	username: string;
	email: string;
	id?: number;
	password?: string;
	role?: string;
    num_bugs_reported?: number; // Optional, can be undefined for new users
};
