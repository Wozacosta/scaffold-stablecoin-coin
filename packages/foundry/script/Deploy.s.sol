//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import "./DeployHelpers.s.sol";
import {DecentralizedStableCoin} from "../contracts/DecentralizedStableCoin.sol";
import {DSCEngine} from "../contracts/DSCEngine.sol";
import {DeployERC20s} from "./DeployERC20s.s.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {wBTC} from "../contracts/WBTC.sol";
import {wETH} from "../contracts/WETH.sol";

/**
 * @notice Main deployment script for all contracts
 * @dev Run this when you want to deploy multiple contracts at once
 *
 * Example: yarn deploy # runs this script(without`--file` flag)
 */
contract DeployScript is ScaffoldETHDeploy {
    address[] public tokenAddresses;
    address[] public priceFeedAddresses;
    uint256 public constant STARTING_USER_BALANCE = 1000 ether;
    address public USER2 = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
    address public USER3 = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
    uint256 public USER2_PK =
        0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;
    uint256 public USER3_PK =
        0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a;

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
        tokenAddresses = [weth, wbtc];
        priceFeedAddresses = [wethUsdPriceFeed, wbtcUsdPriceFeed];

        vm.startBroadcast(deployerKey);

        DecentralizedStableCoin dsc = new DecentralizedStableCoin();

        DSCEngine dscEngine = new DSCEngine(
            tokenAddresses,
            priceFeedAddresses,
            address(dsc)
        );
        console.log("dsc address: ", address(dsc));
        console.log("dscEngine address: ", address(dscEngine));
        console.log("----------");

        dsc.transferOwnership(address(dscEngine));
        wETH(weth).mint(USER2, STARTING_USER_BALANCE);
        wBTC(wbtc).mint(USER2, STARTING_USER_BALANCE);
        wETH(weth).mint(USER3, STARTING_USER_BALANCE);
        wBTC(wbtc).mint(USER3, STARTING_USER_BALANCE);

        uint256 user2BalanceWETH = wETH(weth).balanceOf(USER2);
        uint256 user3BalanceWETH = wETH(weth).balanceOf(USER3);
        console.log("user2Balance (weth): ", user2BalanceWETH);
        console.log("user3Balance (weth): ", user3BalanceWETH);

        uint256 user2BalanceWBTC = wBTC(wbtc).balanceOf(USER2);
        uint256 user3BalanceWBTC = wBTC(wbtc).balanceOf(USER3);
        console.log("user2Balance (wbtc): ", user2BalanceWBTC);
        console.log("user3Balance (wbtc): ", user3BalanceWBTC);

        vm.stopBroadcast();

        console.log("NEW BROADCAST");
        vm.startBroadcast(USER2_PK);
        console.log("public address is %s", vm.toString(USER2));
        console.log("---> msg.sender is %s", msg.sender); // INCORRECT
        wETH(weth).approve(address(dscEngine), STARTING_USER_BALANCE);
        wBTC(wbtc).approve(address(dscEngine), STARTING_USER_BALANCE);
        console.log("---> msg.sender is %s", msg.sender); // INCORRECT
        dscEngine.depositCollateral(weth, 2 ether);
        vm.stopBroadcast();
        console.log("end broadcast");

        vm.startBroadcast(USER3_PK);
        wETH(weth).approve(address(dscEngine), STARTING_USER_BALANCE);
        wBTC(wbtc).approve(address(dscEngine), STARTING_USER_BALANCE);
        console.log("BEFORE");
        dscEngine.depositCollateral(weth, 10 ether);
        dscEngine.mintDSC(2);
        // dscEngine.depositCollateralAndMintDSC(weth, 1 ether, 1);
        vm.stopBroadcast();

        console.log("in deploy script");
        console.log("wbtc address: ", wbtc);
        console.log("weth address: ", weth);
        console.log("dsc address: ", address(dsc));
    }
}
