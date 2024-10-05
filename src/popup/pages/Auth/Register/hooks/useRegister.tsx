import React, { useState } from "react"
import config from '@configs/config.dev.json'
import { useNavigate } from "react-router-dom"
interface IState{
  email: string
  password: string
}

interface IReturn {
  state: IState
  setState: React.Dispatch<React.SetStateAction<IState>>
  Submit : ()=> Promise<void>
}

export const useRegister = ():IReturn =>{
  const navigate = useNavigate();
  const initialState: IState = {
    email: "",
    password: ""
  }
  const [state, setState] = useState(initialState)

  const Submit = async () => {
    // try {
      const res = await fetch(`${config.API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        },
        body: JSON.stringify(state)
      });
      if (!res.ok) {
        // Log the response text to see if it's an error message
        const errorText = await res.text();
        console.error(`Error response: ${errorText}`);
        throw new Error(`Network response was not ok. Status: ${res.status}`);
      }

      // Assuming the response is JSON if the status is OK
      const resLogin = await res.json();
      console.log(`resLogin: ${resLogin}`);
      navigate('/')
  };



  return{
    state,
    setState,
    Submit
  }
}