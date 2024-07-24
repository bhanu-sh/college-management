import { SessionOptions } from "iron-session";

export interface SessionData {
    userId?: string;
    f_name?: string;
    l_name?: string;
    email?: string;
    role?: string;
    avatar?: string;
    college_id?: string;
    position?: string;

}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName: "session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};