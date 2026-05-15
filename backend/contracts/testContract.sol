// SPDX-License-Identifier: MIT
// pragma solidity ^0.4.24;

// contract Honeypot {
//     // This will trigger 'detectBlacklist'
//     mapping(address => bool) public blacklisted;
//     address public owner;

//     constructor() public {
//         owner = msg.sender;
//     }

//     // This will trigger 'detectOwnerPrivileges'
//     function withdraw() public {
//         if (msg.sender == owner) {
//             msg.sender.transfer(address(this).balance);
//         }
//     }

//     // This will trigger 'detectSellLock'
//     function transfer(address to, uint256 amount) public {
//         require(blacklisted[msg.sender] == false);
//     }
// }

pragma solidity ^0.4.24;
contract Honeypot {
    mapping(address => bool) public blacklisted;
    address public owner;
    function withdraw() public {
        if (msg.sender == owner) {
            msg.sender.transfer(1 ether);
        }
    }
}
