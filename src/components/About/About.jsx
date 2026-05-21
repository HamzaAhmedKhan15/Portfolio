/** @format */

import React from "react";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";
import { Zoom } from "react-awesome-reveal";
import "../../assets/css/mycss.css";

const Aboutme = () => {
  return (
    <Container id="about">
      <Slide direction="down">
        <Zoom>
          <CenteredContainer>
            <h1>
              About <span className="green">Me</span>
            </h1>
            <Bio>
              <p>
                I am Hamza Ahmed Khan, a Frontend Developer based in Karachi, Pakistan, focused on building scalable,
                responsive, and user-centered web applications with React.js and Next.js. I enjoy translating complex
                requirements into clear interfaces—whether that is multi-step admin workflows, nested routing, or
                data-heavy dashboards—while keeping performance and maintainability in mind.
              </p>
              <p>
                I hold a Bachelors of Computer Science and Information Technology Degree from NED University of
                Engineering and Technology (2020–2024, graduated July 2024). Professionally, I am a Frontend Developer
                at Quanrio LLP, where I contribute to live production systems: customized rich-text publishing, advanced
                state with Redux Toolkit, IndexedDB-based offline access, and payment gateway integration, working
                closely with clients to refine scope and ship features on schedule. Previously, I completed a Frontend
                Developer internship at Transviti Pvt. Ltd., enhancing TalentVare with React and Material UI,
                integrating APIs with Fetch, and stabilizing application state with Redux.
              </p>
              <p>
                Across projects—from scholarship portals to large SaaS-style modules—I emphasize collaboration with
                backend engineers, disciplined debugging, and polished UI delivery on desktop, tablet, and mobile.
              </p>
            </Bio>
          </CenteredContainer>
        </Zoom>
      </Slide>
    </Container>
  );
};

export default Aboutme;

const Container = styled.div`
  width: min(94%, 1280px);
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3rem) clamp(0.75rem, 3vw, 1.25rem);
  box-sizing: border-box;
  @media (max-width: 840px) {
    width: min(96%, 1280px);
  }
  h1 {
    padding-top: 0.5rem;
    font-size: clamp(1.35rem, 2.5vw, 1.9rem);
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Bio = styled.div`
  max-width: 52rem;
  margin-top: clamp(0.75rem, 2vw, 1.25rem);
  text-align: center;
  line-height: 1.75;
  font-size: clamp(0.9rem, 1.6vw, 1rem);

  p {
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.92);
    padding-left: clamp(0.25rem, 2vw, 1.5rem);
    padding-right: clamp(0.25rem, 2vw, 1.5rem);
  }

  p:last-child {
    margin-bottom: 0;
  }
`;
