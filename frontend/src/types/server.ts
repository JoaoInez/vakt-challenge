import { UserT, UserWithListingsT } from "./user";
import { ListingT } from "./listing";

export type Method = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
};

export type UserResponse = {
  user: UserT;
};

export type SignUpResponse = UserResponse & { error: 400 | 500 };
export type LoginResponse = UserResponse & { error: 400 | 500 };
export type LogoutResponse = 204 | { error: 401 | 500 };
export type AllListingsResponse = {
  listings: ListingT[];
} & { error: 401 | 500 };
export type GetListingResponse = { listing: ListingT } & {
  error: 401 | 404 | 500;
};
export type CreateListingResponse = { listing: ListingT } & {
  error: 400 | 401 | 500;
};
export type UpdateListingResponse = { listing: ListingT } & {
  error: 400 | 401 | 403 | 404 | 500;
};
export type DeleteListingResponse = 200 & { error: 401 | 403 | 404 | 500 };
export type CurrentUserResponse = UserResponse & { error: 401 | 500 };
export type GetUserResponse = { user: UserWithListingsT } & {
  error: 401 | 404 | 500;
};
