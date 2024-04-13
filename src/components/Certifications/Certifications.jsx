import React from "react";
import { MdOutlineWeb } from "react-icons/md";
import { FiCodesandbox } from "react-icons/fi";
import { GiMaterialsScience } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import styled from "styled-components";
import { Slide, Zoom } from "react-awesome-reveal";
import "../../assets/css/mycss.css";
import Huawei from "../../assets/images/Huawei.png";
import Aic from "../../assets/images/AIClub.png";

const Certifications = () => {
  return (
    <Container id="service">
      <Slide direction="down">
      <Zoom>
      <CenteredContainer>
      <h1>Certifica<span className="green">tions</span></h1><br />
      <p className="centered-text">Certifications I've earned which stands as a reflection of my persistence and drive to excel in all my endeavors.</p>
    </CenteredContainer>
        </Zoom>
      </Slide>
      <Cards>
        <Slide direction="up" className="info">
            <img src={Huawei} alt="" />
        </Slide>

        <Slide direction="up" className="info">
            <img src={Aic} alt="" />
        </Slide>
      </Cards>
    </Container>
  );
};

export default Certifications;

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

  img{
    width: 95%;
    margin-left: 10px;
  }
  
`;
