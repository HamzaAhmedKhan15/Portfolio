import React, { useRef } from "react";
import Slider from "react-slick";
import Project from "./Project";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";

let data = [
  {
    img: require("../../assets/images/p1.PNG"),
    title: "Scholarship Portal",
    disc:
      "An integrated MERN-Stack web platform for scholarships for students of NEDUET with a dedicated Admin panel",
    sourceCode: "https://github.com/Team-Secant/ScholarshipPortal/tree/shirazdev",
  },
  {
    img: require("../../assets/images/p8.png"),
    title: "WebSocket Chatrooms",
    disc:
      "A scalable chatting platform where multiple users can join ChatRoom(s) and send messages in real-time",
    sourceCode: "https://github.com/HamzaAhmedKhan15/Websocket-basics",
  },
  {
    img: require("../../assets/images/p4.PNG"),
    title: "RCAI Website Replica",
    disc:
      "An integrated full-stack website designed for AIFEST4.0 WebDev Competition",
    sourceCode:
      "https://github.com/HamzaAhmedKhan15/AI-FEST-23-WebDevCompetition-TeamWebSlingers",
  },
  // {
  //   img: require("../../assets/images/NETFLIX-homepage-1140x570.png"),
  //   title: "Netflix Replica",
  //   disc:
  //     "Netflix-inspired replica with identical frontend design, featuring API-driven trailer previews for enticing experience",
  //   sourceCode: "https://github.com/HamzaAhmedKhan15/Netflix-Cloned",
  // },
  // {
  //   img: require("../../assets/images/p3.jfif"),
  //   title: "Hangman Game",
  //   disc:
  //     "JavaScript-powered Hangman game – classic word-guessing game with a sleek web design",
  //   sourceCode: "https://github.com/HamzaAhmedKhan15/Hangman-Game",
  // },
  {
    img: require("../../assets/images/p5.jpg"),
    title: "Desktop AI Voice Assistant",
    disc:
      "A voice assistant using Python's speech recognition module capable of opening specific apps with a voice command",
    sourceCode: "https://github.com/HamzaAhmedKhan15/Desktop-AI-Voice-Assistant",
  },
  {
    img: require("../../assets/images/p6.jpg"),
    title: "Clock V: An Encryption Scheme",
    disc:
      "Python encryption/decryption scheme designed using a custom algorithm with user-supplied keys for text transformation",
    sourceCode:
      "https://github.com/HamzaAhmedKhan15/Clock-V_Encryption_Scheme--ENIGMA",
  },
  {
    img: require("../../assets/images/p7.png"),
    title: "Hospital Management System",
    disc:
      "Scalable MERN stack hospital system with dual frontends, authentication & authorization using multiple Web Tokens.",
    sourceCode:
      "https://github.com/HamzaAhmedKhan15/Hospital-Management-System-MERN-",
  },
];

const settings = {
  className: "center",
  centerMode: true,
  centerPadding: "48px",
  dots: false,
  infinite: true,
  speed: 650,
  cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  swipe: true,
  swipeToSlide: true,
  touchMove: true,
  touchThreshold: 4,
  draggable: true,
  edgeFriction: 0.18,
  waitForAnimate: true,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "36px",
        infinite: true,
        dots: false,
        swipeToSlide: true,
        speed: 650,
        cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
        infinite: true,
        dots: false,
        swipeToSlide: true,
        speed: 600,
        cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: false,
        infinite: true,
        dots: false,
        swipeToSlide: true,
        speed: 550,
        cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  ],
};

const SliderComp = () => {
  const sliderRef = useRef(null);

  const handleProjectClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const handleProjectHover = () => {};

  const sliderProject = data.map((item, i) => (
    <Project
      item={item}
      key={`${item.title}-${i}`}
      index={i}
      onSelect={handleProjectClick}
      onHover={handleProjectHover}
    />
  ));

  return (
    <Outer>
      <Container>
        <Slider ref={sliderRef} {...settings}>
          {sliderProject}
        </Slider>
        <Buttons>
          <button
            type="button"
            onClick={() => sliderRef.current && sliderRef.current.slickPrev()}
            className="back"
            aria-label="Previous projects"
          >
            <IoIosArrowBack />
          </button>
          <button
            type="button"
            onClick={() => sliderRef.current && sliderRef.current.slickNext()}
            className="next"
            aria-label="Next projects"
          >
            <IoIosArrowForward />
          </button>
        </Buttons>
      </Container>
    </Outer>
  );
};

export default SliderComp;

const Outer = styled.div`
  width: 100%;
  padding: 0 clamp(0.25rem, 2vw, 1.25rem);
`;

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const Buttons = styled.div`
  button {
    width: 2.25rem;
    height: 2.25rem;
    background-color: rgba(255, 255, 255, 0.12);
    cursor: pointer;
    color: #2e46a1;
    border: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.22);
    }
  }

  .next {
    right: clamp(-0.25rem, -1vw, -1rem);
  }

  .back {
    left: clamp(-0.25rem, -1vw, -1rem);
  }

  @media (max-width: 640px) {
    .next {
      right: 0.15rem;
    }
    .back {
      left: 0.15rem;
    }
  }
`;
