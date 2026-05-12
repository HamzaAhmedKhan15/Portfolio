import React from "react";
import styled from "styled-components";

const Card = (props) => {
  const { Icon, disc, title, disc2, disc3, disc4 } = props;
  const items = [disc, disc2, disc3, disc4].filter(Boolean);

  return (
    <Container>
      <CardHeader>
        <span className="green">
          <Icon />
        </span>
        <h1>{title}</h1>
      </CardHeader>
      <BulletList>
        {items.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </BulletList>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(0, 0, 0) 100%);
  padding: clamp(0.85rem, 2.2vw, 1.15rem);
  border-radius: 8px;
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: clamp(1rem, 2.5vw, 1.5rem);

  span {
    font-size: clamp(1.85rem, 4.5vw, 2.65rem);
    display: inline-flex;
    line-height: 1;
  }

  h1 {
    font-size: clamp(0.85rem, 1.2vw, 0.95rem);
    font-weight: 600;
    padding-top: 0.4rem;
    padding-bottom: 0.15rem;
    line-height: 1.35;
    margin: 0;
  }
`;

const BulletList = styled.ul`
  list-style-type: disc;
  list-style-position: outside;
  margin: 0;
  padding: 0 0 0 1.35rem;
  text-align: left;
  flex: 1;

  li {
    font-size: clamp(0.78rem, 1.4vw, 0.86rem);
    line-height: 1.55;
    margin-bottom: 0.55rem;
    padding-left: 0.35rem;
    word-break: break-word;
    hyphens: auto;
  }

  li:last-child {
    margin-bottom: 0;
  }

  li::marker {
    color: #2e46a1;
  }
`;
