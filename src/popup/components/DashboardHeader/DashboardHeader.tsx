import React from 'react'
import { IDashboardHeader } from './DashboardHeader.interface'
import CloseIcon from '../icons/CloseIcon'

const DashboardHeader: React.FC<IDashboardHeader> = () => {
  return (
    <>
      <div className='flex w-full h-20 flex-row px-3 py-1 justify-between items-center' style={{
        backgroundColor : '#473BF5'
      }}>
        <div className='flex flex-1 items-center'>
          <img src="logo.png" alt="digimoon_logo" style={{
            width: '100px',
            height: '30px'
          }} />
        </div>
        <div>
            <CloseIcon color='#FFFFFF'/>
        </div>
      </div>
    </>
  )
}

export default DashboardHeader