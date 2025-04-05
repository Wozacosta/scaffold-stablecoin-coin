//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
// import "../contracts/WBTC.sol";
// import "../contracts/WETH.sol";
import {DeployERC20s} from "./DeployERC20s.s.sol";

/**
 * @notice Main deployment script for all contracts
 * @dev Run this when you want to deploy multiple contracts at once
 *
 * Example: yarn deploy # runs this script(without`--file` flag)
 */
contract DeployScript is ScaffoldETHDeploy {
    function run() external {
        // Deploys all your contracts sequentially
        // Add new deployments here when needed

        DeployERC20s deployerERC20s = new DeployERC20s();
        (address wBTC, address wETH) = deployerERC20s.run();
        console.log("in deploy script");
        console.log("wbtc address: ", wBTC);
        console.log("weth address: ", wETH);

        // Deploy another contract
        // DeployMyContract myContract = new DeployMyContract();
        // myContract.run();
    }
}
