// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TweetNFT is ERC721Full {
    constructor() ERC721Full("TwitterNFT", "ITEM") {
        // set the base URI for the metadata
        _setBaseURI("ipfs://");
    }

    function mint(string memory tokenURI, string memory tweetId) public {
        // store the TweetId as the id of the token being minted
        _mint(msg.sender, tweetId);
        tokenURI(tweetId, tokenURI);
    }
}
