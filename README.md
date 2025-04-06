# 💵 Decentralized Stablecoin (DSC) - Built with Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Scaffold-ETH Docs</a> |
  <a href="https://scaffoldeth.io">Scaffold-ETH Website</a>
</h4>

🧪 Build and test your own **overcollateralized stablecoin protocol**, with live health factors, liquidation incentives, and a modern dev stack.

Built using **Next.js**, **Foundry**, **Wagmi**, **Viem**, **Typescript**, and **Scaffold-ETH 2**.

- ✅ **DSC Protocol Contracts** — Overcollateralized stablecoin backed by WETH & WBTC.
- ✅ **Live Health Monitoring** — Real-time user health factors in the frontend.
- ✅ **Liquidation UX** — Trigger liquidations directly from the frontend.
- ✅ **Custom Hooks & Components** — For smooth contract interaction.
- ✅ **Invariant Testing** — Foundry fuzzing & invariant checks.
- ✅ **Gas Reporting** — Understand gas costs per function.

<img width="842" alt="dsc-ui" src="https://github.com/user-attachments/assets/4c88fc77-d840-4d15-99b5-b1d9d3284f40" />

---


## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Foundry. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/foundry/foundry.toml`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/foundry/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/foundry/script` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn foundry:test`

- Edit your smart contracts in `packages/foundry/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/foundry/script`

## 🚀 Setup ERC-20 Token Extension

This extension introduces an ERC-20 token contract and demonstrates how to use interact with it, including getting a holder balance and transferring tokens.

The ERC-20 Token Standard introduces a standard for Fungible Tokens ([EIP-20](https://eips.ethereum.org/EIPS/eip-20)), in other words, each Token is exactly the same (in type and value) as any other Token.

The ERC-20 token contract is implemented using the [ERC-20 token implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) from OpenZeppelin.

### Setup

Deploy your contract running ```yarn deploy```

### Interact with the token

Start the front-end with ```yarn start``` and go to the _/erc20_ page to interact with your deployed ERC-20 token.

You can check the code at ```packages/nextjs/app/erc20/page.tsx```.


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
