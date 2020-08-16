import { useRouter } from "next/router";
import ListingForm from "components/ListingForm";
import { createListingAPI } from "api";
import { ListingFunctionT } from "types";
import styles from "./CreateListing.module.scss";

const CreateListing = () => {
  const router = useRouter();

  const createListing: ListingFunctionT = async ({
    name,
    description,
    price,
    currency,
  }) => {
    const data = await createListingAPI({
      name,
      description,
      price,
      currency,
    });

    data.error === 401 && router.replace("/login");
    data.listing &&
      router.replace("/listing/[id]", `/listing/${data.listing.id}`);
  };

  return (
    <section className={styles.section}>
      <article className="container">
        <header>
          <h1>Create Listing</h1>
        </header>
        <ListingForm submitButtonLabel="Create" onSubmitFn={createListing} />
      </article>
    </section>
  );
};

export default CreateListing;
