import { createContext } from "react";
import type { AUTHCONTEXT } from "../../libs/types/auth";

export const AuthContext = createContext<AUTHCONTEXT | null>(null);
