export type T_AUTHPROVIDER = {
  isSessionActive: boolean;
  sessionLoadded: boolean;
  login: () => void;
  logOut: () => void;
};
