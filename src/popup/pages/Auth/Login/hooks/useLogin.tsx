import React, { useState } from "react"
import config from '@configs/config.dev.json'
import { setStoredToken } from "@utils/storage"
import { useNavigate } from "react-router-dom"
import { getCurrentUser, getLoginUser } from "@utils/api"
interface IState{
  email: string
  password: string
}

interface IReturn {
  state: IState
  setState: React.Dispatch<React.SetStateAction<IState>>
  Submit : ()=> Promise<void>
}

export const useLogin = ():IReturn =>{
  const navigate = useNavigate()
  const initialState: IState = {
    email: "",
    password: ""
  }
  const [state, setState] = useState(initialState)

  const Submit = async () => {
    // navigate('/share/dashboard')
    try {
      const res = await fetch(`${config.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        },
        body: JSON.stringify(state)
      });
      console.log('response data', res)
      if (!res.ok) {
        // Log the response text to see if it's an error message
        const errorText = await res.text();
        console.error(`Error response: ${errorText}`);
        throw new Error(`Network response was not ok. Status: ${res.status}`);
      }

      // Assuming the response is JSON if the status is OK
      const resLogin = await res.json();
      console.log(`resLogin: ${resLogin.data.access_token}`);
      setStoredToken(resLogin.data.access_token, 3600000)
      await getLoginUser(resLogin.data.access_token)
      navigate('/share/dashboard')
    } catch (error) {
      console.error('Submit error:', error);
    }
  };



  return{
    state,
    setState,
    Submit
  }
}