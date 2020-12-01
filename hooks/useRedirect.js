import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useCallback } from "react";

export const useRedirect = () => {
  const app = useAppBridge();

  return useCallback(
    (path) => {
      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, path);
    },
    [app]
  );
};
