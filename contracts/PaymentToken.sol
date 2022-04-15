//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PaymentToken is ERC20 {
  address public owner;

  constructor() ERC20("Payment Token", "PAY") {
    owner = msg.sender;
    _mint(msg.sender, 100000 * 10**18);
  }

  function mintToken(address to, uint256 amount) public {
    require(msg.sender == owner, "Only owner can mint tokens");
    _mint(to, amount);
  }
}
