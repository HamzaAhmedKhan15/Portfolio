import React from 'react'
import styled from 'styled-components';
import SliderComp from './Slider';
import { Zoom } from 'react-awesome-reveal';

const Projects = () => {
  return (
    <Container id='project'>
        <Zoom>
            <h1>My <span className="green">Projects</span></h1>
            <p className="centered-text">Here are some of my Open-source projects, aiming to provide the best features and suitable software according to your requirements.</p>
        </Zoom>
        <Slide>
            <SliderComp/>
        </Slide>
    </Container>
  )
}

export default Projects;

const Container = styled.div`
    width: min(96%, 1480px);
    margin: 0 auto;
    padding: clamp(2rem, 5vw, 3rem) clamp(0.75rem, 3vw, 1.25rem);
    text-align: center;
    position: relative;
    box-sizing: border-box;
    @media (max-width: 840px) {
        width: min(96%, 1480px);
    }
    h1{
        font-size: clamp(1.35rem, 2.5vw, 1.9rem);
    }

    p{
        max-width: 36rem;
        width: min(100%, 36rem);
        margin: 0 auto;
        padding: 1rem 0;
        font-size: clamp(0.85rem, 1.5vw, 0.95rem);
        line-height: 1.55;
    }
    
`

const Slide = styled.div``