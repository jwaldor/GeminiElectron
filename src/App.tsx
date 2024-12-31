import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ClientPage } from "@/components/ClientPage";
import ErrorPage from "@/components/ErrorPage";
import { Layout } from "@/components/Layout";
import QueryClientProvider from "@/components/QueryClientProvider";
import { Toaster } from "@/components/ui/toaster";
import { AppStateProvider } from "@/contexts/AppStateProvider";
import { LoaderCircleIcon } from "lucide-react";
if (!import.meta.env.VITE_SERVER_URL) {
  throw new Error("VITE_SERVER_URL is not set");
}
else {
  console.log("VITE_SERVER_URL is set");
}

function App() {
  const [websocketEnabled, setWebsocketEnabled] = useState<boolean>();
  const [webrtcEnabled, setWebrtcEnabled] = useState<boolean>();
  const [geminiApiKey, setGeminiApiKey] = useState<string>("");

  useEffect(() => {
    const abort = new AbortController();
    fetch(`${import.meta.env.VITE_SERVER_URL}/`, {
      signal: abort.signal,
    })
      .then((response) => response.json())
      .then((json) => {
        setWebsocketEnabled(json?.["websocket-enabled"] ?? false);
        setWebrtcEnabled(json?.["webrtc-enabled"] ?? false);
        setGeminiApiKey(json?.["gemini-api-key"] ?? "");
      })
      .catch(() => {
        setWebsocketEnabled(false);
        setWebrtcEnabled(false);
        setGeminiApiKey("");
      });
    return () => abort.abort();
  }, []);

  if (websocketEnabled === undefined && webrtcEnabled === undefined) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <LoaderCircleIcon className="animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!websocketEnabled && !webrtcEnabled) {
    return (
      <ErrorPage title="Missing configuration">
        The server is missing both <code>GEMINI_API_KEY</code> and{" "}
        <code>DAILY_API_KEY</code>.
      </ErrorPage>
    );
  }

  return (
    <QueryClientProvider>
      <AppStateProvider
        geminiApiKey={geminiApiKey}
        webrtcEnabled={webrtcEnabled ?? false}
        websocketEnabled={websocketEnabled ?? false}
      >
        <Layout>
          <ClientPage />
          <Toaster />
        </Layout>
      </AppStateProvider>
    </QueryClientProvider>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
