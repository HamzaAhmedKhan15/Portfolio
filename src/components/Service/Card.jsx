import React from 'react'
import styled from 'styled-components';

const Card = (props) => {
    const { Icon, disc, title, disc2, disc3, disc4 } = props;
  return (
    <Container>
        <span className='green'><Icon/></span>
        <h1>{title}</h1>
        <div className='info centered-text' style={{lineHeight: '2'}}>
        <p>{disc}</p>
        <p>{disc2}</p>
        <p>{disc3}</p>
        <p>{disc4}</p>
        </div>
    </Container>
  )
}

export default Card;

const Container = styled.div`
    width: 100%;
    background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(0, 0, 0) 100%);
    padding: 10px;
    text-align: center;
    span{
        font-size: 4rem;
    }
    
    h1{
        font-size: 1.2rem;
        padding-bottom: 1rem;
    }

    p{
        font-size: 0.8rem;
    }
`