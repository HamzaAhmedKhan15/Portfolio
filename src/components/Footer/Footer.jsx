import React from "react";
import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMailOpen } from "react-icons/hi";
import { AiFillGithub, AiFillLinkedin, AiOutlineArrowUp } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { Slide, Zoom, Fade } from "react-awesome-reveal";
import { IoLocationOutline } from "react-icons/io5";
import foot from "../../assets/images/giff.gif";
import emailLogo from "../../assets/images/gmail.png"
import "../../assets/css/mycss.css";
import "animate.css";

const Footer = () => {
  const scrollUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Container id="footer">
      <Profile>
        <Slide direction="left" delay={1}>
          <h1>
            Contact <span className="green">Me</span>
          </h1>{" "}
          <br /> <br />
        </Slide>
        <div className="links">
          <div>
            <Slide direction="left" style={{ paddingBottom: "5px" }}>
              <span>
                <HiOutlineMailOpen />
              </span>
            </Slide>
            <Slide>
              <p>
                <b>Email:</b> hamzaahmedkhan718@gmail.com
              </p>{" "}
              <br />
              <br />
            </Slide>
          </div>
          <div>
            <span>
              <FiPhoneCall />
            </span>
            <Slide direction="left" style={{ paddingBottom: "5px" }}>
              <p>
                <b>Contact:</b> 0300-8263067
              </p>
            </Slide>
          </div>
          <div>
            <span>
              <IoLocationOutline />
            </span>
            <Slide direction="left">
              <p>
                <b>Location:</b> Karachi, Pakistan
              </p>
            </Slide>
          </div>
        </div>
        <div className="profiles">
          <Slide direction="left">
            <br />
            <h1 className="green">Check my profiles</h1>
          </Slide>
          <div className="icons">
            <Zoom>
              <span>
                <a href="https://github.com/HamzaAhmedKhan15">
                  <AiFillGithub style={{ fontSize: "1.5rem" }} />
                </a>
              </span>
            </Zoom>
            <Zoom>
              <span>
                <a href="https://www.linkedin.com/in/hamza-ahmed-khan-/">
                  <AiFillLinkedin style={{ fontSize: "1.5rem" }} />
                </a>
              </span>
            </Zoom>
            <Zoom>
              <span>
                <a href="https://www.facebook.com/profile.php?id=100007366266108">
                  <BsFacebook style={{ fontSize: "1.5rem" }} />
                </a>
              </span>
            </Zoom>
            <button className="button-container2">
  <a
    href="https://mail.google.com/mail/?view=cm&to=hamzaahmedkhan718@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: 'flex', alignItems: 'center' }} // Optional, for better alignment
  >
    Send Email

    <img
      src={emailLogo}
      alt="Email Logo"
      style={{ width: '20px', height: '20px', marginLeft: '8px' }} // Adjust size and spacing as needed
    />
  </a>
</button>

          </div>
        </div>
      </Profile>
      <Form>
        <MediaQueryWrapper>
          <img src={foot} alt="" style={{ width: "65%", marginLeft:"60px", marginTop:"-40px" }} />
        </MediaQueryWrapper>
      </Form>
      <Fade>
        <div className="side-by-side">
          <ArrowUp onClick={scrollUp}>
            <AiOutlineArrowUp />
          </ArrowUp>
        </div>
      </Fade>
    </Container>
  );
};

export default Footer;

// Example of a component with media query

// Styled component for media query
const MediaQueryWrapper = styled.div`
  img {
    margin-left: 10px;
  }
  @media (max-width: 768px) {
    img {
      width: 100%; /* For example, make the image take the full width */
    }
  }
`;

const Container = styled.div`
  margin-top: 2rem;
  position: relative;
  padding: 2rem 0;
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 840px) {
    width: 90%;
  }

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 3rem;
  }
`;
const Profile = styled.div`
  flex: 1;
  .address {
    padding: 1rem 0;
    h1 {
      font-size: 1.2rem;
    }

    p {
      width: 60%;
      padding-top: 0.5rem;
      @media (max-width: 650px) {
        width: 100%;
      }
    }
  }

  .links {
    h1 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      a {
        text-decoration: none;
        color: lightgray;
        padding: 5px;
        :hover {
          color: #01be96;
        }
      }
    }
  }

  .profiles {
    h1 {
      font-size: 1.2rem;
      padding: 1rem 0;
    }

    .icons {
      display: flex;
      align-items: center;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
        border-radius: 50px;

        :hover {
          background-color: #ffc525;
        }

        a {
          margin-top: 0.2rem;
          color: #fff;
        }
      }
    }
  }
`;
const ArrowUp = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #ffc525;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  @media (max-width: 650px) {
    position: absolute;
    right: 3rem;
    top: 16rem;
  }
`;
const Form = styled.div`
  flex: 1;
  h1 {
    font-size: 1.3rem;
    padding-bottom: 0.7rem;
  }

  form {
    background-color: #191923;
    padding: 0.8rem;
    border-radius: 5px;
    .name,
    .email,
    .message {
      display: flex;
      border: 1px solid gray;
      margin-bottom: 0.5rem;
      input,
      textarea {
        width: 100%;
        border: none;
        outline: none;
        color: #fff;
        background-color: transparent;
        padding: 1rem 0.5rem;
      }
      span {
        background-color: #3e3e3e;
        width: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .messageIcon {
        align-items: flex-start;
        padding-top: 0.5rem;
      }
    }

    button {
      width: 8rem;
      height: 1.8rem;
      background-color: #ffc525;
      color: white;
      border: none;
      border-radius: 5px;
      filter: drop-shadow(0px 4px 5px #01be9551);
      cursor: pointer;
      :hover {
        filter: drop-shadow(0px 6px 9px #01be9551);
      }
    }
  }
`;
