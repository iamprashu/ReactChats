import type { Dispatch, SetStateAction } from "react";

export type AUTHCONTEXT = {
  isSessionActive: boolean;
  sessionLoaded: boolean;
  login: () => void;
  logoutSession: () => void;
  setSessionLoaded: Dispatch<SetStateAction<boolean>>;
};
