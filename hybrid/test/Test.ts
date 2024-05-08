import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token Exchange", function() {
    async function deployBefore() {

        const price = ethers.parseEther("1000");

        const timestamp = await time.latest();

        const [owner, otherAccount] = await ethers.getSigners();

        const MockDapi = await ethers.getContractFactory("MockDapiProxy");
        const mockDapi = await MockDapi.deploy();
        await mockDapi.waitForDeployment();

        await mockDapi.setDapiValues(price, timestamp);

        const TokenEx = await ethers.getContractFactory("PriceFeed");
        const tokenEx = await TokenEx.deploy();
        await tokenEx.waitForDeployment();

        await tokenEx.setProxyAddress(mockDapi.getAddress());
        
        return { tokenEx, owner, otherAccount, mockDapi, timestamp };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { tokenEx, owner } = await loadFixture(deployBefore);
            expect(await tokenEx.owner()).to.equal(owner.address);
        })
    });

    describe("Set price Feed", function () {
        it("Only we can set the price feed and read", async function () {
            const { tokenEx, owner, otherAccount, mockDapi, timestamp } = await loadFixture(deployBefore);
            await expect(tokenEx.connect(otherAccount).setProxyAddress('0x13d1Ed8c24911d88e6155cE32A66908399C97924')).to.be.revertedWith('Ownable: caller is not the owner');
            await tokenEx.setProxyAddress(mockDapi.getAddress());

            let [price, time] = await tokenEx.readDataFeed();
            //verify our mock values are set
            console.log("Price: ", price.toString());
            console.log("Time: ", time.toString());
            expect(price).to.equal(ethers.parseEther("1000"));
            expect(time).to.equal(await timestamp);
        })
    });

})