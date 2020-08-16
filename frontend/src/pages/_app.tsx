import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Layout from "components/common/Layout";
import { currentUserAPI } from "api";
import SessionContext from "context/SessionContext";
import { SessionT } from "types";
import "styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const sessionState = useState<SessionT>({ user: null, loading: true });
  const [_, setSession] = sessionState;

  useEffect(() => {
    (async () => {
      const data = await currentUserAPI();

      data.error === 401 && setSession({ user: null, loading: false });
      data.user && setSession({ user: data.user, loading: false });
    })();
  }, []);

  return (
    <SessionContext.Provider value={sessionState}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContext.Provider>
  );
};

export default MyApp;
