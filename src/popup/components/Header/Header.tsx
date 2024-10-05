import React from 'react'
import { HeaderStickyType } from './Header.interface'
import CloseIcon from '../icons/CloseIcon'

const Header: React.FC<HeaderStickyType> = ({ title }) => {
  return (
    <>
      <div className='flex w-full h-20 flex-col p-2 justify-start items-end'>
          <CloseIcon/>
      </div>
    </>
  )
}

export default Header