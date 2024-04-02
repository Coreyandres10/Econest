import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
const [state,setState]=React.useState([])
React.useEffect(()=>{
fetchData()
},[])
const fetchData=async()=>{
  let response=await axios.get(`http://localhost:3001/get-transaction`)
  console.log("RESPONSe")
  console.log(response.data.response)
  setState(response.data.response)
}
React.useEffect(()=>{
console.log(state)
console.log("USEEFFECT")
},[state])

    return (
  <>
      <h2>Dashboard Content Goes Here</h2>
      <p>Expenses</p>
      {state?.filter(u=>u.type!="Earned").map((val,i)=>{
       return <div key={i.toString()}>
      <p>{val?.Date}</p>
      <p>{val?.Transaction_Detail}</p>
      <p>{val?.Amount}</p>
<p>{val?.Balance}</p>
<p>{val?.Reoccuring}</p>
<p>{val?.type}</p>
        </div>
      })}

<p>Income</p>
      {state?.filter(u=>u.type=="Earned").map((val,i)=>{
       return <div key={i.toString()}>
      <p>{val?.Date}</p>
      <p>{val?.Transaction_Detail}</p>
      <p>{val?.Amount}</p>
<p>{val?.Balance}</p>
<p>{val?.Reoccuring}</p>
<p>{val?.type}</p>
        </div>
      })}
  </>
    )
  }

export default Dashboard;