"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <h1 className="text-4xl font-bold">Decentralized Stablecoin Protocol (DSC)</h1>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>

        <div className="px-5 text-center max-w-4xl">
          <div className="mt-4 space-y-4 text-lg">
            <p>
              DSC is a decentralized, crypto-backed stablecoin pegged to the US dollar. Anyone can mint DSC by locking
              up crypto collateral.
            </p>
            <p>
              💰 <strong>Minting:</strong> Deposit <strong>WETH</strong> or <strong>WBTC</strong> as collateral and mint
              DSC tokens in return.
            </p>
            <p>
              🛡️ <strong>Always overcollateralized:</strong> The protocol ensures that the total value of collateral
              always exceeds the amount of DSC in circulation.
            </p>
            <p>
              ⚖️ <strong>Incentivized liquidations:</strong> When positions become risky, liquidators are rewarded for
              helping maintain protocol health.
            </p>
            <p>
              🔍 <strong>Fully transparent:</strong> All data is available on-chain. You can monitor supply, collateral
              balance, and system health live.
            </p>
            <p>
              🪙 <strong>Stable by design:</strong> DSC aims to hold its $1 peg through strong collateral backing and
              clear economic incentives, without relying on central entities.
            </p>
          </div>

          <div className="divider my-6" />

          <h2 className="text-3xl font-bold mt-4">How it works:</h2>
          <div className="mt-4 space-y-3 text-lg">
            <p>1️⃣ Deposit crypto collateral (WETH or WBTC).</p>
            <p>2️⃣ Mint DSC tokens based on your deposited value.</p>
            <p>3️⃣ Track the protocol stats in real-time — including total supply and collateralization ratio.</p>
            <p>
              4️⃣ If the system health drops, liquidators are incentivized to restore balance by seizing
              undercollateralized positions.
            </p>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col md:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
