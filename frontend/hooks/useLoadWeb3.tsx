// import { useState, useEffect } from "react";
// import detectEthereumProvider from "@metamask/detect-provider";
// import Web3 from "web3";

// import TweetNFT from "../../hardhat/artifacts/contracts/TweetNFT.sol/TweetNFT.json";

// // TODO: add support for more networks https://chainlist.org/
// const contractAddresses = {
//   5: process.env.GOERLI_ADDRESS,
// };

// const useLoadWeb3 = async () => {
//   // // connect to the metamask provider and add web3 to the window
//   // const loadWeb3 = async () => {
//   //   const provider = await detectEthereumProvider();
//   //   let contr, acc;
//   //   if (provider) {
//   //     if (provider !== window.ethereum) {
//   //       console.error("Do you have multiple wallets installed?");
//   //       return;
//   //     }
//   //     const ethereum = window.ethereum;
//   //     const web3 = new Web3(provider);
//   //     // connect the wallet account
//   //     const accounts = await ethereum.request({
//   //       method: "eth_requestAccounts",
//   //     });
//   //     if (accounts.length === 0) {
//   //       alert("Please connect a metamask account");
//   //       return;
//   //     } else if (accounts[0] !== account) {
//   //       acc = accounts[0];
//   //     }
//   //     // load the contract
//   //     const chainId = await ethereum.request({ method: "eth_chainId" });
//   //     const contract = new web3.eth.Contract(
//   //       TweetNFT.abi,
//   //       contractAddresses[parseInt(chainId)]
//   //     );
//   //     contr = contract;
//   //   }
//   //   return { contr, acc };
//   // };

//   return { account, contract };
// };

// export default useLoadWeb3;
