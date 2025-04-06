"use client";

import { useState } from "react";
import { formatEther } from "viem";
import { LiquidateForm } from "~~/components/LiquidateForm";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type UserStatsCardProps = {
  dscEngineAddress: string;
  user: string;
  collateralTokens: string[];
};

const getHealthColor = (hf: number) => {
  if (hf >= 2) return "text-green-500";
  if (hf >= 1) return "text-yellow-500";
  return "text-red-500";
};

type TokenBalanceProps = {
  user: string;
  token: string;
};

export const TokenBalance: React.FC<TokenBalanceProps> = ({ user, token }) => {
  const { data: balanceInProtocol } = useScaffoldReadContract({
    contractName: "DSCEngine",
    functionName: "getCollateralBalanceOfUser",
    args: [user, token],
  });

  const { data: balanceWallet } = useScaffoldReadContract({
    contractName: "wBTC", // ERC20 ABI
    functionName: "balanceOf",
    // @ts-expect-error
    address: token,
    args: [user],
  });

  const { data: symbol } = useScaffoldReadContract({
    contractName: "wBTC",
    functionName: "symbol",
    // @ts-expect-error
    address: token,
    args: undefined,
  });

  return (
    <div className="text-sm my-1">
      <p>
        <strong>{symbol ?? token}</strong>
      </p>
      <p className="ml-2">Protocol collateral: {balanceInProtocol ? formatEther(balanceInProtocol) : "0"}</p>
      <p className="ml-2">Wallet balance: {balanceWallet ? formatEther(balanceWallet) : "0"}</p>
    </div>
  );
};

export const UserStatsCard: React.FC<UserStatsCardProps> = ({ dscEngineAddress, user, collateralTokens }) => {
  const [showLiquidateForm, setShowLiquidateForm] = useState(false);

  const { data: accountInfo } = useScaffoldReadContract({
    contractName: "DSCEngine",
    functionName: "getAccountInformation",
    args: [user],
  });

  const { data: healthFactor } = useScaffoldReadContract({
    contractName: "DSCEngine",
    functionName: "getHealthFactor",
    args: [user],
  });

  const { data: dscBalance } = useScaffoldReadContract({
    contractName: "DecentralizedStableCoin",
    functionName: "balanceOf",
    args: [user],
  });

  const maxUint256Value = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  const hfValue = Number(formatEther(healthFactor ?? 0n));

  return (
    <div className="bg-base-200 p-4 rounded-xl my-2 w-full">
      <p className="font-bold break-words mb-2">
        <span className="text-sm text-gray-500">User:</span> <Address address={user} size="lg" />
      </p>

      <div className="text-sm space-y-1 mb-4">
        <p>
          <strong>Debt (DSC Minted):</strong> {accountInfo?.[0] ? formatEther(accountInfo[0]) : "0"} DSC
        </p>
        <p>
          <strong>DSC Wallet Balance:</strong> {dscBalance ? formatEther(dscBalance) : "0"} DSC
        </p>
        <p>
          <strong>Total Collateral Value (USD):</strong> {accountInfo?.[1] ? formatEther(accountInfo[1]) : "0"} USD
        </p>
        <p className="font-bold">
          Health Factor:{" "}
          <span className={getHealthColor(hfValue)}>
            {healthFactor === maxUint256Value ? "∞" : healthFactor ? formatEther(healthFactor) : "none"}
          </span>
        </p>
      </div>

      <div className="mt-2">
        <p className="font-semibold mb-1">Collateral Breakdown:</p>
        {collateralTokens.map(token => (
          <TokenBalance key={`${user}-${token}`} user={user} token={token} />
        ))}
      </div>

      {hfValue < 1 && (
        <button className="btn btn-error btn-sm my-3" onClick={() => setShowLiquidateForm(!showLiquidateForm)}>
          {showLiquidateForm ? "Cancel Liquidation" : "Liquidate"}
        </button>
      )}

      {showLiquidateForm && (
        <LiquidateForm
          dscEngineAddress={dscEngineAddress}
          user={user}
          collateralTokens={collateralTokens}
          showLiquidateForm={setShowLiquidateForm}
        />
      )}
    </div>
  );
};
