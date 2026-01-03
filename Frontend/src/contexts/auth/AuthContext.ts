import { createContext } from "react";
import type { I_AUTHCONTEXT } from "../../lib/types";

export const AuthContext = createContext<I_AUTHCONTEXT | null>(null);
