import { UserT } from "./user";

export type SessionT = {
  user: UserT | null;
  loading: boolean;
};
