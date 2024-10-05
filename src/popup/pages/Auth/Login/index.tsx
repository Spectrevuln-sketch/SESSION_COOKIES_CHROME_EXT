import React from 'react'
import { useLogin } from './hooks/useLogin'
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';

const Login = () => {
  const navigate = useNavigate();
  const {state, setState, Submit} = useLogin()
  return (
    <>
    {/* Back Nav */}
    <Header title="Shareing Cookies" />
    {/* End Back Nav */}
    <div className='flex flex-col full-bg'>
      <div className='flex flex-col flex-1 px-3'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex flex-col justify-center items-center'>
            <p style={{
              fontWeight: 600,
              fontSize: '20px'
            }} >Welcome to Digimoon</p>
            <span className='text-sm/[14px] text-center' style={{
              color:'#787878'
            }}>Akses fitur dan layanan terbaik kami dengan masuk ke akun Anda.</span>
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
            }} onClick={Submit}>Login</button>
        </div>
            <div className='flex flex-row justify-center items-center gap-2'>
              <span className='text-center' style={{
                color: '#787878'
              }}>belum punya akun?</span>
              <span onClick={()=> navigate(`/register`)} className='text-center' style={{
                color: '#473BF5'
              }}>Daftar disini</span>
            </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default Login