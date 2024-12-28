import { type FC, useEffect, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SDKProvider, useLaunchParams } from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { AnimatePresence } from "framer-motion";


import {ErrorBoundary} from "./ErrorBoundary.tsx";
import {ModalControllerProvider} from "../shared/helper";
import {ClientProvider} from "../shared/context/ClientProvider.tsx";
import {initStore} from "../../apps/bogokoapp/src/shared/redux/store.ts";
import {App} from "../../apps/bogokoapp/src/components/App.tsx";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
});
const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
    <div>
        <p>An unhandled error occurred:</p>
        <blockquote>
            <code>
                {error instanceof Error
                    ? error.message
                    : typeof error === "string"
                      ? error
                      : JSON.stringify(error)}
            </code>
        </blockquote>
    </div>
);

const Inner: FC = () => {
    const debug = useLaunchParams().startParam === "debug";
    const manifestUrl = useMemo(() => {
        return new URL("tonconnect-manifest.json", window.location.href).toString();
    }, []);

    // Enable debug mode to see all the methods sent and events received.
    useEffect(() => {
        if (debug) {
            import("eruda").then((lib) => lib.default.init());
        }
    }, [debug]);

    return (
        <QueryClientProvider client={queryClient}>
            <AnimatePresence>
                <DndProvider backend={HTML5Backend}>
                    <Provider store={initStore()}>
                        <ModalControllerProvider>
                            <ClientProvider>
                                <TonConnectUIProvider manifestUrl={manifestUrl}>
                                    <SDKProvider acceptCustomStyles debug={debug}>
                                        <App />
                                    </SDKProvider>
                                </TonConnectUIProvider>
                            </ClientProvider>
                        </ModalControllerProvider>
                    </Provider>
                </DndProvider>
            </AnimatePresence>
        </QueryClientProvider>
    );
};

export const Root: FC = () => (
    <ErrorBoundary fallback={ErrorBoundaryError}>
        <Inner />
    </ErrorBoundary>
);
