import './App.css';
import React, { useRef, useState, useEffect } from 'react'
import Transactions from './Transactions';

function App() {

  const [transactions, setTransactions] = useState([])
  const titleRef = useRef();
  const amtRef = useRef();
  const expenseRef = useRef();
  const incomeRef = useRef();


  

  const LOCAL_STORAGE_KEY = 'transactionApp.transactions'


  let randomId = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTransactions) setTransactions(storedTransactions)
  }, [])


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])


  function handleFocusTitle(){
    if (titleRef.current.value === titleRef.current.defaultValue){
      titleRef.current.value = null
      titleRef.current.className = "input-box-focus"
    }

    
  }

  function handleBlurTitle(){
    if (titleRef.current.value === ''){
      titleRef.current.value = "Transaction Title"   
      titleRef.current.className = "input-box"
    }
    
    
  }

  function handleFocusAmt(){
    if (amtRef.current.value === amtRef.current.defaultValue){
      amtRef.current.value = null
      amtRef.current.className = "input-box-focus"
    }
  }

  function handleBlurAmt(){
    if (amtRef.current.value === ''){
      amtRef.current.value = "Amount"
      amtRef.current.className = "input-box"
    }
  }

  function handleAddTransaction(e){
    const title = titleRef.current.value
    const amt= amtRef.current.value
    const incBtn = incomeRef.current.checked
    const expBtn = expenseRef.current.checked

    // console.log(title)
    // console.log(amt)
    // console.log(incBtn)
    // console.log(expBtn)
   

    if (title === titleRef.current.defaultValue || title === ''){
      window.alert("Please enter a transaction title")
      return
    }

    if (amt === amtRef.current.defaultValue || amt === ''){
      window.alert("Please enter a transaction title")
      return
    }

    if (incBtn === false && expBtn === false){
      window.alert("Please select the transaction amount")
      return
    }

    if (expBtn === true && (calBalance() < parseFloat(amt))){
      window.alert("Error: Insufficient balance")
      return
    }

    setTransactions(prevTransactions => {
      return [{ id: randomId(), name:title, amount:parseFloat(amt) , income:incBtn}, ...prevTransactions]
    })



    titleRef.current.value = titleRef.current.defaultValue
    titleRef.current.className = "input-box"
    amtRef.current.value = amtRef.current.defaultValue
    amtRef.current.className = "input-box"
  }

  function handleClearTransactions(){
    setTransactions([])
  }

  function calValue(cond){
    if (transactions.length > 0){
      let incomeTransactions = transactions.filter(transaction => transaction.income === cond)
      let incomes = incomeTransactions.map(transaction => parseFloat(transaction.amount))
      return incomes.reduce((a, b) => a + b, 0)
    }
    else{
      return 0
    }
    
  }

  function calBalance(){
    return (calValue(true) - calValue(false))
  }

  function formatAmount(num){
    return (Math.round(num * 100) / 100).toFixed(2);
  }


  return (
    <>
       <div className = "App">
        <p>Your Balance <br></br> <strong id = "balanceDisplay"> $ {formatAmount(calBalance())} </strong> </p> 
        <div>
            <div className = "box" >
                Expence
                <br></br> <span id = "expenceDisplay" className = "expense"> $ {formatAmount(calValue(false))} </span>
            </div>

            <div className = "box" >
                Income
                <br></br> <span id = "incomeDisplay" className = "income"> $ {formatAmount(calValue(true))} </span>
            </div>
        </div>

        {/* <p>
          Add Transaction
        </p> */}

        <div className = "form">
          <div>
            <p className = "add-label"> Add Transaction</p>
            <input ref = {titleRef} id = 'titleInput' className = "input-box" type="text" name="title" defaultValue = "Transaction Title" onFocus = {handleFocusTitle} onBlur = {handleBlurTitle}/>
          </div>

          <div>
            <input ref = {amtRef} id = 'amountInput' className = "input-box" type="text" name="amount" defaultValue = "Amount" onFocus = {handleFocusAmt} onBlur = {handleBlurAmt}/>
          </div>

          <div className = "radio">
            <input ref = {expenseRef} type="radio" id = "expence" name="transaction_type" value="Expence"></input>
            <label className = "expenseRadio" htmlFor="expence">Expence</label>
            
            <input ref = {incomeRef} type="radio" id = "income" name="transaction_type" value="Income"></input>
            <label htmlFor="income">Income</label>
          </div>

          <input id = "addButton" type="submit" className = "add-button" value="Add Transaction" onClick = {handleAddTransaction}></input>
          
          
        </div>

        <div id = "historyList">
          <div >
            <p className = "history">History</p>
            <button className = "clear-button" type = "button" onClick = {handleClearTransactions}>Clear</button>
          </div>

          <Transactions transactions = {transactions} />

        </div>
        
        
        
      </div>
    </>
  )
}

export default App;
