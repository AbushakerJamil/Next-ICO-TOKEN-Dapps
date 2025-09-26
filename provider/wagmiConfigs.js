"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hardhat, zksync, mainnet, sepolia, holesky } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "ico-dapps",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "03b6453b3130049edbb4d894c38516aa",
  chains: [mainnet, hardhat, zksync, sepolia, holesky],
  ssr: true,
});
