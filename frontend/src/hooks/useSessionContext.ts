import { useContext } from "react";
import SessionContext from "context/SessionContext";

const useSessionContext = () => useContext(SessionContext);

export default useSessionContext;
