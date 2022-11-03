const Bank = artifacts.require('Bank2.sol');

contract("Bank2", async (accounts) => {
  it("Deposit funds to bank smart contract", async () => {
    const bank = await Bank.new();
    const depositor = accounts[1];
    console.log("Bank funds: " + await web3.eth.getBalance(bank.address));

    const amount = web3.utils.toWei("10", 'ether')

    await bank.deposit({
      from: depositor,
      value: amount
    })

    let balance = await bank.balanceOf(depositor)
    balance = parseInt(web3.utils.fromWei(balance, 'ether'))
    assert.equal(balance, 10)
    console.log("Bank funds: " + balance);
  });

  it("Withdraw funds from bank smart contract", async () => {
    const bank = await Bank.new();
    const depositor = accounts[2];
    const amount = web3.utils.toWei("20", 'ether');

    await bank.deposit({
      from: depositor,
      value: amount
    })

    console.log("Bank funds: " + parseInt(web3.utils.fromWei(await bank.balanceOf(depositor), 'ether')))

    const amountToWithdraw = web3.utils.toWei("10", 'ether');
    await bank.withdraw(amountToWithdraw, { from: depositor });
    const balance = parseInt(web3.utils.fromWei(await bank.balanceOf(depositor), 'ether'));
    console.log("Bank funds: " + balance);
    assert.equal(balance, 10);

  })
})