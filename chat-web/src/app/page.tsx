'use client'
import { useState } from 'react';

export default function Home() {
  
  // allows these values to be used dynamically with components
  const [input, setInput] = useState('');
  const [myArray, setMyArray] = useState<string[]>([]);

  

  function TextBoxChanged(event: React.ChangeEvent<HTMLInputElement>){

    // updates the state value
    setInput(event.target.value);
    
    // this will display on behind the actual value because the state value is only for the next render
    //console.log("Textbox Changed To: " + input);
  }

  
  function SubmitButton(){
    setMyArray(prev => [...prev,input]); // update the state value
    setInput(''); // clear the state varable which is synced to the compents value this also clearing the text-box
    
    //console.log("Submit Clicked!");
    //console.log(myArray);
  }
  
  return (
    <h1>
      Hello!
      <div style={{ marginBottom: '50px', marginLeft: '10px' }}>
        <input
        value={input} // syncs the value with input in the useState hook above
        type="text" // the type of input
        placeholder="Enter an element..."
        onChange={TextBoxChanged}
        style={{  marginTop: "10px", backgroundColor: 'lightgreen', color: 'black' }} />
        <input
         type="submit"
         onClick={SubmitButton}
         style={{ marginLeft: '5px', color: 'green' }} />
      </div>
      <div style={{marginLeft: '10px'}}>
        <p>
          Your inputs [{myArray.toString()}]
        </p>
      </div>
    </h1>
  );
}
// use useState tag https://react.dev/reference/react/useState