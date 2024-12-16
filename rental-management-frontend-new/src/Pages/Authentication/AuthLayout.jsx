/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import bgrentease from '../../Static/Images/Rentease.png'
import auth_bg from '../../Static/Images/auth-bg.svg'
import logo from '../../Static/Images/logo-white.svg'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='flex w-full h-screen'>
      <div className='flex flex-col w-full mobile:w-1/2 bg-color-white justify-center items-center'>
        <div className='flex-1 flex items-center p-5'>
          <Outlet />
        </div>
        <div className='text-center text-secondary text-sm p-4'>
          Copyright © 2023 Rental Property Management. All rights reserved. <a href='https://metrictreelabs.com/' target='_blank'>Powered by Metric Tree Labs</a>
        </div>
      </div>

      <div
        className='hidden flex-col h-screen w-1/2 justify-center items-center mobile:flex'
        style={{ backgroundImage: `url(${auth_bg})` }}
      >
        <img src={logo} alt='' />
        <img className='flex w-1/2' src={bgrentease} alt='' />
        <h1 className='font-bold  text-xl text-center mb-7 text-color-white'>
          Fast, Efficient and Productive
        </h1>
        <div className='text-color-white text-center'>
          All-in-one rental management app designed to streamline and simplify every<br />
          aspect of your rental property business. RentEase. is your trusted partner in<br />
          ensuring hassle-free rental management.
        </div>
      </div>
    </div>

  )
}

export { AuthLayout }
