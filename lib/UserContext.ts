import { createContext } from "react";
import { User } from "firebase/auth";

interface UserCtx {
  user: null | User | undefined;
  isAdmin: null | Boolean;
}

export const UserContext = createContext({
  user: null,
  isAdmin: null,
} as UserCtx);
