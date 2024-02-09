import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes, { Pages } from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./providers";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { ShopContextProvider } from "./hooks";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  // const importMeta: any = import.meta;
  const pages: Pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", { eager: true });
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <ShopContextProvider>
            <LoadingIndicator />
            <NavigationMenu
              navigationLinks={[
                {
                  label: t("NavigationMenu.pageName"),
                  destination: "/pagename",
                },
              ]}
            />
            <Routes pages={pages} />
          </ShopContextProvider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
