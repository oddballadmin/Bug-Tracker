import { UserType } from "../types/User";

export const setCookieAuth = ({username, email, id}: UserType) => {

    return {
        user: {
            id,
            username,
            email,
            loggedIn: true,
            role: "user", 
            num_bugs_reported: 0
        },
        options: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: false,
             sameSite: 'none',      // explicitly allow cross‑site
  secure: true

        }
    };

}