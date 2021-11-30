import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect} from 'react'

function App() {

  const titleRef = useRef();
  const amtRef = useRef();


  function handleFocus(){
    titleRef.current.value = null
  }

  function handleBlurTitle(){
    titleRef.current.value = "Transaction Title"
  }


  function handleFocusAmt(){
    amtRef.current.value = null
  }


  function handleBlurAmt(){
    amtRef.current.value = "Amount"
  }

  return (
    <>
       <div className = "App">
        <p>Your Balance <br></br> $200.00</p>
        <div>
            <div className = "box">
                Expence
            </div>

            <div className = "box">
                Income
            </div>
        </div>

        <p>
          Add Transaction
        </p>

        <form>
          <div>
            <input ref = {titleRef} className = "input-box" type="text" name="title" value = "Transaction Title" onFocus = {handleFocus} onBlur = {handleBlurTitle}/>
          </div>

          {/* <div>
            <input ref = {amtRef} className = "input-box" type="text" name="amount" value = "Amount" onFocus = {handleFocusAmt} onBlur = {handleBlurAmt}/>
          </div> */}
          
          
        </form>
        <p>It is {new Date().toLocaleTimeString()}.</p>
      </div>
    </>
  )
}

export default App;
