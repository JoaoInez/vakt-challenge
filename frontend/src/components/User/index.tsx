import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSessionContext from "hooks/useSessionContext";
import { getUserAPI, logoutAPI, getLatestRatesNextAPI } from "api";
import { convertToGBP } from "helpers";
import { UserWithListingsT } from "types";
import styles from "./User.module.scss";

const User = () => {
  const [user, setUser] = useState<UserWithListingsT | null>(null);
  const [session, setSession] = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    setUser(null);

    (async () => {
      const data = await getUserAPI(router.query.id as string);

      data.error === 401 && router.replace("/login");
      if (data.user) {
        const currencies = Array.from(
          new Set(data.user.listings.map(({ currency }) => currency))
        );

        const latest = await getLatestRatesNextAPI(currencies);

        setUser({
          ...data.user,
          listings: data.user.listings.map((listing) => {
            listing["convertedPrice"] = convertToGBP(
              listing.price,
              listing.currency,
              latest.rates
            );
            return listing;
          }),
        });
      }
    })();
  }, [router]);

  const logout = async () => {
    const data = await logoutAPI();

    if (data === 204)
      setSession((_session) => ({ user: null, loading: _session.loading }));
    router.replace("/");
  };

  return (
    <section className={styles.section}>
      <article className="container">
        <header className={styles.header}>
          <h1>{user?.username}</h1>
          {`${session.user?.id}` === router.query.id && (
            <div>
              <Link href="/listing">
                <a className={`btn-primary ${styles.addBtn}`}>Add listing</a>
              </Link>
              <button
                className={`btn-primary ${styles.logoutBtn}`}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </header>
        <div className="grid">
          {user?.listings.map(({ id, name, convertedPrice }) => (
            <div key={id} className="card">
              <Link href="/listing/[id]" as={`/listing/${id}`}>
                <a className="content">
                  <p className="title">{name}</p>
                  <p>{convertedPrice}£</p>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default User;
