export type AUTHCONTEXT = {
  isSessionActive: boolean;
  login: () => void;
  logout: () => void;
};
