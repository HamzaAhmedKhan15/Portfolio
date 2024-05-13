import styled from "styled-components";
import Header from "./components/Banner/Header";
import ProfComponent from "./components/Banner/ProfComponent";
import Footer from "./components/Footer/Footer";
import Projects from "./components/Projects/Projects";
import Services from "./components/Service/Services";
import Certifications from "./components/Certifications/Certifications";
import Aboutme from "./components/About/About";

function App() {
  return (
    // <LightColor>
    <Container>
      <Banner>
        <Header />
        <LightColor>
        <ProfComponent />
        </LightColor>
      </Banner>
      <Aboutme />
      <Services />
      <Certifications />
      <LightColor>
        <Projects />
      </LightColor>
      <br />
      <br />
      <br />
        <Footer />
    </Container>
    // </LightColor>
  );
}

export default App;

const Container = styled.div``;
const Banner = styled.div`
background: url('../../assets/images/deep blue.jpg');
  height: 100vh;
  @media (max-width: 640px) {
    height: 100%;
    padding-bottom: 2rem;
  }
`;

const LightColor = styled.div`
background: url('../../assets/images/deep blue.jpg');
`;
