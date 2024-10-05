import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import { getCurrentUser, GetTableData } from '../utils/api'
import DataTable from 'react-data-table-component';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Shareing from './pages/Dashboard/Shareing';
import { useShareing } from './pages/Dashboard/Shareing/hooks/useShareing';
import { getStoredToken, setFormData, setStoredToken } from '@utils/storage';
import Register from './pages/Auth/Register';


interface ValueTaskType {
  Category: string,
  "Clock in": string,
  "Clock out": string,
  "Current entry": string,
  "Current duration": string,
  "Total today": string,
  Tracking?: string,
  Task: string
}

interface TaskType {
  id: string,
  data: string,
}

const App: React.FC<{}> = () => {
  const [token, setToken] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const messageListener = (message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
      console.log('message', message.action)
      if (message.action === 'contentWebActive' || message.action === 'getTabInfo') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log('token data>>>', token)
        const tab = tabs[0];
        if (tab) {
          // contentWebActive
          sendResponse({
            title: tab.title,
            faviconUrl: tab.favIconUrl,
            url: tab.url
          });
          console.log('Title', tab.title)
          console.log('faviconUrl', tab.favIconUrl)
          console.log('url', tab.url)
          setFormData({
            title: tab.title,
            faviconUrl: tab.favIconUrl,
            url: tab.url
          })
        } else {
          sendResponse({ error: 'Tidak ada tab aktif' });
        }
      });

      }
    };

    // Listen to messages from the background script
    chrome.runtime.onMessage.addListener(messageListener);

    // Cleanup listener on component unmount
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  },[]);



  useEffect(() => {
    getStoredToken().then(isLoginToken => {
      setToken(isLoginToken)
      setLoading(false);
    })
    getCurrentUser()
  }, [token])

    if (loading) {
      return <div>Loading...</div>;
    }

  return (
      <>

        {/* Content */}
        <Router>
          <Routes>
          <Route
            path="/"
            element={
              token === '' || token === null ? (
                <Navigate to="/login" replace />
              ):(
                <Navigate to="/share/dashboard" replace />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/share/dashboard" element={<Shareing />} />
          </Routes>
        </Router>
        {/* End Content */}

      </>
  )
}

export default App