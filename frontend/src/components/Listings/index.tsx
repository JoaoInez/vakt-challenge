import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { allListingsAPI, getLatestRatesNextAPI } from "api";
import { ListingT } from "types";
import styles from "./Listings.module.scss";
import { convertToGBP } from "helpers";

const Listings = () => {
  const [listings, setListings] = useState<
    (ListingT & { convertedPrice: number })[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await allListingsAPI();

      data.error === 401 && router.replace("/login");
      if (data.listings) {
        const currencies = Array.from(
          new Set(data.listings.map(({ currency }) => currency))
        );

        const latest = await getLatestRatesNextAPI(currencies);

        setListings(
          data.listings.map(
            (listing: ListingT & { convertedPrice: number }) => {
              listing["convertedPrice"] = convertToGBP(
                listing.price,
                listing.currency,
                latest.rates
              );
              return listing;
            }
          )
        );
      }
    })();
  }, []);

  return (
    <section className={styles.section}>
      <article className="container">
        <header>
          <h1>Listings</h1>
        </header>
        <div className="grid">
          {listings.map(({ id, name, convertedPrice, user }) => (
            <div key={id} className="card">
              <Link href="/listing/[id]" as={`/listing/${id}`}>
                <a className="content">
                  <p className="title">{name}</p>
                  <p>{convertedPrice}£</p>
                </a>
              </Link>
              <Link href="/user/[id]" as={`/user/${user.id}`}>
                <a className={styles.user}>{user.username}</a>
              </Link>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default Listings;
