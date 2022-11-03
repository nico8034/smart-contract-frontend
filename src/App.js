import React, { useEffect, useState } from "react";
import { DepositToContract, GetAccountBalance, GetBalanceOf, GetContractAddress, GetCurrentAccount, Init, WithdrawFromContract } from "./Client";
import Web3 from "web3";

function App() {
  const [accountBalance, setaccountBalance] = useState('0');
  const [smartContractBalance, setsmartContractBalance] = useState('0');
  const [account, setaccount] = useState('')
  const [depositInput, setdepositInput] = useState('');
  const [withdrawInput, setwithdrawInput] = useState('second');

  const handleOnClick = () => {
    GetAccountBalance().then(balance => {
      setaccountBalance(Web3.utils.fromWei(balance, 'ether'));
    })
  }

  const handleDeposit = () => {
    try {
      DepositToContract(depositInput);
    } catch (error) {
      console.log(error)
    }
  }
  const handleWithdraw = () => {
    try {
      WithdrawFromContract(withdrawInput);
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateSmartContractBalance = () => {
    GetBalanceOf().then(balance => {
      setsmartContractBalance(Web3.utils.fromWei(balance, 'ether'));
    }).catch(err => {
      console.log(err)
    });
  }

  const updateAccount = (account) => {
    setaccount(account);

  }


  useEffect(() => {
    Init(updateAccount);
    // setaccount(GetCurrentAccount());
  }, [])

  return (
    <div className="w-full h-screen  pt-5">
      <div className="mx-auto">
        <h1 className="text-center text-4xl p-10">Ethereum Assignmet</h1>
        <div className="flex justify-center flex-wrap">
          <div className="w-400 bg-slate-300 rounded mr-10">
            <div className="p-4">
              <p className="font-medium py-5">Current Account:</p>
              <p className="bg-slate-200 rounded p-2 font-medium">{account}</p>
              <p className="py-3 font-medium">Account Balance:</p>
              <p className="bg-slate-200 rounded p-2 font-medium mb-2">{accountBalance + " eth"}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOnClick}>Get Balance</button>
              <p className="py-3 font-medium">Deposit Eth To Contract:</p>
              <input className="bg-slate-200 rounded p-2 my-2" onChange={(e) => setdepositInput(e.currentTarget.value)}></input>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeposit}>Deposit</button>
              <p className="py-3 font-medium">Withdraw Eth From Contract:</p>
              <input className="bg-slate-200 rounded p-2 my-2" onChange={(e) => setwithdrawInput(e.currentTarget.value)}></input>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleWithdraw}>Withdraw</button>
            </div>
          </div>
          <div className="w-400 bg-slate-300 rounded ml-10">
            <div className="p-4">
              <p className="font-medium py-5">Bank Smart Contract:</p>
              <p className="bg-slate-200 rounded p-2 font-medium">{GetContractAddress()}</p>
              <p className="py-2 font-medium">Smart Contract Balance of:</p>
              <p className="py-2">{account}</p>
              <p className="bg-slate-200 rounded p-2 font-medium mb-2">{smartContractBalance + " eth"}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpdateSmartContractBalance}>Get Balance</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
