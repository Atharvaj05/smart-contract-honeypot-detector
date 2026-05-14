// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TestToken {
    mapping(address => bool) public blacklist;

    function setBlacklist(address user, bool value) public {
        blacklist[user] = value;
    }

    function transfer(address to, uint amount) public view {
        require(!blacklist[msg.sender], "Blacklisted");

        to;
        amount;
    }
}
