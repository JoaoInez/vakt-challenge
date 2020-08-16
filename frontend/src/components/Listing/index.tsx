import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ListingForm from "components/ListingForm";
import useSessionContext from "hooks/useSessionContext";
import {
  getListingAPI,
  deleteListingAPI,
  updateListingAPI,
  getLatestRatesNextAPI,
} from "api";
import { convertToGBP } from "helpers";
import { ListingT, ListingFunctionT } from "types";
import styles from "./Listing.module.scss";

const Listing = () => {
  const [listing, setListing] = useState<
    (ListingT & { convertedPrice: number }) | null
  >(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [session] = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getListingAPI(router.query.id as string);

      data.error === 401 && router.replace("/login");
      if (data.listing) {
        const latest = await getLatestRatesNextAPI(data.listing.currency);

        setListing({
          ...data.listing,
          convertedPrice: convertToGBP(
            data.listing.price,
            data.listing.currency,
            latest.rates
          ),
        });
      }
    })();
  }, []);

  const deleteListing = async () => {
    if (listing?.id) {
      const data = await deleteListingAPI(`${listing.id}`);

      data.error === 401 && router.replace("/login");
      data === 200 && router.replace("/user/[id]", `/user/${session.user?.id}`);
    }
  };

  const updateListing: ListingFunctionT = async ({
    name,
    description,
    price,
    currency,
  }) => {
    if (listing?.id) {
      const data = await updateListingAPI({
        id: `${listing.id}`,
        name,
        description,
        price,
        currency,
      });

      data.error === 401 && router.replace("/login");
      if (data.listing) {
        const latest = await getLatestRatesNextAPI(data.listing.currency);

        setListing({
          ...data.listing,
          convertedPrice: convertToGBP(
            data.listing.price,
            data.listing.currency,
            latest.rates
          ),
        });
        setEditing(false);
      }
    }
  };

  const toggleEditing = () => {
    setEditing((_editing) => !_editing);
  };

  return (
    <section className={styles.section}>
      {!editing ? (
        <article className="container">
          <header className={styles.topContainer}>
            <h1>{listing?.name}</h1>
            {session.user?.id === listing?.user.id && (
              <div>
                <button
                  className={`btn-primary ${styles.deleteBtn}`}
                  onClick={deleteListing}
                >
                  Delete
                </button>
                <button
                  className={`btn-primary ${styles.editBtn}`}
                  onClick={toggleEditing}
                >
                  Edit
                </button>
              </div>
            )}
          </header>
          {listing?.description && (
            <>
              <h4>Description:</h4>
              <p>{listing?.description}</p>
            </>
          )}
          <div className={styles.bottomContainer}>
            <div>
              <h4>Price:</h4>
              <p>{listing?.convertedPrice}£</p>
            </div>
            <div className={styles.userContainer}>
              <h4>Posted by:</h4>
              <Link href="/user/[id]" as={`/user/${listing?.user.id}`}>
                <a>{listing?.user.username}</a>
              </Link>
            </div>
          </div>
        </article>
      ) : (
        <article className="container">
          <ListingForm
            listing={listing || undefined}
            submitButtonLabel="Update"
            onSubmitFn={updateListing}
            cancelBtn={
              <button
                className={`btn-primary ${styles.cancelBtn}`}
                onClick={toggleEditing}
              >
                Cancel
              </button>
            }
          />
        </article>
      )}
    </section>
  );
};

export default Listing;
