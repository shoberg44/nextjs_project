'use client'
import { useState, useEffect } from 'react';


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

  var didClick = false;
  function SubmitButton(){
    didClick = true;
    
    //console.log("Submit Clicked!");
  }

  // fetch reqeust stuff
  // https://dmitripavlutin.com/javascript-fetch-async-await/
  const [shouldFetch, setShouldFetch] = useState(false); // State to trigger fetch
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null); // Allow string or null
  const [loading, setLoading] = useState(true); // Boolean for loading state
  
  function FetchRequest(){
    
    console.log("Request Clicked!");
    setShouldFetch(true); // Trigger the fetch process
   
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div>
        <h1>Fetched Data:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
    
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch('https://randomuser.me/api/'); // Replace with your API URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result); // Save fetched data to state
      } catch (err) {
        setError((err as Error).message || 'An unknown error occurred.'); // Force TypeScript to treat err as an Error
      } finally {
        setLoading(false); // End loading
        setShouldFetch(false);
      }
    };
    
    fetchData(); // Call the function
    
  }, [shouldFetch]);
  
  
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
         <div style={{marginLeft: '10px'}}>
          <p>
            Your inputs [{myArray.toString()}]
          </p>
        </div>
      </div>
      
      <div>
        <p style={{marginTop: "20px", color: 'rebeccapurple'}}>
          Endpoint Request
        </p>
        
        <button
          onClick={FetchRequest} // Call FetchRequest when clicked
          disabled={loading} // Disable the button while loading
          style={{
            color: 'green'
          }}>{loading ? 'Loading...' : 'Fetch Data'}
        </button>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {data && (
          <div>
            <h2>Fetched Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}


      </div>
    </h1>
    
  );
}
// use useState tag https://react.dev/reference/react/useState