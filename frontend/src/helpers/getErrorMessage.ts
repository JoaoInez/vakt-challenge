import { ErrorsT } from "types";

export const getErrorMessage = (error: ErrorsT) => {
  switch (error) {
    case "INTERNAL_SERVER_ERROR":
      return "Server error! Please try again.";
    case "USER_ALREADY_EXISTS":
      return "Username already in use!";
    case "PASSWORDS_DONT_MATCH":
      return "Passwords don't match!";
    case "INVALID_CREDENTIALS":
      return "Username or password incorrect!";
    default:
      return "";
  }
};
