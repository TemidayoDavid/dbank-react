import { useState } from 'react';
import { dbankreact_backend } from 'declarations/dbankreact_backend';

function App() {
 window.addEventListener("load", async function(){
  update();
 })

  const [amount, setAmount] = useState({
    topUp:"",
    withdraw:""
  });

  const [money, setMoney] = useState([]);
  
   const [one] = money;
  //console.log(one.topUp);
 

  function handleChange(event) {
    
   const {name, value} = event.target;
   setAmount(prevAmount => {
    return {
      ...prevAmount, [name]: value
    };
   })
    //console.log(amount);
    //return false;
  }
  

  async function handleSubmit(event){
    event.preventDefault();
    document.querySelector("#submit-btn").setAttribute("disabled", true);
    //console.log(typeof(amount.topUp))
    
    if(amount.topUp.length != 0){
      await dbankreact_backend.topUp(parseFloat(amount.topUp));
    }else if(amount.withdraw.length !=0) {
      await dbankreact_backend.withdraw(parseFloat(amount.withdraw));
    }else{
      console.log("no meaningful input");
    }
    update();
    // setMoney(prevAmount => {
    //   return [...prevAmount, amount];
    // });
   
    
    
    setAmount({
      topUp:"",
      withdraw:""
    })

   document.querySelector("#submit-btn").removeAttribute("disabled");
       
  }

  async function update(){
    const currentAmount = await dbankreact_backend.checkBalance();
    setMoney([currentAmount]);
    
    console.log(currentAmount)
  }

  


  return (
    <main>
      <div className="container">
      <img src="./dbank_logo.png" alt="DBank logo" width="100"/>
      <h1>Current Balance: $<span id="value">{one}</span></h1>
      <div className="divider"></div>
      <form action="#">
      <h2>Amount to Top Up</h2>
      <input  onChange={handleChange} id="input-amount" type="number" step="0.01" min="0" name="topUp" value={amount.topUp}/>
      <h2>Amount to Withdraw</h2>
      <input onChange={handleChange} id="withdrawal-amount" type="number" name="withdraw" step="0.01" min="0" value={amount.withdraw}/>
      <button onClick={handleSubmit} id="submit-btn" type="submit" value="Finalise Transaction">Finalise Transaction</button>
    </form>
    </div>
    
    </main>
  );
}

export default App;
