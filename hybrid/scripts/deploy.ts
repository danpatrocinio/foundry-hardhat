import { ethers, run } from "hardhat";

async function main() {
    // The old way of deploying contracts
    // const Pricefeed = await ethers.getContractFactory("PriceFeed");
    // const pricefeed = await Pricefeed.deploy();
    // await pricefeed.waitForDeployment(); 

    // The new way of deploying contracts   Name of Contract, Constructor Argments, Overrides
    const pricefeed = await ethers.deployContract("PriceFeed", [], {});

    await pricefeed.waitForDeployment();

    console.log(
        `PriceFeed contract address: ${pricefeed.target}`
    );

    console.log("Verifying contract...");

    await new Promise(resolve => setTimeout(resolve, 60000));

    await run("verify:verify", {
        address: pricefeed.target,
        constructorArgments: [],
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});