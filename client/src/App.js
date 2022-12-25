import {useState} from 'react';
function App() {
  const [form, setForm] = useState({
    amount:0,
    description:"",
    date:""
  })
  const handleInput=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();       // Page not reload on submitation 
    const res=await fetch("http://localhost:4000/transaction",{
      method:"POST",
      body:JSON.stringify(form),
      headers:{
        "content-type":"application/json"               // send the data in form of application/json 
      }

    });
    const data=await res.json();
    console.log(data)
  }
  return (
    <>
     <form onSubmit={handleSubmit}>
      <input type="number" name='amount' value={form.amount} onChange={handleInput} placeholder="Enter transactions amount" />
      <input type="text"   name='description' value={form.description}  onChange={handleInput}placeholder="Enter transactions details" />
      <input type="date"   name='date' value={form.date} onChange={handleInput}/>
      <button type="submit">Submit</button>
     </form>
    </>
  );
}

export default App;
