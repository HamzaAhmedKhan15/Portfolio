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
        <Zoom className="info">
          <Card
          Icon={MdOutlineWeb}
            title={"Web App Development"}
            disc2={`Frontend Development ( ReactJs, NextJs )`}
            disc3={`Backend Development ( Node.js, Express.js )`}
            disc4={`Database Managment ( MongoDb, MySQL, AWS )`}
          />
        </Zoom>
  
        <Zoom className="info">
          <Card
            Icon={FiCodesandbox}
            title={"API Integration"}
            disc={`RESTful APIs with Redux Toolkit for efficient state management.`}
            disc3={`Redux Thunk for handling asynchronous API calls and data flow`}
            disc4={``}  
          />
        </Zoom>

        <Zoom className="info">
          <Card
            Icon={CgWebsite}
            title={"Maintenance & Support"}
            // disc={`Providing Ongoing Updates`}
            disc2={`Bug Fixing and Debugging`}
            disc3={`Technical Support`}
            disc4={`Code Refactoring, Optimization and Documentation`}
          />
        </Zoom>
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
