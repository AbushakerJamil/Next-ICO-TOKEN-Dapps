"use client";

import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

import { config } from "../../provider/wagmiConfigs";
import { Web3Provider } from "../../context/Web3Provider";
import { ToastProvider } from "../../context/ToastContext";

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          chains={config.chains}
          theme={darkTheme({
            accentColor: "#D345EF",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <ToastProvider>
            <Web3Provider>
              {children}
            </Web3Provider>
          </ToastProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
