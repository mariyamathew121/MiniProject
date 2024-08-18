import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar'
import Hero from '../Components/Hero/Hero'
import Programs from '../Components/Programs/Programs'
import Title from '../Components/Title/Title'
import About from '../Components/About/About'
import Campus from '../Components/Campus/Campus'
import Contact from '../Components/Contact/Contact'
import Footer from '../Components/Footer/Footer'
export const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="container">
      <Title subTitle='Our PROGRAM' title='What We Offer' />
      <Programs/>
      <About/>
      <Title subTitle='Contact Us' title='Get in Touch' />
      <Contact/>
      <Footer/>
      </div>
    </div>
  )
}

export default Home;