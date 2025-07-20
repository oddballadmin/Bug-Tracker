export type UserType = {
    username: string;
    email: string;
    password?: string;
    id?: number; // Optional, can be undefined for new users
    
}