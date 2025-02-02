import { useState } from "react";
import { Card, Text, BlockStack, Button } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient, useMutation, type QueryKey } from "@tanstack/react-query";
import { useAuthenticatedFetch } from "../hooks";

function useProductCount() {
  const fetch = useAuthenticatedFetch();
  return useQuery({
    "queryKey": ["api", "products", "count"], 
    queryFn: async () => {
      const { count } = await fetch("/api/products/count").then((res) =>
        res.json()
      );
      return count as number;
    }
  });
}

function useProductCreate(noOfProducts = 2, showToast: (msg: string) => void) {
  const { t } = useTranslation(undefined, {
    keyPrefix: 'ProductsCard'
  });
  const queryClient = useQueryClient();
  const fetch = useAuthenticatedFetch();
  return useMutation({
    "mutationKey": ["api", "product"],
    "mutationFn": async () => {
      await fetch("/api/products/create/" + noOfProducts);
    },
    "onMutate": async () => {
      showToast("Updating...");
      await queryClient.cancelQueries({
        "queryKey": ["api", "products", "count"]
      });
      const path: QueryKey = ["api", "products", "count"];
      const previousCount: number = +queryClient.getQueryData(path);
      queryClient.setQueryData(
        ["api", "products", "count"],
        () => previousCount + 2
      );
      return { previousCount };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["api", "products", "count"],
        context?.previousCount
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        "queryKey": ["api", "products", "count"]
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        {
          "queryKey": ["api", "products", "count"]
        }
      );
      showToast(t('productsCreatedToast', { count: 2 }));
    }
  });
}

export default function ProductsCard() {
  const { t } = useTranslation(undefined, {
    keyPrefix: 'ProductsCard'
  });
  const [{ toast }, setToast] = useState({ toast: { msg: "", show: false } });
  const showToast = (msg: string) => {
    setToast({ toast: { msg: "", show: false } });
    setToast({ toast: { msg, show: true } });
  };
  const { mutate } = useProductCreate(2, showToast);
  const { data: count, isLoading, error } = useProductCount();

  const toastMarkup = toast.show && (
    <Toast
      content={toast.msg}
      onDismiss={() => setToast({ toast: { msg: "", show: false } })}
    />
  );

  return (
    <>
      {toastMarkup}
      <Card>
        <BlockStack gap="025">
          <p>{t("description")}</p>
          <Text variant="headingMd" as="h1">
            {t("totalProductsHeading")}
            <Text variant="heading2xl" as="p">
              <>
                {isLoading && ".."}
                {error && t('errorCreatingProductsToast')}
                {!isLoading && count}
              </>
            </Text>
          </Text>
          <Button loading={isLoading} onClick={mutate}>{t('populateProductsButton', { count: 2 })}</Button>
        </BlockStack>
      </Card>
    </>
  );
}