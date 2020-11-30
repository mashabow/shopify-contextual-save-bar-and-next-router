import fetch from "node-fetch";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App, { Container } from "next/app";
import { useRouter } from "next/router";
import { AppProvider } from "@shopify/polaris";
import { Provider, useClientRouting } from "@shopify/app-bridge-react";
import Cookies from "js-cookie";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";

const client = new ApolloClient({
  fetch: fetch,
  fetchOptions: {
    credentials: "include",
  },
});

const MyRouter = ({ children }) => {
  const router = useRouter()
  useClientRouting(router);

  return children;
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const shopOrigin = Cookies.get("shopOrigin");
    return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            apiKey: API_KEY,
            shopOrigin: shopOrigin,
            forceRedirect: true,
          }}
        >
          <ApolloProvider client={client}>
            <MyRouter>
              <Component {...pageProps} />
            </MyRouter>
          </ApolloProvider>
        </Provider>
      </AppProvider>
    );
  }
}

export default MyApp;
