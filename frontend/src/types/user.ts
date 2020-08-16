export type UserT = {
  id: number;
  username: string;
};

export type UserWithListingsT = {
  username: string;
  listings: {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    convertedPrice: number;
  }[];
};
