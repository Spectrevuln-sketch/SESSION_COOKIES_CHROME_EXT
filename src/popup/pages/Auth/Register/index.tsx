import React from 'react'
import { useRegister } from './hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';

const Register = () => {
  const navigate = useNavigate();
  const {state, setState, Submit} = useRegister()
  return (
    <>
      {/* Back Nav */}
      <Header title="Shareing Cookies" />
      {/* End Back Nav */}
      <div className='flex flex-col full-bg'>
        <div className='flex flex-col flex-1 px-3'>
          <div className='flex flex-1 flex-col gap-2'>
            <div className='flex flex-col w-full justify-center items-center'>
              <p style={{
                fontWeight: 600,
                fontSize: '20px'
              }} >Create New Account</p>
              <span className='text-sm/[14px] text-center' style={{
                color:'#787878'
              }}>Daftar sekarang dan mulai nikmati berbagai keuntungan eksklusif.</span>
            </div>
          <div className='flex flex-col w-full gap-2'>
            <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <input type="text" name="email" style={{
                    backgroundColor: "#F9F9F9"
                  }} className='px-2 py-3 rounded-md w-full' placeholder='Masukan Email' onChange={(e)=>setState({
                    ...state,
                    email: e.target.value
                  })}/>
            </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <input type="text" style={{
                  backgroundColor: "#F9F9F9"
                }} className='px-2 py-3 rounded-md w-full' name="password" placeholder='Masukan Password' onChange={(e)=>setState({
                  ...state,
                  password: e.target.value
                })}/>
              </div>
              <button type="button" className='font-[600] text-base/[14px] text-white rounded-md' style={{
                backgroundColor:'#473BF5',
                padding:'12px 16px'
              }} onClick={Submit}>Register</button>
          </div>
              <div className='flex flex-row justify-center items-center gap-2'>
                <span className='text-center' style={{
                  color: '#787878'
                }}>sudah punya akun?</span>
                <span onClick={()=> navigate(`/login`)} className='text-center' style={{
                  color: '#473BF5'
                }}>Masuk disini</span>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register