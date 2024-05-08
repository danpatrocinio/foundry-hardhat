// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {PriceFeed} from "../contracts/PriceFeed.sol";
import {MockDapiProxy} from "../contracts/Mocks/MockDapi.sol";
import {DeployPriceFeed} from "../scripts/DeployPriceFeed.s.sol";
import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";

contract TestPriceFeed is Test {
    PriceFeed public priceFeed;
    MockDapiProxy public mockDapi;

    function setUp() external {
        DeployPriceFeed deployer = new DeployPriceFeed();
        (mockDapi, priceFeed) = deployer.run();
    }

    /** to see logs "forge test -vv" for more tracing add more v's */
    function testOwner() public view {
        console.log("PriceFeed owner: %s", address(priceFeed.owner()));
        console.log("Msg sender: %s", address(msg.sender));
        assert(priceFeed.owner() == msg.sender);
    }

    function testPriceFeed() public {
        int224 price = 100e18;
        uint256 expectedValue = 100e18;
        // Make sure only owner can set proxy address
        vm.expectRevert();
        priceFeed.setProxyAddress(address(mockDapi));
        // starting Prank ALL subsequent calls will come from msg.sender
        vm.startPrank(msg.sender);
        // setting a block time
        vm.warp(1692843154);
        mockDapi.setDapiValues(price, uint32(block.timestamp));
        priceFeed.setProxyAddress(address(mockDapi));
        vm.stopPrank();
        (uint a, uint b) = priceFeed.readDataFeed();
        console.log("PriceFeed Value", a);
        console.log("PriceFeed Timestamp", b);
        console.log("Expected Value", expectedValue);

        assert(expectedValue == a);
        assert(b == uint32(block.timestamp));
    }
}