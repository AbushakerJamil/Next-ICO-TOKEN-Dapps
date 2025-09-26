import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RiWallet3Line } from "react-icons/ri";

const CustomConnectButton = ({active, childStyle}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className={`flex items-center bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-700 hover:to-purple-800 text-white px-4 py-2 rounded-md transition-colors ${
                      childStyle
                    }`}
                  >
                    <RiWallet3Line className="mr-2" size={20} />
                    CONNECT WALLET
                  </button>
                );
              }
              
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                  >
                    Wrong network
                  </button>
                );
              }
              
              return (
                <div className="flex items-center gap-4">
                  {active && (
                    <button
                      onClick={openChainModal}
                      className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      {chain.hasIcon && (
                        <div className="w-5 h-5">
                          {chain.iconUrl && (
                            <img
                              src={chain.iconUrl}
                              alt={chain.name ?? "chain icon"}
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                        </div>
                      )}
                      {/* Network name যোগ করা হয়েছে */}
                      <span className="text-sm font-medium">
                        {chain.name}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={openAccountModal}
                    className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <span className="text-sm font-medium">
                      {account.displayName}
                    </span>
                    {account.displayBalance && (
                      <span className="text-xs opacity-80">
                        ({account.displayBalance})
                      </span>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;