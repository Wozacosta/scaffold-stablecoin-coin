//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import "./DeployHelpers.s.sol";
import {DecentralizedStableCoin} from "../contracts/DecentralizedStableCoin.sol";
import {DeployERC20s} from "./DeployERC20s.s.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

/**
 * @notice Main deployment script for all contracts
 * @dev Run this when you want to deploy multiple contracts at once
 *
 * Example: yarn deploy # runs this script(without`--file` flag)
 */
contract DeployScript is ScaffoldETHDeploy {
    address[] public tokenAddresses;
    address[] public priceFeedAddresses;

    function run() external {
        // NOTE: maybe do sequentially
        // Deploys all your contracts sequentially
        // Add new deployments here when needed

        // DeployERC20s deployerERC20s = new DeployERC20s();
        // (address wBTC, address wETH) = deployerERC20s.run();

        // Deploy another contract
        // DeployMyContract myContract = new DeployMyContract();
        // myContract.run();
        //
        HelperConfig helperConfig = new HelperConfig(); // This comes with our mocks!

        (
            address wethUsdPriceFeed,
            address wbtcUsdPriceFeed,
            address weth,
            address wbtc,
            uint256 deployerKey
        ) = helperConfig.activeNetworkConfig();

        vm.startBroadcast(deployerKey);
        DecentralizedStableCoin dsc = new DecentralizedStableCoin();
        console.log("in deploy script");
        console.log("wbtc address: ", wbtc);
        console.log("weth address: ", weth);
        console.log("dsc address: ", address(dsc));

        tokenAddresses = [weth, wbtc];
        priceFeedAddresses = [wethUsdPriceFeed, wbtcUsdPriceFeed];
        vm.stopBroadcast();
    }
}
