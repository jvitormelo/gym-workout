import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/graphql/client";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
