"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const formatUsd = (value: any) => {
  const formatted = parseFloat(formatEther(value)).toFixed(2);
  return `$${formatted}`;
};
const getRatioColor = (ratio: number) => {
  if (ratio >= 2) return "text-green-500";
  if (ratio >= 1.5) return "text-yellow-500";
  return "text-red-500";
};

const ERC20: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { data: balance } = useScaffoldReadContract({
    contractName: "DecentralizedStableCoin",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: totalSupply } = useScaffoldReadContract({
    contractName: "DecentralizedStableCoin",
    functionName: "totalSupply",
  });

  const { data: stats } = useScaffoldReadContract({
    contractName: "DSCEngine",
    functionName: "getProtocolStats",
    // args: [],
  });
  const totalDscSupply = stats?.[0] ?? 0n;
  const totalCollateralUsdValue = stats?.[1] ?? 0n;
  // {data: Array(2)}
  //data [2n,24000n]
  console.log({ stats });
  const collateralizationRatio =
    totalDscSupply > 0n ? Number(totalCollateralUsdValue) / Number(totalDscSupply) : Infinity;
  console.log("Protocol Collateralization Ratio:", collateralizationRatio);
  const formattedRatio = collateralizationRatio === Infinity ? "∞" : `${(collateralizationRatio * 100).toFixed(2)}%`;

  const { writeContractAsync: writeSE2TokenAsync } = useScaffoldWriteContract("DecentralizedStableCoin");

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 text-center max-w-4xl">
          <h1 className="text-4xl font-bold">ERC-20 Token</h1>
          <div>
            <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
              <p className="my-2 mr-2 font-bold text-2xl">Total DSC Supply:</p>
              <p className="text-xl">{formatEther(totalDscSupply)} DSC</p>
            </div>

            <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
              <p className="my-2 mr-2 font-bold text-2xl">Total Collateral Value (USD):</p>
              <p className="text-xl">{formatEther(totalCollateralUsdValue)} USD</p>
              <p className="text-xl">{formatUsd(totalCollateralUsdValue)}</p>
            </div>
            <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
              <p className="my-2 mr-2 font-bold text-2xl">Collateralization Ratio:</p>
              <p className={`text-xl ${getRatioColor(collateralizationRatio)}`}>{formattedRatio}</p>
            </div>
          </div>

          <div className="divider my-0" />
        </div>

        <div className="flex flex-col justify-center items-center bg-base-300 w-full mt-8 px-8 pt-6 pb-12">
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 mr-2 font-bold text-2xl">Total Supply:</p>
            <p className="text-xl">{totalSupply ? formatEther(totalSupply) : 0} tokens</p>
          </div>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="y-2 mr-2 font-bold text-2xl">Your Balance:</p>
            <p className="text-xl">{balance ? formatEther(balance) : 0} tokens</p>
          </div>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row mb-6">
            <button
              className="btn btn-accent text-lg px-12 mt-2"
              onClick={async () => {
                try {
                  await writeSE2TokenAsync({ functionName: "mint", args: [connectedAddress, parseEther("100")] });
                } catch (e) {
                  console.error("Error while minting token", e);
                }
              }}
            >
              Mint 100 Tokens
            </button>
          </div>
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center w-full md:w-2/4 rounded-3xl mt-10">
            <h3 className="text-2xl font-bold">Transfer Tokens</h3>
            <div className="flex flex-col items-center justify-between w-full lg:w-3/5 px-2 mt-4">
              <div className="font-bold mb-2">Send To:</div>
              <div>
                <AddressInput value={toAddress} onChange={setToAddress} placeholder="Address" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between w-full lg:w-3/5 p-2 mt-4">
              <div className="flex gap-2 mb-2">
                <div className="font-bold">Amount:</div>
                <div>
                  <button
                    disabled={!balance}
                    className="btn btn-secondary text-xs h-6 min-h-6"
                    onClick={() => {
                      if (balance) {
                        setAmount(formatEther(balance));
                      }
                    }}
                  >
                    Max
                  </button>
                </div>
              </div>
              <div>
                <InputBase value={amount} onChange={setAmount} placeholder="0" />
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary text-lg px-12 mt-2"
                disabled={!toAddress || !amount}
                onClick={async () => {
                  try {
                    await writeSE2TokenAsync({ functionName: "transfer", args: [toAddress, parseEther(amount)] });
                    setToAddress("");
                    setAmount("");
                  } catch (e) {
                    console.error("Error while transfering token", e);
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ERC20;
