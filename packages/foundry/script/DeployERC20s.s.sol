//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// import "../contracts/SE2Token.sol";
import "../contracts/WBTC.sol";
import "../contracts/WETH.sol";
import "../contracts/DecentralizedStablecoin.sol";
import "./DeployHelpers.s.sol";

contract DeployERC20s is ScaffoldETHDeploy {
    address[] public tokenAddresses;
    address[] public priceFeedAddresses;

    function run() external ScaffoldEthDeployerRunner {
        // SE2Token se2Token = new SE2Token();
        // wBTC wbtc = new wBTC();
        // wETH weth = new wETH();
        DecentralizedStableCoin dsc = new DecentralizedStableCoin();

        console.logString(
            string.concat("DSC deployed at: ", vm.toString(address(dsc)))
        );
    }
}
