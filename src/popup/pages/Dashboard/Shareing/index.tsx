import React from 'react'
import { useShareing } from './hooks/useShareing'
import {navigateRouter} from '@utils/navigation'
import { useNavigate } from 'react-router-dom'
import {  Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Calendar from 'react-calendar';
import moment from 'moment'
import DashboardHeader from '../../../components/DashboardHeader/DashboardHeader'
// import 'react-calendar/dist/Calendar.css';

const Shareing = () => {
  const {state, setState, modal, setModal, Submit, renderNewCookies} = useShareing()
  console.log('state userdata >>',state.user)
  // console.log('state.sharedData.cookies >>',state.sharedData.cookies)
  return (
    <>
    <DashboardHeader/>
    <div className='flex flex-col full-bg'>
      {!modal.modalShare ? (
            <div className='flex flex-1 flex-col h-52 overflow-y-auto gap-3'>
              <div className='flex flex-col h-14 pt-4 px-4 gap-2 w-full text-start'>
                <span style={{
                  color: '#898989'
                }}>Current Visited</span>
                <div className='flex flex-row justify-between items-center w-full pb-2' style={{
                  borderBottom: '2px solid #F3F3F3',
                }}>
                    <img className='w-6 h-6' src={state.faviconUrl} alt="session-icons" />
                    <span className='text-sm' style={{
                      color: '#1C4397'
                    }}>{state.title}</span>
                    <button className='text-white font-bold text-sm/[14px] p-2 rounded-md' type="button" style={{
                      backgroundColor: '#DEE8FF'
                    }} onClick={()=> setModal({
                      ...modal,
                      modalShare: !modal.modalShare
                    })}>Share</button>
                  </div>
              </div>
              {state.sharedData?.cookies && state.sharedData?.cookies.length > 0 && state.sharedData.cookies.map((shared, index) => (
                <div className='flex flex-col h-14 pt-4 px-4 gap-2 w-full text-start'>
                  <span style={{
                    color: '#898989'
                  }}>All Website</span>
                  <div className='flex flex-row justify-between items-center w-full pb-2' style={{
                    borderBottom: '2px solid #F3F3F3',
                  }}>
                      <img className='w-6 h-6' src={shared.mainWeb.faviconUrl} alt="session-icons" />
                      <span className='text-sm' style={{
                        color: '#1C4397'
                      }}>{shared.mainWeb.url.substring(0, 42)}</span>
                      <button className='text-white font-bold text-sm/[14px] p-2 rounded-md' type="button" style={{
                        backgroundColor: '#DEE8FF'
                      }} onClick={()=>renderNewCookies(shared.payload.id)}>Share</button>
                    </div>
                </div>
              ))}

            </div>

      ):(

            <div className='flex flex-1 flex-col overflow-y-auto gap-3 py-2 px-3'>
               <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <input type="text" name="email" style={{
                    backgroundColor: "#F9F9F9"
                  }} className='px-2 py-3 rounded-md w-full' placeholder='Masukan Email' onChange={(e)=>setState({
                    ...state,
                    payload: {
                      ...state.payload,
                      email: e.target.value
                    }
                  })}/>
              </div>
              <div className='p-2 w-full rounded-md' style={{
                backgroundColor: '#F9F9F9'
              }}>
                  <Calendar onChange={(date: Date)=>setState({
                    ...state,
                    payload: {
                      ...state.payload,
                      expired: date
                    }
                  })} value={state.payload.expired} formatLongDate={(locale, date) =>moment(date).format("DD/MM/YYYY")} />
              </div>
              <div className="flex w-full">
                <button className='p-2 text-white w-full text-center rounded-md' style={{
                    backgroundColor: '#473BF5'
                  }} onClick={Submit}>Konfrimasi Share</button>
              </div>
            </div>
      )}
    </div>
    {/* <div className='flex flex-col full-bg'>
      <div className="flex flex-1 flex-col gap-2 p-2 justify-center">
        {state.user.role.name !== "" && (
          <>

            {state.user.role.name !== "User" && (
              <>
              <p>Current Visit Web</p>
              <div className='flex flex-row justify-between items-center h-14 w-full p-2 bg-slate-300 gap-2'>
                <img className='w-6 h-6' src={state.faviconUrl} alt="session-icons" />
                <p className='text-white'>{state.title}</p>
                <button className='bg-green-500 text-white font-bold text-base p-2' type="button" onClick={()=> setModal({
                  ...modal,
                  modalShare: !modal.modalShare
                })}>Share</button>
              </div>
                </>
              )}
            </>
          )}
        <p>Shared Domain </p>
        {state.sharedData.cookies && state.sharedData.cookies.length > 0 && state.sharedData.cookies.map((shared, index) => (
          <div key={index} className="flex flex-row justify-between items-center h-14 w-full p-2 bg-slate-300 gap-2">
            <img className='w-6 h-6' src={shared.mainWeb.faviconUrl} alt="session-icons" />
            <p className="text-white">{shared.mainWeb.url.substring(0, 42)}</p>
            <button
              className="bg-green-500 text-white font-bold text-base p-2"
              type="button"
              onClick={()=> renderNewCookies(shared.payload.id)}
            >
              Open Tab
            </button>
          </div>
        ))}


      </div>
    <Dialog open={modal.modalShare} onClose={() => setModal({
      ...modal,
      modalShare: !modal.modalShare
    })} className="relative z-40">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Share Account</DialogTitle>
            <input type="text" className='p-2 w-full rounded-md border border-neutral-500' placeholder='Email' onChange={(e)=>setState({
              ...state,
              payload: {
                ...state.payload,
                email: e.target.value
              }
            })}/>
          {modal.modalCalendar && (

            <div className='bg-slate-300 p-2 w-full'>
              <Calendar onChange={(date: Date)=>setState({
                ...state,
                payload: {
                  ...state.payload,
                  expired: date
                }
              })} value={state.payload.expired} formatLongDate={(locale, date) =>moment(date).format("DD/MM/YYYY")} />
              <button type="button" onClick={()=>setModal({
              ...modal,
              modalCalendar: !modal.modalCalendar
            })}>Set Date</button>
            </div>
          )}
            <input type="text" value={moment(state.payload.expired).format("DD/MM/YYYY")} className='p-2 w-full rounded-md border border-neutral-500' placeholder='Expired' onClick={()=>setModal({
              ...modal,
              modalCalendar: !modal.modalCalendar
            })}/>
            {state.errors.user &&(
              <small className='text-red-400'>{state.errors.user}</small>
            )}
            <div className="flex gap-4">
              <button onClick={Submit}>Share</button>
            </div>
          </DialogPanel>

        </div>
      </Dialog>

    </div> */}
    </>
  )
}

export default Shareing