import Web3 from "web3";
import BankContract from "contracts/Bank2.json"

const networkId = "1667488954185";
let currentAccount;
let bankContract;
let isInitialized = false;
let web3;
export const Init = async (updateAccount) => {
  let provider = window.ethereum;

  if (typeof provider !== undefined) {
    provider.request({
      method: 'eth_requestAccounts'
    }).then(accounts => {
      currentAccount = accounts[0];
      updateAccount(accounts[0])
      // console.log(accounts)
    }).catch(err => {
      console.log(err)
      return
    });

    window.ethereum.on('accountsChanged', (accounts) => {
      currentAccount = accounts[0];
      updateAccount(accounts[0])
      // console.log("Account changed " + currentAccount)

    })
  }
  // "http://127.0.0.1:8545"
  web3 = new Web3(provider);

  // const networkId = await web3.eth.net.getId();

  bankContract = new web3.eth.Contract(
    BankContract.abi,
    BankContract.networks[networkId].address
  )

  isInitialized = true;
}

export const DepositToContract = async (amount) => {
  amount = Web3.utils.toWei(amount, 'ether');
  let response = await bankContract.methods.deposit().send({ from: currentAccount, value: amount })
  console.log(response)
}

export const WithdrawFromContract = async (amount) => {
  amount = Web3.utils.toWei(amount, 'ether');
  let response = await bankContract.methods.withdraw(amount).send({ from: currentAccount })
  console.log(response)

}

export const GetBalanceOf = async () => {
  if (!isInitialized) {
    await Init();
  }

  return await bankContract.methods.balanceOf(currentAccount).call();
}

export const GetContractAddress = () => {
  return BankContract.networks[networkId].address;
}

export const GetCurrentAccount = () => {
  return currentAccount;
}

export const GetAccountBalance = async () => {
  let balance = await web3.eth.getBalance(currentAccount)
  return balance;

}