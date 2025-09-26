"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAccount, useChainId, useConnect, useBalance } from "wagmi";
import { ethers } from "ethers";

import { useToast } from "./ToastContext";
import TOKEN_ICO_ABI from "./ABI.json";
import {config} from "../provider/wagmiConfigs";
import { useEthersProvider, useEthersSigner } from "../provider/hooks";
import { handleTransactionError, erc20Abi, generateId } from "./Utility";

// Environment Variables
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "";
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || "";
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL || "";
const TOKEN_DECIMAL = process.env.NEXT_PUBLIC_TOKEN_DECIMAL || "";
const TOKEN_LOGO = process.env.NEXT_PUBLIC_TOKEN_LOGO || "";
const DOMAIN_URL = process.env.NEXT_PUBLIC_NEXT_DOMAIN_URL || "";
const PER_TOKEN_USD_PRICE = process.env.NEXT_PUBLIC_NEXT_PER_TOKEN_USD_PRICE || "";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ICO_ADDRESS || "";
const LINKTUM_ADDRESS = process.env.NEXT_PUBLIC_LINKTUM_ADDRESS || ""; 

const TokenICOAbi = TOKEN_ICO_ABI.abi || "";

// Create fallback provider once (outside component to prevent re-creation)
const fallbackProvider = RPC_URL ? new ethers.providers.JsonRpcProvider(RPC_URL) : null;

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const { notify } = useToast();

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { balance } = useBalance({ config });
  const { connect, connectors } = useConnect();
  
  const [reCall, setreCall] = useState(0);
  const [globalLoad, setglobalLoad] = useState(false);
  const [contract, setcontract] = useState(null);
  const [isConnecting, setisConnecting] = useState(false);
  const [error, seterror] = useState(null);
  
  // In-memory storage for transactions (replacing localStorage)
  const [transactionHistory, setTransactionHistory] = useState([]);

  const provider = useEthersProvider();
  const signer = useEthersSigner();

  const [contractInfo, setcontractInfo] = useState({
    tbcaddress: null,
    tbcBalance: "0",
    ethPrice: "0",
    totalSold: "0",
  });

  const [tokenBalance, settokenBalance] = useState({
    usertbcBalance: "0",
    contractEthBalance: null,
    totalSupply: null,
    userEthBalance: null,
    ethPrice: "0",
    tbcBalance: "0",
  });

  // Initialize contract
  useEffect(() => {
    const initContract = () => {
      if (provider && signer && CONTRACT_ADDRESS) {
        try {
          const contractInstance = new ethers.Contract(
            CONTRACT_ADDRESS,
            TokenICOAbi,
            signer
          );
          setcontract(contractInstance);
          seterror(null);
        } catch (error) {
          console.error("Error initializing contract:", error);
          seterror("Failed to initialize Contract");
        }
      } else if (!provider && !signer) {
        setcontract(null);
      }
    };

    initContract();
  }, [provider, signer]);

  // Fetch contract info - TEMPORARILY DISABLED FOR TESTING
  useEffect(() => {
    const fetchContractInfo = async () => {
      if (!CONTRACT_ADDRESS) {
        console.warn("Contract address not provided");
        setglobalLoad(false);
        return;
      }

      // TEMP: Skip contract calls to test UI first
      console.log("Skipping contract info fetch for testing");
      setglobalLoad(false);
      
      // Set dummy data for testing
      setcontractInfo({
        tbcaddress: "0x0000000000000000000000000000000000000000",
        tbcBalance: "1000000",
        ethPrice: "0.001",
        totalSold: "500000",
      });

      return;

      // ORIGINAL CODE (commented out temporarily):
      /*
      setglobalLoad(true);

      try {
        const currentProvider = provider || fallbackProvider;
        if (!currentProvider) {
          throw new Error("No provider available");
        }

        const readolyContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          TokenICOAbi,
          currentProvider
        );
        
        const info = await readolyContract.getContractInfo();
        const tokenDecimals = parseInt(info.tokenDecimals) || 18;
        
        setcontractInfo({
          tbcaddress: info.tokenAddress,
          tbcBalance: ethers.utils.formatUnits(info.tokenBalance, tokenDecimals),
          ethPrice: ethers.utils.formatUnits(info.ethPrice, 18),
          totalSold: ethers.utils.formatUnits(info.totalSold, tokenDecimals),
        });

        // Fetch user-specific data if connected
        if (address && info.tokenAddress) {
          const tokenContract = new ethers.Contract(
            info.tokenAddress,
            erc20Abi,
            currentProvider
          );

          const [
            userTokenBalance,
            userEthBalance,
            contractEthBalance,
            totalSupply,
          ] = await Promise.all([
            tokenContract.balanceOf(address),
            currentProvider.getBalance(address),
            currentProvider.getBalance(CONTRACT_ADDRESS),
            tokenContract.totalSupply(),
          ]);

          settokenBalance(prev => ({
            ...prev,
            usertbcBalance: ethers.utils.formatUnits(userTokenBalance, tokenDecimals),
            contractEthBalance: ethers.utils.formatUnits(contractEthBalance),
            totalSupply: ethers.utils.formatUnits(totalSupply, tokenDecimals),
            userEthBalance: ethers.utils.formatUnits(userEthBalance),
            ethPrice: ethers.utils.formatUnits(info.ethPrice, 18),
            tbcBalance: ethers.utils.formatUnits(info.tokenBalance, tokenDecimals),
          }));
        }
      } catch (error) {
        console.error("Error fetching contract info:", error);
        seterror("Failed to fetch contract information");
      } finally {
        setglobalLoad(false);
      }
      */
    };

    fetchContractInfo();
  }, [contract, address, provider, reCall]);

  // Transaction functions
  const buyToken = async (ethAmount) => {
    if (!contract || !address) return null;

    const toastId = notify.start(`Buying ${TOKEN_SYMBOL} with ${CURRENCY}....`);

    try {
      const ethValue = ethers.utils.parseEther(ethAmount);
      const tx = await contract.buyToken({ value: ethValue });

      notify.update(toastId, "Processing", "Waiting for confirmation");
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        const tokenPrice = PER_TOKEN_USD_PRICE;
        const tokensReceive = parseFloat(ethAmount) / tokenPrice;

        const txDetails = {
          id: generateId(),
          timestamp: Date.now(),
          user: address,
          tokenOut: TOKEN_SYMBOL,
          amountIn: ethAmount,
          amountOut: tokensReceive.toString(),
          transactionType: "Buy",
          hash: receipt.transactionHash,
        };

        // Save to in-memory storage instead of localStorage
        setTransactionHistory(prev => [...prev, txDetails]);

        setreCall(prev => prev + 1);
        notify.complete(toastId, `Successfully purchased ${TOKEN_SYMBOL} tokens`);
        return receipt;
      }
    } catch (error) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        error,
        "buying tokens"
      );

      if (errorCode === "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by user");
        return null;
      }
      
      console.error(errorMessage);
      notify.fail(toastId, "Transaction failed, Please try again with sufficient gas");
      return null;
    }
  };

  const updateTokenPrice = async (newPrice) => {
    if (!contract || !address) return null;

    const toastId = notify.start(`Updating token price....`);

    try {
      const parsedPrice = ethers.utils.parseEther(newPrice);
      const tx = await contract.updatetokenPrice(parsedPrice);

      notify.update(toastId, "Processing", "Confirming price update....");
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setreCall(prev => prev + 1);
        notify.complete(toastId, `Token price updated to ${newPrice} ${CURRENCY}`);
        return receipt;
      }
    } catch (error) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        error,
        "Updating token price"
      );

      if (errorCode === "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by user");
        return null;
      }
      
      console.error(errorMessage);
      notify.fail(toastId, "Price update failed, Please check your permissions");
      return null;
    }
  };

  const SetSaleToken = async (tokenAddress) => {
    if (!contract || !address) return null;

    const toastId = notify.start(`Setting token sale....`);

    try {
      const tx = await contract.setSaleToken(tokenAddress);
      notify.update(toastId, "Processing", "Confirming token update....");
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setreCall(prev => prev + 1);
        notify.complete(toastId, `Sale token updated successfully`);
        return receipt;
      }
    } catch (error) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        error,
        "Setting sale token"
      );

      if (errorCode === "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by user");
        return null;
      }
      
      console.error(errorMessage);
      notify.fail(toastId, "Failed to set sale token, Please check the address");
      return null;
    }
  };

  const WithdrawAllTokens = async () => {
    if (!contract || !address) return null;

    const toastId = notify.start(`Withdrawing tokens....`);

    try {
      const tx = await contract.withdrawAllTokens();
      notify.update(toastId, "Processing", "Confirming withdrawal....");
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setreCall(prev => prev + 1);
        notify.complete(toastId, `All tokens withdrawn successfully`);
        return receipt;
      }
    } catch (error) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        error,
        "withdrawing token"
      );

      if (errorCode === "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by user");
        return null;
      }
      
      console.error(errorMessage);
      notify.fail(toastId, "Failed to withdraw tokens, Please try again");
      return null;
    }
  };

  const resuceTokens = async (tokenAddress) => {
    if (!contract || !address) return null;

    const toastId = notify.start(`Rescuing tokens....`);

    try {
      const tx = await contract.rescueTokens(tokenAddress);
      notify.update(toastId, "Processing", "Rescue operation....");
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setreCall(prev => prev + 1);
        notify.complete(toastId, `Token rescue successful`);
        return receipt;
      }
    } catch (error) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        error,
        "rescue token"
      );

      if (errorCode === "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by user");
        return null;
      }
      
      console.error(errorMessage);
      notify.fail(toastId, "Failed to rescue token, Please check the address");
      return null;
    }
  };

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}....${address.substring(address.length - 4)}`;
  };

  const formatTokenAmount = (amount, decimals = 18) => {
    if (!amount) return "0";
    return ethers.utils.formatUnits(amount, decimals);
  };

  const isOwner = async () => {
    if (!contract || !address) return false;

    try {
      const ownerAddress = await contract.owner();
      return ownerAddress.toLowerCase() === address.toLowerCase();
    } catch (error) {
      console.error("Error checking owner:", error);
      return false;
    }
  };

  const addTokenToMetamask = async () => {
    const toastId = notify.start(`Adding ${TOKEN_SYMBOL} Token to MetaMask`);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not detected");
      }

      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: LINKTUM_ADDRESS,
            symbol: TOKEN_SYMBOL,
            decimals: TOKEN_DECIMAL,
            image: TOKEN_LOGO
          },
        },
      });

      if (wasAdded) {
        notify.complete(toastId, "Successfully added token");
      } else {
        notify.complete(toastId, "Failed to add token");
      }
    } catch (error) {
      console.error(error);
      const { message: errorMessage } = handleTransactionError(error, "Token addition error");
      notify.fail(toastId, `Transaction failed: ${errorMessage || "Not Supported"}`);
    }
  };

  const value = {
    provider,
    signer,
    contract,
    account: address,
    chainId,
    isConnected: !!address && !!contract,
    isConnecting,
    contractInfo,
    tokenBalance,
    error,
    reCall,
    globalLoad,
    transactionHistory, // In-memory transaction storage
    buyToken,
    updateTokenPrice,
    SetSaleToken,
    WithdrawAllTokens,
    resuceTokens,
    formatAddress,
    formatTokenAmount,
    isOwner,
    setreCall,
    addTokenToMetamask
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);

  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }

  return context;
};

export default Web3Context;