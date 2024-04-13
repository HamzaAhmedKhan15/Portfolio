import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import Project from './Project';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';

let data = [
    {
        img :require("../../assets/images/p1.PNG"),
        title:'Scholarship Portal',
        disc : "An integrated MERN-Stack web platform for scholarships for students of NEDUET with a dedicated Admin panel",
        sourceCode:"https://github.com/Team-Secant/ScholarshipPortal/tree/shirazdev"
    },
    {
      img :require("../../assets/images/p4.PNG"),
      title:'RCAI Website Replica',
        disc : "An integrated full-stack website designed for AIFEST4.0 WebDev Competition",
        sourceCode:"https://github.com/HamzaAhmedKhan15/AI-FEST-23-WebDevCompetition-TeamWebSlingers"
    },
    {
      img :require("../../assets/images/NETFLIX-homepage-1140x570.png"),
      title:'Netflix Replica',
        disc : "Netflix-inspired replica with identical frontend design, featuring API-driven trailer previews for enticing experience",
        sourceCode:"https://github.com/HamzaAhmedKhan15/Netflix-Cloned"
    },
  
    {
      img :require("../../assets/images/p3.jfif"),
      title:'Hangman Game',
        disc : "JavaScript-powered Hangman game – classic word-guessing game with a sleek web design",
        sourceCode:"https://github.com/HamzaAhmedKhan15/Hangman-Game"
    },
    {
      img :require("../../assets/images/p5.jpg"),
      title:'Desktop AI Voice Assistant',
        disc : "A voice assistant using Python's speech recognition module capable of opening specific apps with a voice command",
        sourceCode:"https://github.com/HamzaAhmedKhan15/Desktop-AI-Voice-Assistant"
    },
    {
      img :require("../../assets/images/p6.jpg"),
      title:'Clock V: An Encryption Scheme',
        disc : "Python's encryption/decryption scheme desiged using custom algorithm with user-input keys for text transformation",
        sourceCode:"https://github.com/HamzaAhmedKhan15/Clock-V_Encryption_Scheme--ENIGMA"
    },
    {
      img :require("../../assets/images/p7.png"),
      title:'Hospital Management System',
        disc : "Scalable MERN stack hospital system with dual frontends, authentication & authorization using multiple Web Tokens.",
        sourceCode:"https://github.com/HamzaAhmedKhan15/Hospital-Management-System-MERN-"
    },
];

var settings = {
    className: "center",
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows : false,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode : false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode : false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode : false
        }
      }
    ]
  };

  const SliderComp = () => {
    const sliderRef = useRef(null);
    const [hoveredProject, setHoveredProject] = useState(null);
  
    const handleProjectClick = (index) => {
      sliderRef.current.slickGoTo(index);
    };
  
    const handleProjectHover = (index) => {
      setHoveredProject(index);
    };

    let sliderProject = "";
    sliderProject = data.map((item, i) => (
      <Project
        item={item}
        key={i}
        index={i}
        onSelect={handleProjectClick}
        onHover={handleProjectHover}
      />
    ));
  
    return (
      <Container>
      <Slider ref={sliderRef} {...settings}>
        {sliderProject}
      </Slider>
      <Buttons>
        <button onClick={() => sliderRef.current.slickPrev()} className="back">
          <IoIosArrowBack />
        </button>
        <button onClick={() => sliderRef.current.slickNext()} className="next">
          <IoIosArrowForward />
        </button>
      </Buttons>
    </Container>
    );
  };
  
  export default SliderComp;
  
  const Container = styled.div`
    position: relative;
  `;
  
  const Buttons = styled.div`
    button {
      width: 2rem;
      height: 2rem;
      background-color: rgba(255, 255, 255, 0.100);
      cursor: pointer;
      color: #ffc525;
      border: none;
      position: absolute;
      top: 45%;
      right: -1rem;
    }
  
    .back {
      left: -1rem;
    }
  `;