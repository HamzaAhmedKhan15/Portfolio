import React from "react";
import Typed from "react-typed";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";
// import facebook from "../../assets/images/facebook.png";
import github from "../../assets/images/github.png";
import linkedin from "../../assets/images/linkedin.png";
import whatsapp from "../../assets/images/whatsapp.png";
import '../../assets/css/mycss.css';


const ProfComponent = () => {
  return (
    <Container id="home">
      <Texts>
        <Slide direction="left">
          <h2>
            Hello <span className="green">Welcome to my Portfolio!</span>
          </h2>
          <h6 className="green2">Hamza Ahmed Khan</h6>
          <Typed
            className="stack"
            strings={[
              "Frontend Developer.",
              "A.I. Enthusiast",
              // "Junior Frontend Developer @ Quanrio.",
              // "React.js · Next.js · Redux Toolkit.",
              "BCS (CSIT), NED University — Class of 2024.",
            ]}
            typeSpeed={50}
            backSpeed={20}
            loop
          />
          <br />
          <div className="button-container">
          <button className="talk" style={{fontWeight:"bolder"}}>
  <a
    href="http://wa.me/+923008263067"
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: 'flex', alignItems: 'center' }} // Optional, for better alignment
  >
    Let's talk 

    <img
      src={whatsapp}
      alt="WhatsApp Logo"
      style={{ width: '17px', height: '17px', marginLeft: '8px' }} // Adjust size and spacing as needed
    />
  </a>
</button>

          </div>
          <Social>
            <h4>Connect me</h4>
            <div className="social-icons">
              {/* Facebook
              <span>
                <a
                  href="https://www.facebook.com/profile.php?id=100007366266108"
                  target="_blank"
                >
                  <img src={facebook} className="iconi" alt="" />
                </a>
              </span>
              */}
              <span>
                <a href="https://github.com/HamzaAhmedKhan15" target="_blank">
                  <img src={github} className="iconi" alt="" />
                </a>
              </span>
              <span>
                <a href="https://www.linkedin.com/in/hamza-ahmed-khan-/" target="_blank">
                  <img src={linkedin} className="iconi" alt="" />
                </a>
              </span>
            </div>
          </Social>
        </Slide>
      </Texts>
      <Profile>
          <img
            src={`${process.env.PUBLIC_URL}/MyNewPicture.jpg`}
            alt="profile"
            className="l-10"
          />
      </Profile>
    </Container>
  );
};

export default ProfComponent;

const Container = styled.div`
  display: flex;
  gap: clamp(1rem, 3vw, 2rem);
  padding: clamp(2rem, 4vw, 3rem) clamp(0.75rem, 3vw, 1rem) 0;
  width: min(92%, 1280px);
  max-width: 1280px;
  margin: 0 auto;
  z-index: 1;

  @media (max-width: 1024px) {
    width: min(90%, 1280px);
  }

  @media (max-width: 840px) {
    width: min(92%, 1280px);
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Texts = styled.div`
  flex: 1;
  padding-right: clamp(0.5rem, 3vw, 2rem);

  @media (max-width: 640px) {
    padding-right: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    font-size: clamp(1.1rem, 2.8vw, 1.5rem);
  }

  h4 {
    padding: 1rem 0;
    font-weight: 500;
  }

  h1 {
    font-size: 2rem;
    font-family: "Secular One", sans-serif;
    letter-spacing: 2px;
  }

  h3 {
    font-weight: 500;
    font-size: 1.2rem;
    padding-bottom: 1.2rem;
    text-transform: capitalize;
  }

  p {
    font-weight: 300;
  }

  button {
    padding: 0.7rem 2rem;
    margin-top: 3rem;
    cursor: pointer;
    background-color: #2e46a1;
    border: none;
    color: #fff;
    font-weight: 800;
    filter: drop-shadow(0px 10px 10px #2e46a133);
      :hover {
        filter: drop-shadow(0px 10px 10px #2e46a146);
      }
  }
`;

const Social = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    justify-content: center;
  }

  p {
    font-size: 0.9rem;

    @media (max-width: 690px) {
      font-size: 0.7rem;
    }
  }

  .social-icons {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      width: 2.3rem;
      height: 2rem;
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      background-color: #2e46a1;
      position: relative;
      transition: transform 400ms ease-in-out;

      :hover {
        transform: rotate(360deg);
      }
    }

    a {
      color: #fff;
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;

  @media (max-width: 640px) {
    justify-content: center;
    width: 100%;
  }

  img {
    width: clamp(14rem, 32vw, 25rem);
    height: clamp(14rem, 32vw, 25rem);
    border-radius: 50%;
    object-fit: cover;
    filter: drop-shadow(0px 10px 10px #2e46a133);
    transition: transform 400ms ease-in-out;

    @media (max-width: 790px) {
      width: clamp(13rem, 38vw, 20rem);
      height: clamp(13rem, 38vw, 20rem);
    }

    @media (max-width: 640px) {
      width: min(18rem, 88vw);
      height: min(18rem, 88vw);
    }
  }

  :hover img {
    transform: translateY(-10px);
  }
`;