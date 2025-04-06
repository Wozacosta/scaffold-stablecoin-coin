"use client";

import { formatEther } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type TokenBalanceProps = {
  token: string;
};

export const TokenValue: React.FC<TokenBalanceProps> = ({ token }) => {
  const { data: priceFeed } = useScaffoldReadContract({
    contractName: "DSCEngine",
    functionName: "getCollateralTokenPriceFeed",
    args: [token],
  });
  const { data: latestRoundData } = useScaffoldReadContract({
    contractName: "MockV3Aggregator",
    functionName: "latestRoundData",
    // args: [],
    // @ts-expect-error
    address: priceFeed,
  });

  const { data: symbol } = useScaffoldReadContract({
    contractName: "wBTC", //NOTE: hack, same contract type as wETH, so symbol should differ for wETH
    functionName: "symbol",
    // args: [],
    // @ts-expect-error
    address: token,
  });

  const price = latestRoundData?.[1] ? formatEther(BigInt(latestRoundData[1]) * 10n ** 10n) : "Loading...";

  return (
    <p key={`-${token}`}>
      Token {symbol ?? token}: {price !== "Loading..." ? `$${price}` : "Loading..."}
    </p>
  );
};
