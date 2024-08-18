import React from 'react'
import './Hero.css'
import { Link } from "react-scroll";
import dark_arrow from '../../assets/dark-arrow.png'
const Hero = () => {
  return (
    <div className='hero container'>
        <div className="hero-text">
            <h1>We Ensure better health for a better world</h1>
            <p>Our cutting-edge framework is meticulously designed to empower health professionals with the knowledge, skills, and hands-on experiences necessary to navigate and excel in the ever-evolving realm of medicine</p>
            <Link to='program' smooth={true} offset={-260} duration={500} className='btn' >Explore more <img src={dark_arrow} alt="" /></Link>
        </div>
    </div>
  )
}

export default Hero