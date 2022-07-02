// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TweetNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private counter;

    constructor() ERC721("TweetNFT", "TWT") {}

    function mint(string memory metadataURI) public {
        counter.increment();
        uint256 nftId = counter.current();
        _mint(msg.sender, nftId);
        _setTokenURI(nftId, metadataURI);
    }
}
