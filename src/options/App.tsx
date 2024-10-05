import { browser } from 'webextension-polyfill-ts';
import { getStoredToken } from '@utils/storage'
import React, { useEffect, useState } from 'react'
import config from '@configs/config.dev.json'
import { changeActiveTabURL, formatCookies } from '@utils/cookieUtils'

const App = () => {
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    FetchShared()
  }, [])

  const FetchShared = async () =>{
    setLoading(!loading)
    const token  = await getStoredToken()
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const res = await fetch(`${config.API_URL}/share/get-cookies?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const resData = await res.json()
    try {
      resData.data.cookies[0].storedCookies.map(detail=>{
        detail.cookies.map(cookie=>{
          formatCookies(cookie, resData.data.cookies[0].mainWeb.url)
        })
      })
    } catch (error) {
      console.error('Error mengatur cookie:', error);
    } finally{
      console.log("Cookie Inserted")
      setTimeout(() => {
        changeActiveTabURL(resData.data.cookies[0].mainWeb.url)
        setLoading(!loading)
      }, 3000);
    }
  }


  return (
    <div className='flex flex-1 justify-center items-center flex-col gap-2'>
      <img className='w-14 h-14' src="session_cookies.png" />
      {loading &&(
        <img className='w-14 h-14' src="loading.gif" />
      )}
    </div>
  )
}

export default App