import { Card, Page, Layout, BlockStack, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function PageName() {
  return (
    <Page>
      <TitleBar
        title="Page name"
        primaryAction={{
          content: "Primary action",
          onAction: () => console.log("Primary action"),
        }}
        secondaryActions={[
          {
            content: "Secondary action",
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card>
            <Text variant="headingMd" as="h2">
              Heading
            </Text>
            <BlockStack>
              <p>Body</p>
            </BlockStack>
          </Card>
          <Card>
            <Text variant="headingMd" as="h2">
              Heading
            </Text>
            <BlockStack>
              <p>Body</p>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Text variant="headingMd" as="h2">
              Heading
            </Text>
            <BlockStack>
              <p>Body</p>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
