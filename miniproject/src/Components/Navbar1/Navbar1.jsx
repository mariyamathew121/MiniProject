import React, { useEffect, useState } from 'react'
import './Navbar1.css'
import logo from '../../assets/logo1.png'
import { useNavigate } from 'react-router-dom';
const Navbar1 = () => {
  const naviagte = useNavigate()
  const [sticky,setSticky] =useState(false);
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY>50 ? setSticky(true) : setSticky(false)
    })
  },[]);
  return (
    <nav className={'start-nav' }>
        <img src={logo} alt = "" className='logo'/>
        <ul>
            <li><button onClick={()=>naviagte("/")} className='btn'>Home</button></li>
        </ul>
    </nav>
  )
}

export default Navbar1