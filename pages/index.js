import { Heading, Page } from "@shopify/polaris";
import Link from "next/link";

const Index = () => (
  <Page>
    <Heading>Shopify app with Node and React 🎉</Heading>
    <p>
      <Link href="/another">
        <a>Go to another page</a>
      </Link>
    </p>
  </Page>
);

export default Index;
