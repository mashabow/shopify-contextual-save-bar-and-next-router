import { Page, Layout, Card, TextField, Link } from "@shopify/polaris";
import { useField, useForm } from "@shopify/react-form";

import { useContextualSaveBar } from "../hooks/useContextualSaveBar";
import { useRedirect } from "../hooks/useRedirect";

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

  const redirectTo = useRedirect();

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
            <Link onClick={() => redirectTo("/another")}>
              Go to another page
            </Link>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Index;
