import { Heading, Page } from "@shopify/polaris";
import Link from "next/link";

const Another = () => (
  <Page>
    <Heading>This is another page!</Heading>
    <p>
      <Link href="/">
        <a>Back to homepage</a>
      </Link>
    </p>
  </Page>
);

export default Another;
