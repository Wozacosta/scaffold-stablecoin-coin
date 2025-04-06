"use client";

import { useState } from "react";
import { formatEther } from "viem";
import { LiquidateForm } from "~~/components/LiquidateForm";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type UserStatsCardProps = {
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
  const { data: balance } = useScaffoldReadContract({
    contractName: "DSCEngine",
    functionName: "getCollateralBalanceOfUser",
    args: [user, token],
  });

  const { data: symbol } = useScaffoldReadContract({
    contractName: "wBTC", //NOTE: hack, same contract type as wETH, so symbol should differ for wETH
    functionName: "symbol",
    // @ts-expect-error
    address: token,
    args: undefined,
  });

  return (
    <p key={`${user}-${token}`}>
      Token {symbol ?? token}: {balance ? formatEther(balance) : "0"}
    </p>
  );
};

export const UserStatsCard: React.FC<UserStatsCardProps> = ({ user, collateralTokens }) => {
  const [showLiquidateForm, setShowLiquidateForm] = useState(false);

  console.log({ user, collateralTokens });
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
  console.log({ accountInfo, healthFactor });
  const maxUint256Value = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

  return (
    <div className="bg-base-200 p-4 rounded-xl my-2 w-full">
      <p className="font-bold break-words">
        User: <Address address={user} size="lg" />
      </p>
      <p>DSC Minted: {accountInfo?.[0] ? formatEther(accountInfo[0]) : "0"} DSC</p>
      <p>Collateral Value (USD): {accountInfo?.[1] ? formatEther(accountInfo[1]) : "0"} USD</p>
      <p className="font-bold">
        Health Factor:{" "}
        <span className={getHealthColor(Number(formatEther(healthFactor ?? 0n)))}>
          {healthFactor === maxUint256Value ? "∞" : healthFactor ? formatEther(healthFactor) : "none"}
        </span>
      </p>

      <div className="mt-2">
        <p className="font-semibold">Collateral Breakdown:</p>
        {collateralTokens.map(token => (
          <TokenBalance key={`${user}-${token}`} user={user} token={token} />
        ))}
      </div>
      {Number(formatEther(healthFactor ?? 0n)) < 1 && (
        <button className="btn btn-error btn-sm my-2" onClick={() => setShowLiquidateForm(!showLiquidateForm)}>
          {showLiquidateForm ? "Cancel Liquidation" : "Liquidate"}
        </button>
      )}

      {showLiquidateForm && (
        <LiquidateForm user={user} collateralTokens={collateralTokens} showLiquidateForm={setShowLiquidateForm} />
      )}
    </div>
  );
};
