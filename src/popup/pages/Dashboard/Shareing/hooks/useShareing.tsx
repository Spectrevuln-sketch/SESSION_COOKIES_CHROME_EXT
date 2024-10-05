import React, { useEffect, useState } from "react"
import { browser } from 'webextension-polyfill-ts';
import config from '@configs/config.dev.json'
import {  getStoredToken, getUserStorage } from "@utils/storage"
import { currentTab, getAllCookies } from "@utils/cookieUtils"
import { TypeCookieState } from "../../../../../types/GlobalTypes"

interface Role {
  createdAt: string;  // ISO date string
  id: number;
  name: string;
  updatedAt: string;  // ISO date string
}

interface User {
  createdAt: string;  // ISO date string
  email: string;
  id: number;
  my_shared_cookies: string | null;
  password: string;
  role: Role;
  role_id: number;
  shared_cookies: string | null;
  updatedAt: string;  // ISO date string
}

interface IState{
  title: string
  faviconUrl: string
  url: string
  payload: {
    email: string,
    expired: Date
  },
  sharedData: any
  user: User,
  errors:{
    user: string
  }
}


interface Cookie {
  domain: string;
  expirationDate: number;
  hostOnly: boolean;
  httpOnly: boolean;
  name: string;
  path: string;
  sameSite: 'lax' | 'strict' | 'none';
  secure: boolean;
  session: boolean;
  storeId: string;
  value: string;
  size: number;
  formatedSize: string;
  expirationMessage: string;
  expirationDateString: string;
  badges: any[]; // You might want to define a more specific type if you know what kind of items badges can contain
}

interface ISetCookies {
  domain: string;
  size: number;
  formatedSize: string;
  cookies: Cookie[];
}

interface ISetModal {
  modalShare : boolean
  modalCalendar: boolean
}

interface IReturn {
  state: IState
  setState: React.Dispatch<React.SetStateAction<IState>>
  modal: ISetModal
  setModal: React.Dispatch<React.SetStateAction<ISetModal>>
  Submit : ()=> Promise<void>,
  renderNewCookies: (id: string) => Promise<void>
}

export const useShareing = ():IReturn =>{
  const initialState: IState = {
    title: "",
    faviconUrl: "",
    url: "",
    payload: {
      email: "",
      expired: new Date()
    },
    sharedData: {
      cookies: [],
      user: []
    },
    user: {
      createdAt: "", // empty string or initial date value
      email: "",
      id: 0,
      my_shared_cookies: null,
      password: "",
      role: {
        createdAt: "",
        id: 0,
        name: "",
        updatedAt: ""
      },
      role_id: 0,
      shared_cookies: null,
      updatedAt: ""
    },
    errors: {
      user: ""
    }
  };
  const initialModal: ISetModal ={
    modalShare: false,
    modalCalendar: false
  }

  // Define the initial state
  const initialStateCookies: TypeCookieState = {
    domain: "",
    size: 0,
    formatedSize: "",
    cookies: [],
  };

  // If cookies is supposed to be an array of TypeCookieState
  const initialCookiesState: TypeCookieState[] = [initialStateCookies];

  const [state, setState] = useState<IState>(initialState);
  const [cookies, setCookies] = useState<TypeCookieState[]>(initialCookiesState);
  const [modal, setModal] = useState<ISetModal>(initialModal)

  useEffect(()=>{
    getSharedData()
    currentTab().then(tabActive=>{
      setState((prevState) => ({
        ...prevState,
        title: tabActive.title,
        faviconUrl: tabActive.favIconUrl,
        url: tabActive.url,
      }));
    })

    getAllCookies().then((cookiesData)=>{
      setCookies(cookiesData)
    })
  },[])



  const getSharedData = async () =>{
    const userData = await getUserStorage()
    setState({
      ...state,
      user: userData
    })
    const token  = await getStoredToken()
    const res = await fetch(`${config.API_URL}/share-cookies/find-my-cookies-share`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const resData = await res.json()
    console.log('data cookies', resData)
    setState((prevState) => ({
      ...prevState,
      sharedData: resData.data
    }));
  }



  const renderNewCookies = async (id: string) => {
    const optionsUrl = new URL(browser.runtime.getURL("options.html"));

    // Append the `id` as a query parameter
    optionsUrl.searchParams.set('id', id);

    await browser.tabs.create({
      url: optionsUrl.toString(), // Convert URL object to string
      active: true,
    });
  };

  const Submit = async () => {
    try {
      const token  = await getStoredToken()

      const res = await fetch(`${config.API_URL}/share-cookies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mainWeb: {
            title: state.title,
            faviconUrl: state.faviconUrl,
            url: state.url
          },
          payload: state.payload,
          storedCookies: cookies
        })
      });

      if (!res.ok) {
        // Log the response text to see if it's an error message
        const errorText = await res.text();
        setState({
          ...state,
          errors: {
            user:errorText
          }
        })
        console.error(`Error response: ${errorText}`);
        throw new Error(`Network response was not ok. Status: ${res.status}`);
      }

      // Assuming the response is JSON if the status is OK
      const resLogin = await res.json();
      console.log(`resLogin: ${resLogin}`);
      setModal({
        ...modal,
        modalShare: false
      })
    } catch (error) {
      console.log('Submit error:', error);
    }
  };



  return{
    state,
    setState,
    modal,
    setModal,
    Submit,
    renderNewCookies
  }
}