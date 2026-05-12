import React from 'react'
import styled from 'styled-components';
import '../../assets/css/mycss.css';

const Project = (props) => {
  const { img, title, disc, sourceCode } = props.item;
  const { onSelect, index, onHover } = props;
  return (
    <Container
      onClick={() => onSelect(index)}
      onMouseEnter={() => onHover && onHover(index)}
      onMouseLeave={() => onHover && onHover(null)}
      className="project"
    >
        <img src={img} alt="project" />
        <div className="disc">
            <h1 className='proj'>{title}</h1>
            <p>{disc}</p>
                  <p>  <a href={sourceCode} target="_blank" rel="noopener noreferrer">View Source Code ➤</a>
            </p>
        </div>
    </Container>
  )
}

export default Project;

const Container = styled.div`
    min-height: 10rem;
    height: clamp(9rem, 22vw, 11rem);
    background-color: #4e5156;
    margin: 0 clamp(0.25rem, 1vw, 0.5rem);
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 400ms ease-in-out;
    }
    .disc{
        position: absolute;
        right: 0;
        left: 0;
        bottom: -10rem;
        text-align: left;
        padding: 0.5rem;
        background-color: #2e46a1;
        color: #fff;
        transition: all 400ms ease-in-out;
        h1{
            font-size: 1rem;
        }
    
        p{
            width: 90%;
            font-size: 0.8rem;
            a{
                margin-left: 0.4rem;
                color: white;
                text-decoration:none;
                font-weight:600;
            }
        }
    }

    :hover > img{
        transform: scale(1.3);
    }

    :hover > .disc{
        bottom: 0;
    }

`