import { UserT } from "./user";

export type ListingT = {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  user: UserT;
};

export type ListingFunctionT = (listing: {
  name: string;
  description: string;
  price: string;
  currency: string;
}) => Promise<void>;
