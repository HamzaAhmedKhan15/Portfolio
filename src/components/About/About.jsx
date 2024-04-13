import React from "react";
import { MdOutlineWeb } from "react-icons/md";
import { FiCodesandbox } from "react-icons/fi";
import { GiMaterialsScience } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";
import { Zoom } from 'react-awesome-reveal';
import "../../assets/css/mycss.css"


const Aboutme = () => {
  return (
    <Container id="service">
      <Slide direction="down">
      <Zoom>
      <CenteredContainer>
      <h1>About <span className="green">Me</span></h1><br />
      <p className="centered-text" style={{lineHeight: '2', paddingRight:"30px", paddingLeft:"30px", marginTop:"10px"}}>I'm An aspiring MERN Stack Developer with a passion for building reliable and scalable web applications. I've always been captivated by the digital realm and its profound influence on our daily lives. My
strong collaboration and multitasking skills make me a valuable team member. As a MERN developer, I am
skilled in troubleshooting and debugging, ensuring smooth development processes. I bring a solid
understanding of MongoDB, Express, Node.js, ReactJS and NextJS to contribute effectively to any
development team, aiming to drive innovation and success.
</p>
    </CenteredContainer>
        </Zoom>
      </Slide>
     
    </Container>
  );
};

export default Aboutme;

const Container = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  @media (max-width: 840px) {
    width: 90%;
  }

  h1 {
    padding-top: 1rem;
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 4rem;
  gap: 1rem;
`;
