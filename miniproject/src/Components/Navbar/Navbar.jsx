import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo1.png'
import { Link } from "react-scroll";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const naviagte = useNavigate()
  const [sticky,setSticky] =useState(false);
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY>50 ? setSticky(true) : setSticky(false)
    })
  },[]);
  return (
    <nav className={`${sticky? 'dark-nav' :''}`}>
        <img src={logo} alt = "" className='logo'/>
        <ul>
            <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
            <li><Link to='program' smooth={true} offset={-260} duration={500}>Program</Link></li>
            <li><Link to='about' smooth={true} offset={-150} duration={500}>About us</Link></li>
            <li><Link  to='contact' smooth={true} offset={-260} duration={500} >Contact us</Link></li>
            <li><button onClick={()=>naviagte("/login")} className='btn'>Login</button></li>
        </ul>
    </nav>
  )
}

export default Navbar