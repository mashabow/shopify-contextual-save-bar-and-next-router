import { useEffect } from "react";
import { useRouter } from "next/router";

export const useLeavePrevention = ({ dirty, reset }) => {
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      if (!dirty) return;

      if (window.confirm("Are you sure you want to leave?")) {
        reset();
      } else {
        router.events.emit("routeChangeError");
        throw "routeChange aborted.";
      }
    };

    router.events.on("routeChangeStart", handler);
    return () => {
      router.events.off("routeChangeStart", handler);
    };
  }, [dirty, reset, router.events]);
};
