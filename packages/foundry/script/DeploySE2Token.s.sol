//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/SE2Token.sol";
import "../contracts/WBTC.sol";
import "../contracts/DecentralizedStablecoin.sol";
import "./DeployHelpers.s.sol";

contract DeploySE2Token is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        SE2Token se2Token = new SE2Token();
        wBTC wbtc = new wBTC();
        DecentralizedStableCoin dsc = new DecentralizedStableCoin();

        console.logString(
            string.concat("WBTC deployed at: ", vm.toString(address(wbtc)))
        );
        console.logString(
            string.concat("DSC deployed at: ", vm.toString(address(dsc)))
        );
    }
}
