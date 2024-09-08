import React from 'react'
import { HeaderStickyType } from './Header.interface'

const Header: React.FC<HeaderStickyType> = ({ title }) => {
  return (
    <div className='flex flex-1 flex-col gap-2'>
      <div className='flex flex-1 flex-row py-2 bg-slate-300 justify-center items-center'>
        <img src="talentlytica.png" className='w-6' />
      </div>
      <div className='flex flex-1 flex-row items-center justify-center gap-2'>
        <p className='flex'>{title}</p>
        <img src="alarm-clock.svg" className='w-5' />
      </div>
    </div>
  )
}

export default Header