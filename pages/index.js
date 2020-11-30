import { Page, Layout, Card, TextField } from "@shopify/polaris";
import Link from "next/link";
import { useField, useForm } from "@shopify/react-form";

import { useContextualSaveBar } from "../hooks/useContextualSaveBar";

const Index = () => {
  const { fields, dirty, submit, submitting, reset } = useForm({
    fields: {
      text: useField({
        value: "",
      }),
    },
    async onSubmit(form) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(form.text);
      return { status: "success" };
    },
    makeCleanAfterSubmit: true,
  });

  useContextualSaveBar({ dirty, submit, submitting, reset });

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card
            title="Form"
            sectioned
            primaryFooterAction={{
              content: "Submit",
              disabled: !dirty,
              loading: submitting,
              onAction: submit,
            }}
          >
            <TextField label="Text" {...fields.text} />
          </Card>

          <Card sectioned>
            <Link href="/another">
              <a>Go to another page</a>
            </Link>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Index;
