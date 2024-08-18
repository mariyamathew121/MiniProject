import React from 'react'
import './About.css'
import about_img from '../../assets/about1.jpg'
import play_icon from '../../assets/play-icon.png'
const About = () => {
  return (
    <div className='about'>
        <div className="about-left">
            <img src={about_img} alt="" className='about-img'/>
            <img src={play_icon} alt="" className='play-icon'/>
        </div>
        <div className="about-right">
            <h3>ABOUT OUR TECHNOLOGY</h3>
            <h2>Empowering Healthcare, One Record at a Time</h2>
            <p>Our cutting-edge technology is designed to empower medical professionals with the knowledge, skills, and experiences needed to excel in the dynamic field of medicine</p>
            <p>Our EMR system is designed with the needs of modern healthcare in mind, offering robust features such as seamless data integration, intuitive user interfaces, and advanced security measures. Whether you're a small clinic or a large hospital network, our customizable EMR solutions adapt to your unique requirements, ensuring a tailored approach to patient care and practice management.</p>
            <p>Join us in shaping the future of healthcare delivery with our innovative EMR solutions. Together, let's transform healthcare for the better.</p>
        </div>
    </div>
  )
}

export default About