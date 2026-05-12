import React from "react";
import { MdOutlineWeb } from "react-icons/md";
import { FiCodesandbox } from "react-icons/fi";
import { CgWebsite } from "react-icons/cg";
import styled from "styled-components";
import Card from "./Card";
import { Slide } from "react-awesome-reveal";
import { Zoom } from "react-awesome-reveal";
import "../../assets/css/mycss.css";

const Services = () => {
  return (
    <Container id="service">
      <Slide direction="down">
        <Zoom>
          <CenteredContainer>
            <h1>
              My <span className="green">Skills</span>
            </h1>
            <Intro>
              A concise snapshot of the technologies and practices I use to ship
              reliable interfaces on live products—from marketing sites to complex admin
              portals—aligned with my professional experience and resume.
            </Intro>
          </CenteredContainer>
        </Zoom>
      </Slide>
      <Cards>
        <Zoom className="info">
          <Card
            Icon={MdOutlineWeb}
            title={"Frontend development"}
            disc={`Markup & styling: HTML5, CSS3, JavaScript (ES6+), Bootstrap, Tailwind CSS.`}
            disc2={`Libraries & frameworks: React.js, Next.js, Context API, Redux Toolkit, Redux Thunk.`}
            disc3={`UI systems: Material UI, Ant Design, responsive layouts, accessible components.`}
            disc4={`Delivery: production-quality UI, component reuse, performance-minded updates.`}
          />
        </Zoom>

        <Zoom className="info">
          <Card
            Icon={FiCodesandbox}
            title={"APIs, data & tooling"}
            disc={`RESTful APIs, Fetch API, JSON payloads, and close collaboration with backend teams.`}
            disc2={`Persistence: MongoDB, MySQL, IndexedDB for offline-first and client-side storage.`}
            disc3={`Platforms & utilities: Node.js, Express.js, AWS (as used on projects), Git version control.`}
            disc4={`Workflows: debugging, code review–friendly structure, documentation-friendly handoffs.`}
          />
        </Zoom>

        <Zoom className="info">
          <Card
            Icon={CgWebsite}
            title={"Product-focused engineering"}
            disc={`Finite state machine (FSM) architecture: explicit states and transitions for predictable UI flows, clearer async handling, and easier reasoning about complex screens.`}
            disc2={`Offline-first experiences: IndexedDB patterns, reload and re-sync considerations.`}
            disc3={`Integrations: Twilio for programmable voice and calling workflows; payment gateways; PDF generation; and transactional email where required.`}
            disc4={`Stakeholder work: scoping with clients, iterative feature delivery on live systems.`}
          />
        </Zoom>
      </Cards>
    </Container>
  );
};

export default Services;

const Container = styled.div`
  width: min(90%, 1280px);
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3rem) clamp(0.75rem, 3vw, 1rem);
  @media (max-width: 840px) {
    width: min(92%, 1280px);
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

const Intro = styled.p`
  text-align: center;
  max-width: 44rem;
  margin-top: 0.75rem;
  line-height: 1.65;
  font-size: clamp(0.88rem, 1.5vw, 0.98rem);
  color: rgba(255, 255, 255, 0.9);
  padding: 0 clamp(0.5rem, 2vw, 1rem);
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  margin-top: clamp(2rem, 4vw, 3rem);
  gap: clamp(0.75rem, 2vw, 1.25rem);
`;
