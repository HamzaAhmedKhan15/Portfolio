import React from "react";
import { MdOutlineWeb } from "react-icons/md";
import { FiCodesandbox } from "react-icons/fi";
import { GiMaterialsScience } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import styled from "styled-components";
import Card from "./Card";
import { Slide } from "react-awesome-reveal";
import { Zoom } from 'react-awesome-reveal';
import "../../assets/css/mycss.css"


const Services = () => {
  return (
    <Container id="service">
      <Slide direction="down">
      <Zoom>
      <CenteredContainer>
      <h1>My <span className="green">Skills</span></h1><br />
      <p className="centered-text">using My wide range of skills to deliver Meaningful Results and Innovative Solutions</p>
    </CenteredContainer>
        </Zoom>
      </Slide>
      <Cards>
        <Slide direction="left" className="info">
          <Card
          Icon={MdOutlineWeb}
            title={"Web App Development"}
            disc2={`Frontend Development ( ReactJs, NextJs )`}
            disc3={`Backend Development ( Node.js, Express.js )`}
            disc4={`Database Management ( MongoDB, PostgreSQL )`}
          />
        </Slide>
        <Slide direction="right" className="info">
          <Card
            Icon={GiMaterialsScience}
            title={"Data Science"}
            disc={`Data Analysis and Visualization`}
            disc2={`Data Cleaning and Preprocessing`}
            disc3={`Machine Learning ( Scikit-Learn, Pytorch )`}
            disc4={`Data Warehousing and ETL`}
          />
        </Slide>
        <Slide direction="up" className="info">
          <Card
            Icon={FiCodesandbox}
            title={"UI/UX Designing"}
            disc={`Wireframing and Prototyping ( Visily.ai )`}
            disc2={`WebApp Designs`}
            disc3={`Interactive UI designs`}
            disc4={`User Research and Personas`}  
          />
        </Slide>
      </Cards>
    </Container>
  );
};

export default Services;

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
