//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// import "../contracts/SE2Token.sol";
import "../contracts/WBTC.sol";
import "../contracts/WETH.sol";
import "../contracts/DecentralizedStablecoin.sol";
import "./DeployHelpers.s.sol";

contract DeployERC20s is ScaffoldETHDeploy {
    function run()
        external
        ScaffoldEthDeployerRunner
        returns (address, address)
    {
        // SE2Token se2Token = new SE2Token();
        wBTC wbtc = new wBTC();
        wETH weth = new wETH();
        DecentralizedStableCoin dsc = new DecentralizedStableCoin();

        console.logString(
            string.concat("WBTC deployed at: ", vm.toString(address(wbtc)))
        );
        console.logString(
            string.concat("WETH deployed at: ", vm.toString(address(weth)))
        );
        return (address(wbtc), address(weth));
    }
}
