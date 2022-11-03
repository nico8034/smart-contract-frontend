pragma solidity ^0.8.0;

contract Bank2 {
    mapping(address => uint256) public _balances;

    function deposit() public payable {
        _balances[msg.sender] += msg.value;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return (_balances[owner]);
    }

    function withdraw(uint256 amount) public {
        require(_balances[msg.sender] >= amount, "Insufficient funds");
        _balances[msg.sender] -= amount;
        (bool sent, ) = msg.sender.call{value: amount}("funds has withdrawn");
        require(sent, "Unable to send funds");
    }
}
