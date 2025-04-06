No files changed, compilation skipped

Ran 3 tests for test/unit/OracleLibTest.t.sol:OracleLibTest
[PASS] testGetTimeout() (gas: 9567)
[PASS] testPriceRevertsOnBadAnsweredInRound() (gas: 43577)
[PASS] testPriceRevertsOnStaleCheck() (gas: 25583)
Suite result: ok. 3 passed; 0 failed; 0 skipped; finished in 69.91ms (42.59ms CPU time)

Ran 4 tests for test/unit/DecentralizedStablecoinTest.t.sol:DecentralizedStablecoinTest
[PASS] testCantBurnMoreThanYouHave() (gas: 111732)
[PASS] testCantMintToZeroAddress() (gas: 38135)
[PASS] testMustBurnMoreThanZero() (gas: 111370)
[PASS] testMustMintMoreThanZero() (gas: 37151)
Suite result: ok. 4 passed; 0 failed; 0 skipped; finished in 97.49ms (218.27ms CPU time)

Ran 2 tests for test/fuzz/continueOnRevert/ContinueOnRevertInvariants.t.sol:ContinueOnRevertInvariants
[PASS] invariant_callSummary() (runs: 4, calls: 16, reverts: 11)
[PASS] invariant_protocolMustHaveMoreValueThanTotalSupplyDollars() (runs: 4, calls: 16, reverts: 13)
Suite result: ok. 2 passed; 0 failed; 0 skipped; finished in 928.68ms (1.61s CPU time)

Ran 2 tests for test/fuzz/failOnRevert/StopOnRevertInvariants.t.sol:StopOnRevertInvariants
[PASS] invariant_gettersCantRevert() (runs: 4, calls: 16, reverts: 0)
[PASS] invariant_protocolMustHaveMoreValueThatTotalSupplyDollars() (runs: 4, calls: 16, reverts: 0)
Suite result: ok. 2 passed; 0 failed; 0 skipped; finished in 974.33ms (1.26s CPU time)

Ran 40 tests for test/unit/DSCEngineTest.t.sol:DSCEngineTest
[PASS] testCanBurnDsc() (gas: 510895)
[PASS] testCanDepositCollateralWithoutMinting() (gas: 239720)
[PASS] testCanDepositedCollateralAndGetAccountInfo() (gas: 295784)
[PASS] testCanMintDsc() (gas: 399236)
[PASS] testCanMintWithDepositedCollateral() (gas: 367172)
[PASS] testCanRedeemCollateral() (gas: 338422)
[PASS] testCanRedeemDepositedCollateral() (gas: 548281)
[PASS] testCantBurnMoreThanUserHas() (gas: 35252)
[PASS] testCantLiquidateGoodHealthFactor() (gas: 858178)
[PASS] testEmitCollateralRedeemedWithCorrectArgs() (gas: 336142)
[PASS] testGetAccountCollateralValue() (gas: 292573)
[PASS] testGetAccountCollateralValueFromInformation() (gas: 295152)
[PASS] testGetCollateralBalanceOfUser() (gas: 233902)
[PASS] testGetCollateralTokenPriceFeed() (gas: 16175)
[PASS] testGetCollateralTokens() (gas: 19993)
[PASS] testGetDsc() (gas: 11339)
[PASS] testGetLiquidationThreshold() (gas: 8921)
[PASS] testGetMinHealthFactor() (gas: 8986)
[PASS] testGetTokenAmountFromUsd() (gas: 34240)
[PASS] testGetUsdValue() (gas: 34058)
[PASS] testHealthFactorCanGoBelowOne() (gas: 486110)
[PASS] testLiquidationPayoutIsCorrect() (gas: 1085797)
[PASS] testLiquidationPrecision() (gas: 9046)
[PASS] testLiquidatorTakesOnUsersDebt() (gas: 1080971)
[PASS] testMustImproveHealthFactorOnLiquidation() (gas: 5973931)
[PASS] testMustRedeemMoreThanZero() (gas: 567975)
[PASS] testProperlyReportsHealthFactor() (gas: 383107)
[PASS] testRevertsIfBurnAmountIsZero() (gas: 385659)
[PASS] testRevertsIfCollateralZero() (gas: 96408)
[PASS] testRevertsIfMintAmountBreaksHealthFactor() (gas: 380635)
[PASS] testRevertsIfMintAmountIsZero() (gas: 385704)
[PASS] testRevertsIfMintFails() (gas: 5193560)
[PASS] testRevertsIfMintedDscBreaksHealthFactor() (gas: 377037)
[PASS] testRevertsIfRedeemAmountIsZero() (gas: 386600)
[PASS] testRevertsIfTokenLengthDoesntMatchPriceFeeds() (gas: 443799)
[PASS] testRevertsIfTransferFails() (gas: 5114761)
[PASS] testRevertsIfTransferFromFails() (gas: 4942824)
[PASS] testRevertsWithUnapprovedCollateral() (gas: 1868716)
[PASS] testUserHasNoMoreDebt() (gas: 1080870)
[PASS] testUserStillHasSomeEthAfterLiquidation() (gas: 1121534)
Suite result: ok. 40 passed; 0 failed; 0 skipped; finished in 975.35ms (5.03s CPU time)

╭--------------------------------------------+-----------------+--------+--------+--------+---------╮
| contracts/DSCEngine.sol:DSCEngine Contract |                 |        |        |        |         |
+===================================================================================================+
| Deployment Cost                            | Deployment Size |        |        |        |         |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| 2614264                                    | 13976           |        |        |        |         |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
|                                            |                 |        |        |        |         |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| Function Name                              | Min             | Avg    | Median | Max    | # Calls |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| burnDSC                                    | 21724           | 53634  | 24149  | 115030 | 3       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| calculateHealthFactor                      | 1772            | 1772   | 1772   | 1772   | 2       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| depositCollateral                          | 22290           | 151664 | 169546 | 169591 | 20      |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| depositCollateralAndMintDSC                | 225946          | 284344 | 302064 | 302064 | 23      |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getAccountCollateralValue                  | 50966           | 50966  | 50966  | 50966  | 1       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getAccountInformation                      | 17849           | 32049  | 17849  | 53349  | 5       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getAdditionalFeedPrecision                 | 426             | 426    | 426    | 426    | 3       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getCollateralBalanceOfUser                 | 1176            | 2630   | 3176   | 3176   | 11      |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getCollateralTokenPriceFeed                | 3016            | 3016   | 3016   | 3016   | 23      |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getCollateralTokens                        | 8035            | 8035   | 8035   | 8035   | 6       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getDsc                                     | 474             | 474    | 474    | 474    | 2       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getHealthFactor                            | 18835           | 40909  | 57466  | 57466  | 14      |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getLiquidationBonus                        | 426             | 426    | 426    | 426    | 3       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getLiquidationPrecision                    | 448             | 448    | 448    | 448    | 3       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getLiquidationThreshold                    | 382             | 382    | 382    | 382    | 2       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getMinHealthFactor                         | 404             | 404    | 404    | 404    | 10      |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getPrecision                               | 448             | 448    | 448    | 448    | 3       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getTokenAmountFromUsd                      | 8056            | 10556  | 8056   | 23056  | 6       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| getUsdValue                                | 8033            | 15033  | 12533  | 23033  | 11      |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| liquidate                                  | 85489           | 189990 | 202674 | 243759 | 6       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| mintDSC                                    | 21723           | 97846  | 108503 | 163312 | 3       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| redeemCollateral                           | 22378           | 71307  | 75590  | 111669 | 4       |
|--------------------------------------------+-----------------+--------+--------+--------+---------|
| redeemCollateralForDSC                     | 144778          | 155183 | 155183 | 165588 | 2       |
╰--------------------------------------------+-----------------+--------+--------+--------+---------╯

╭------------------------------------------------------------------------+-----------------+-------+--------+-------+---------╮
| contracts/DecentralizedStableCoin.sol:DecentralizedStableCoin Contract |                 |       |        |       |         |
+=============================================================================================================================+
| Deployment Cost                                                        | Deployment Size |       |        |       |         |
|------------------------------------------------------------------------+-----------------+-------+--------+-------+---------|
| 2047928                                                                | 10766           |       |        |       |         |
|------------------------------------------------------------------------+-----------------+-------+--------+-------+---------|
|                                                                        |                 |       |        |       |         |
|------------------------------------------------------------------------+-----------------+-------+--------+-------+---------|
| Function Name                                                          | Min             | Avg   | Median | Max   | # Calls |
|------------------------------------------------------------------------+-----------------+-------+--------+-------+---------|
| approve                                                                | 54530           | 54530 | 54530  | 54530 | 8       |
|------------------------------------------------------------------------+-----------------+-------+--------+-------+---------|
| balanceOf                                                              | 864             | 2393  | 2864   | 2864  | 17      |
|------------------------------------------------------------------------+-----------------+-------+--------+-------+---------|
| burn                                                                   | 26285           | 26433 | 26433  | 26581 | 2       |
|------------------------------------------------------------------------+-----------------+-------+--------+-------+---------|
| mint                                                                   | 24360           | 47957 | 48020  | 71429 | 4       |
|------------------------------------------------------------------------+-----------------+-------+--------+-------+---------|
| owner                                                                  | 2611            | 2611  | 2611   | 2611  | 4       |
|------------------------------------------------------------------------+-----------------+-------+--------+-------+---------|
| totalSupply                                                            | 2505            | 2505  | 2505   | 2505  | 3       |
|------------------------------------------------------------------------+-----------------+-------+--------+-------+---------|
| transfer                                                               | 29189           | 29374 | 29405  | 29405 | 7       |
╰------------------------------------------------------------------------+-----------------+-------+--------+-------+---------╯


Ran 5 test suites in 984.07ms (3.05s CPU time): 51 tests passed, 0 failed, 0 skipped (51 total tests)
