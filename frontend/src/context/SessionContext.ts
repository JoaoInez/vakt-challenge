import { createContext, Dispatch, SetStateAction } from "react";
import { SessionT } from "types";

type ContextProps = [SessionT, Dispatch<SetStateAction<SessionT>>];

const UserContext = createContext<ContextProps>(
  (undefined as unknown) as ContextProps
);

export default UserContext;
