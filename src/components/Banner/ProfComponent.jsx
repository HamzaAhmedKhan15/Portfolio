import React from "react";
import Typed from "react-typed";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";
import facebook from "../../assets/images/facebook.png";
import github from "../../assets/images/github.png";
import linkedin from "../../assets/images/linkedin.png";
import profile from "../../assets/images/mee.png";
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
              "MERN Stack Developer.",
              "Python Developer.",
              "A.I. Enthusiast.",
              "CSIT Undergrad.",
            ]}
            typeSpeed={50}
            backSpeed={20}
            loop
          />
          <br />
          <div className="button-container">
            <button className="talk">
              <a
                href="http://wa.me/+923008263067"
                target="_blank"
                rel="noopener noreferrer"
              >
                Let's talk
              </a>
            </button>
          </div>
          <Social>
            <h4>Connect me</h4>
            <div className="social-icons">
              <span>
                <a
                  href="https://www.facebook.com/profile.php?id=100007366266108"
                  target="_blank"
                >
                  <img src={facebook} className="iconi" alt="" />
                </a>
              </span>
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
          <img src={profile} alt="profile" className="l-10" />
      </Profile>
    </Container>
  );
};

export default ProfComponent;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding-top: 3rem;
  width: 60%;
  max-width: 1280px;
  margin: 0 auto;
  z-index: 1;

  @media (max-width: 840px) {
    width: 75%;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Texts = styled.div`
  flex: 1; /* Take up the remaining space in the container */
  padding-right: 2rem; /* Add padding to the right to create space between text and profile */

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
    background-color: #ffc525;
    border: none;
    color: black;
    font-weight: 800;
    filter: drop-shadow(0px 10px 10px #ffd70051);

    :hover {
      filter: drop-shadow(0px 10px 10px #ffd70070);
    }
  }
`;

const Social = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;

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
      background-color: #ffc525;
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
  /* Align the content to the right */

  img {
    width: 25rem;
    height:25rem;
    filter: drop-shadow(0px 10px 10px #ffd70051);
    transition: transform 400ms ease-in-out;

    @media (max-width: 790px) {
      width: 20rem;
      height:20rem;
    }

    @media (max-width: 660px) {
      width: 20rem;
      height:20rem;
    }

    @media (max-width: 640px) {
      width: 100%;
    }
  }

  :hover img {
    transform: translateY(-10px);
  }
`;