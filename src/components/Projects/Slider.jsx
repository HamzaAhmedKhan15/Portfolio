import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Project from "./Project";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";

let data = [
  {
    img: `${process.env.PUBLIC_URL}/bwcPic.png`,
    title: "BWC Admin Portal",
    disc:
      "Admin portal and CMS for the Begin With Children (BWC) parenting website — built with React.js, Redux Toolkit, Ant Design, and Tailwind CSS. Features nested routing for multi-level content categories, dynamic route-based category management, and a responsive, user-friendly interface.",
    sourceCode: "https://github.com/HamzaAhmedKhan15/BWC-Admin-Portal",
  },
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
  className: "center project-slider",
  centerMode: true,
  centerPadding: "20px",
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
        centerPadding: "14px",
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

function wheelDelta(e) {
  let mult = 1;
  if (e.deltaMode === 1) mult = 16;
  if (e.deltaMode === 2) mult = 120;
  return {
    x: e.deltaX * mult,
    y: e.deltaY * mult,
  };
}

const SliderComp = () => {
  const sliderRef = useRef(null);
  const sliderAreaRef = useRef(null);
  const wheelAcc = useRef(0);

  useEffect(() => {
    const root = sliderAreaRef.current;
    if (!root) return undefined;

    const threshold = 72;

    const onWheel = (e) => {
      const { x: dx, y: dy } = wheelDelta(e);
      const horizontalDominant =
        Math.abs(dx) > 1.5 && Math.abs(dx) >= Math.abs(dy) * 0.75;
      const shiftAsHorizontal = e.shiftKey && Math.abs(dy) > Math.abs(dx);

      if (!horizontalDominant && !shiftAsHorizontal) return;

      const delta = shiftAsHorizontal ? dy : dx;
      if (Math.abs(delta) < 0.25) return;

      e.preventDefault();
      e.stopPropagation();

      wheelAcc.current += delta;
      while (wheelAcc.current >= threshold) {
        wheelAcc.current -= threshold;
        sliderRef.current?.slickNext();
      }
      while (wheelAcc.current <= -threshold) {
        wheelAcc.current += threshold;
        sliderRef.current?.slickPrev();
      }
    };

    root.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () =>
      root.removeEventListener("wheel", onWheel, { capture: true });
  }, []);

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
      <Container ref={sliderAreaRef}>
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
  padding: 0 clamp(0.35rem, 2vw, 1.25rem);
  margin-top: 0.25rem;
`;

const Container = styled.div`
  position: relative;
  max-width: 1480px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 3vw, 1.85rem);

  .project-slider .slick-list {
    padding: 1.75rem 0 2.25rem;
  }

  @media (max-width: 640px) {
    padding: 0 1.25rem;
  }
`;

const Buttons = styled.div`
  button {
    width: 2.65rem;
    height: 2.65rem;
    background: rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    cursor: pointer;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.18);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
    transition: background 0.22s ease, border-color 0.22s ease, color 0.22s ease,
      transform 0.22s ease;

    &:hover {
      background: rgba(46, 70, 161, 0.55);
      border-color: rgba(255, 255, 255, 0.28);
      color: #fff;
      transform: translateY(-50%) scale(1.05);
    }

    &:active {
      transform: translateY(-50%) scale(0.97);
    }
  }

  .next {
    right: clamp(0.1rem, 1vw, 0.5rem);
  }

  .back {
    left: clamp(0.1rem, 1vw, 0.5rem);
  }

  @media (max-width: 640px) {
    button {
      width: 2.35rem;
      height: 2.35rem;
      font-size: 1.2rem;
    }

    .next {
      right: 0;
    }

    .back {
      left: 0;
    }
  }
`;
