import { fetchServerAPI, handleResJSON, identity } from "helpers";
import { CurrentUserResponse, GetUserResponse } from "types";

export const currentUserAPI = (): Promise<CurrentUserResponse> =>
  fetchServerAPI("/user").then(handleResJSON).catch(identity);

export const getUserAPI = (id: string): Promise<GetUserResponse> =>
  fetchServerAPI(`/user/${id}`).then(handleResJSON).catch(identity);
