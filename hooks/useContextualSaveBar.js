import { useEffect, useMemo } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { ContextualSaveBar } from '@shopify/app-bridge/actions';

export const useContextualSaveBar = ({
  dirty,
  submit,
  submitting,
  reset,
}) => {
  const app = useAppBridge();

  const contextualSaveBar = useMemo(
    () =>
      ContextualSaveBar.create(app, {
        saveAction: {
          disabled: false,
          loading: false,
        },
        discardAction: {
          disabled: false,
          loading: false,
          discardConfirmationModal: true,
        },
      }),
    [app],
  );

  useEffect(() => {
    const discardUnsubscribe = contextualSaveBar.subscribe(
      ContextualSaveBar.Action.DISCARD,
      reset,
    );

    const saveUnsubscribe = contextualSaveBar.subscribe(
      ContextualSaveBar.Action.SAVE,
      submit,
    );

    return () => {
      discardUnsubscribe();
      saveUnsubscribe();
    };
  }, [contextualSaveBar, reset, submit]);

  useEffect(() => {
    contextualSaveBar.set({ saveAction: { loading: submitting } });
  }, [contextualSaveBar, submitting]);

  useEffect(() => {
    contextualSaveBar.dispatch(
      dirty ? ContextualSaveBar.Action.SHOW : ContextualSaveBar.Action.HIDE,
    );
  }, [contextualSaveBar, dirty]);
};
