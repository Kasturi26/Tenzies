import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid';
import './App.css';
import Die from './Die';
import Confetti from 'react-confetti';

function App() {

  const[dice,setDice] = useState(allNewDice());
  const[tenzies, setTenzies] = useState(false)

  useEffect(()=>{
     const allHeld = dice.every(die => die.isHeld)
     const firstValue = dice[0].value
     const allSameValue = dice.every(die=>die.value === firstValue)
     if(allHeld && allSameValue){
       setTenzies(true)
       console.log("You Won")
     }
  },[dice])

  function allNewDice(){
    const newDice=[]
    for(let i=0;i<10;i++){
      newDice.push(generateNewDie())
    }
    return newDice;
  }

  function generateNewDie(i){
    return {
      value : Math.ceil(Math.random() * 6),
      isHeld : false,
      id : nanoid()
    }
  }

function holdDice(id){

  setDice(oldDice => oldDice.map(die=> {
    return die.id === id ? {...die,isHeld : !die.isHeld} : die 
  }))
}

  function rollDice(){
    if(!tenzies){
    setDice(oldDice => oldDice.map(die=> {
      return die.isHeld ? die : generateNewDie()
    }))
    }
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
  } 
  const diceElements=dice.map(die=>
      <Die key={die.id} 
      value={die.value} 
      isHeld = {die.isHeld}
      holdDice={()=>holdDice(die.id)}></Die>)

  return (
    <div className="App">
      {tenzies && <Confetti/>}
      <h1>Tenzies</h1>
      <p className='instructions'>
        Roll until all dice are the same. 
        Click each dice to freeze it at its current value between rolls.</p>
    <div className="dice-container">
     {diceElements}
    </div>
    <button className='roll-dice'onClick={rollDice}>
      {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
