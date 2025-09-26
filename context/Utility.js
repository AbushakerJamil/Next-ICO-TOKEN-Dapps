"use client"

export const handleTransactionError = (
  error,
  context = "transaction",
  logToConsole = true
) => {
  if (logToConsole) {
    console.error(`Error in ${context}:`, error);
  }
  let errorMessage = "Transaction Failed";
  let errorCode = "UNKNOWN_ERROR";

  const code =
    error?.code ||
    (error?.error && error.error.code) ||
    (error.data && error.data.code);

  const isRejected =
    (error?.message && error.message.includes("user rejected")) ||
    error.message.includes("rejected transaction") ||
    error.message.includes("User denied") ||
    error.message.includes("ACTIVE_REJECTED");

  if (isRejected || code === "ACTIVE_REJECTED" || code === 4001) {
    errorMessage = "Transaction rejected by user";
    errorCode = "ACTIVE_REJECTED";
  } else if (code === "INSUFFICIENT_FUNDS" || code === -32000) {
    errorMessage = "Insuficient funds for transaction";
    errorCode = "INSUFFICIENT_FUNDS";
  } else if (error.reason) {
    errorMessage = error.reason;
    errorCode = "CONTRACT_ERROR";
  } else if (error.message) {
    if (message.includes("gas required exceeds allowance")) {
      errorMessage = "Gas required exceeds your ETH balance";
      errorCode = "INSUFFICIENT_FUNDS";
    } else if (message.includes("nonce too low")) {
      errorMessage = "Transaction with same nonce already processed";
      errorCode = "NONCE_ERROR";
    } else if (message.includes("replacement transaction underpriced")) {
      errorMessage = "Gas price too low to replace pending transaction";
      errorCode = "GAS_PRICE_ERROR";
    } else {
      errorMessage = message;
    }
  }

  return { message, errorMessage, code: errorCode };
};

export const erc20Abi = [
  "function totalSupply() viem returns (uint256)",
  "function decimals() viem returns (uint8)",
  "function symbol() viem returns (string)",
  "function name() viem returns (string)",
  "function balanceOf(address account) viem returns (uint256)",
  "function allowance(address owner, address spender) viem returns (uint256)",

  "function transfer(address recipient, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address spender, address recipient,uint256 amount) returns (bool)",
];

export const generateId = () =>
  `transaction-${Date.now()}-${Math.toString(36).substring(2, 5)}`;
