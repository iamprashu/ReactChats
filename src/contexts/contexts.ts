import { createContext } from "react";
import type { T_AUTHPROVIDER } from "../lib/types";

export const AuthContext = createContext<T_AUTHPROVIDER | null>(null);
