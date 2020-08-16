import {
  fetchServerAPI,
  handleResJSON,
  handleResStatus,
  identity,
} from "helpers";
import {
  AllListingsResponse,
  GetListingResponse,
  CreateListingResponse,
  UpdateListingResponse,
  DeleteListingResponse,
} from "types";

export const allListingsAPI = (): Promise<AllListingsResponse> =>
  fetchServerAPI("/listing").then(handleResJSON).catch(identity);

export const getListingAPI = (id: string): Promise<GetListingResponse> =>
  fetchServerAPI(`/listing/${id}`).then(handleResJSON).catch(identity);

export const createListingAPI = ({
  name,
  description,
  price,
  currency,
}: {
  name: string;
  description?: string;
  price: string;
  currency?: string;
}): Promise<CreateListingResponse> =>
  fetchServerAPI("/listing", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      price,
      currency,
    }),
  })
    .then(handleResJSON)
    .catch(identity);

export const updateListingAPI = ({
  id,
  name,
  description,
  price,
  currency,
}: {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
}): Promise<UpdateListingResponse> =>
  fetchServerAPI(`/listing/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      description,
      price,
      currency,
    }),
  })
    .then(handleResJSON)
    .catch(identity);

export const deleteListingAPI = (id: string): Promise<DeleteListingResponse> =>
  fetchServerAPI(`/listing/${id}`, {
    method: "DELETE",
  })
    .then(handleResStatus)
    .catch(identity);
