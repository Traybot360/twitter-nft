import { expect } from "chai";
import { ethers } from "hardhat";

describe("TwitterNFT", function () {
  // it("Should return the new greeting once it's changed", async function () {
  //   const Greeter = await ethers.getContractFactory("Greeter");
  //   const greeter = await Greeter.deploy("Hello, world!");
  //   await greeter.deployed();

  //   expect(await greeter.greet()).to.equal("Hello, world!");

  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();

  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });
  it("deploys a contract", async function () {
    const contract = await ethers.getContractFactory("TweetNFT");
    const tweetNFT = await contract.deploy();
    await tweetNFT.deployed();
  });
  it("mints to a wallet", async function () {
    const [owner] = await ethers.getSigners();

    const contract = await ethers.getContractFactory("TweetNFT");
    const tweetNFT = await contract.deploy();
    await tweetNFT.deployed();
    const mintTx = await tweetNFT.mint(
      "bafyreihe6j56xwqkfmqh7ufnprmhhnkgthqgpykq3lj55bgxcniexfngc4/metadata.json"
    );
    await mintTx.wait();
    const balance = await tweetNFT.balanceOf(owner.address);
    expect(balance).to.equal("1");
  });
});
