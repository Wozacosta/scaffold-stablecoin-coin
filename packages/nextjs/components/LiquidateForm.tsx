"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { formatEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type LiquidateProps = {
  user: string;
  collateralTokens: string[];
  showLiquidateForm: any;
  dscEngineAddress: string;
};

const TokenOption: React.FC<{ token: string }> = ({ token }) => {
  const { data: symbol } = useScaffoldReadContract({
    contractName: "wBTC", // or ERC20, depending on your config
    functionName: "symbol",
    // @ts-ignore
    address: token,
  });

  return <option value={token}>{symbol ?? token}</option>;
};

export const LiquidateForm: React.FC<LiquidateProps> = ({
  user,
  collateralTokens,
  showLiquidateForm,
  dscEngineAddress,
}) => {
  const [debtToCover, setDebtToCover] = useState<string>("0");
  const [collateralToken, setCollateralToken] = useState<string>(collateralTokens[0] ?? "");
  const { writeContractAsync } = useScaffoldWriteContract("DSCEngine");
  const { writeContractAsync: approveContractAsync } = useScaffoldWriteContract("DecentralizedStableCoin");

  return (
    <div className="bg-base-100 p-2 rounded-xl mt-2">
      <p className="font-semibold">Liquidate {user}</p>

      <div className="my-2">
        <label className="block text-sm">Collateral Token</label>
        <select
          className="select select-bordered w-full"
          value={collateralToken}
          onChange={e => setCollateralToken(e.target.value)}
        >
          {collateralTokens.map(token => (
            <TokenOption key={token} token={token} />
          ))}
        </select>
      </div>

      <div className="my-2">
        <label className="block text-sm">Debt to Cover (DSC)</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={debtToCover}
          onChange={e => setDebtToCover(e.target.value)}
          placeholder="Amount in DSC"
        />
      </div>

      <button
        className="btn btn-primary w-full mt-2"
        onClick={async () => {
          try {
            await approveContractAsync({
              functionName: "approve",
              args: [dscEngineAddress, parseEther(debtToCover)],
            });
            await writeContractAsync({
              functionName: "liquidate",
              args: [collateralToken, user, parseEther(debtToCover)],
            });
            showLiquidateForm(false); // close form on success
          } catch (err) {
            console.error("Liquidation failed", err);
          }
        }}
      >
        Execute Liquidation
      </button>
    </div>
  );
};
